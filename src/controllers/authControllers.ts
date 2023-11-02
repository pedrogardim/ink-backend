import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validateLogin, validateUserData } from "../utils/userValidation";
import { User } from "../models/User";
import { formatAuthentication } from "../utils/format";
import { UserData, LoginPayload } from "../types/users";

//errors are handled by async wrapper and error middleware!

const { JWT_SECRET = "" } = process.env;

export const registerUser = async (userData: UserData) => {
  validateUserData(userData);

  const encryptedPassword = await bcrypt.hash(userData.password as string, 10);

  const user = await User.create({
    ...userData,
    role: "client",
    password: encryptedPassword,
  }).save();

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return { data: formatAuthentication(token, user) };
};

export const loginUser = async (userData: LoginPayload) => {
  const { email, password } = userData;
  validateLogin({ email, password });

  const user = await User.findOneBy({ email });

  if (!user) throw { code: 401, message: "Invalid login credentials" };

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect)
    throw { code: 401, message: "Invalid login credentials" };

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return { data: formatAuthentication(token, user) };
};
