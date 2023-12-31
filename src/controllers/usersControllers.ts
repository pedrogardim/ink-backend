import bcrypt from "bcrypt";
import { User } from "../models/User";
import { formatPaginationResponse, formatUser } from "../utils/format";
import { validateUserData } from "../utils/userValidation";
import { UserQuery, UserData } from "../types/users";
import { ControllerOptions } from "../types/controllers";

//Admin CRUD
export const getUserById = async (id: number, query?: UserQuery) => {
  console.log({ id, ...(query && query) });
  const user = await User.findOne({
    where: { id, ...(query && query) },
    relations: query?.role === "tattooist" ? ["tattooWorks"] : [],
  });
  if (!user) throw { code: 404, message: "User not found" };
  return { data: formatUser(user) };
};

export const getUsers = async (
  query: UserQuery,
  options?: ControllerOptions
) => {
  let { pageSize = 10, page = 1, search, role, joinTattooWorks } = query;
  pageSize = parseInt(pageSize as string);
  page = parseInt(page as string);

  const queryBuilder = User.createQueryBuilder("user");

  if (joinTattooWorks) {
    queryBuilder
      .leftJoinAndSelect("user.tattooWorks", "tattooWorks")
      .where("tattooWorks.tattooist_id IS NOT NULL");
  }

  if (search) {
    queryBuilder.andWhere(
      "(user.firstName LIKE :search OR user.lastName LIKE :search OR user.email LIKE :search OR user.id LIKE :search)",
      { search: `%${search}%` }
    );
  }

  const [users, totalItems] = await queryBuilder
    .take(pageSize)
    .skip((page - 1) * pageSize)
    .getManyAndCount();

  return formatPaginationResponse({
    page,
    pageSize,
    totalItems,
    items: users.map(formatUser),
    routePrefix: "/users/",
    ...options,
  });
};

export const createUser = async (userData: User) => {
  validateUserData(userData);
  const encryptedPassword = await bcrypt.hash(userData.password, 10);
  const createdUser = await User.create({
    ...userData,
    password: encryptedPassword,
  }).save();
  return { data: formatUser(createdUser) };
};

export const updateUser = async (userId: number, userData: UserData) => {
  validateUserData(userData, true);
  const user = await User.findOneBy({ id: userId });
  if (!user) throw { code: 404, message: "User not found" };
  Object.assign(user, userData);
  await user.save();
  return { data: formatUser(user) };
};

export const deleteUser = async (userId: number) => {
  const userDeleted = await User.delete({ id: userId });
  if (!userDeleted.affected) throw { code: 404, message: "User not found" };
  return userDeleted;
};
