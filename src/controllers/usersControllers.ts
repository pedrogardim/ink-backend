import { Handler } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { formatPaginationResponse, formatUser } from "../utils/format";
import {
  validateRegistrationData,
  validateUserUpdateData,
} from "../utils/userValidation";
import { AppDataSource } from "../db";

//Admin CRUD
export const getUserById: Handler = async (req, res) => {
  const user = await User.findOneBy({ id: parseInt(req.params.id) });
  if (!user) throw { code: 404, message: "User not found" };
  res.status(200).json({ data: formatUser(user, req) });
};

export const getUsers: Handler = async (req, res) => {
  let { pageSize = 10, page = 1 } = req.query;
  pageSize = parseInt(pageSize as string);
  page = parseInt(page as string);

  const [users, totalItems] = await User.findAndCount({
    where: req.body,
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  res.status(200).json(
    formatPaginationResponse({
      req,
      page,
      pageSize,
      totalItems,
      items: users.map((user) => formatUser(user, req)),
    })
  );
};

export const createUser: Handler = async (req, res) => {
  validateRegistrationData(req.body);
  const encryptedPassword = await bcrypt.hash(req.body.password, 10);
  const createdUser = await User.create({
    ...req.body,
    password: encryptedPassword,
  }).save();
  res.status(201).json({ data: formatUser(createdUser, req) });
};

export const updateUser: Handler = async (req, res) => {
  validateUserUpdateData(req.body);
  const userRepository = AppDataSource.getRepository(User);
  let user = await userRepository.findOneBy({ id: parseInt(req.params.id) });
  if (!user) throw { code: 404, message: "User not found" };
  user = { ...user, ...req.body };
  res.status(200).json({ data: formatUser(user as User, req) });
};

export const deleteUser: Handler = async (req, res) => {
  const userDeleted = await User.delete({ id: parseInt(req.params.id) });
  if (!userDeleted.affected) throw { code: 404, message: "User not found" };
  res.status(204).json(userDeleted);
};

export const setAsTattoist: Handler = async (req, res) => {
  const userRepository = AppDataSource.getRepository(User);
  let user = await userRepository.findOneBy({ id: parseInt(req.params.id) });
  if (!user) throw { code: 404, message: "User not found" };
  user.role = "tattooist";
  res.status(200).json({ data: formatUser(user as User, req) });
};

//User

export const getMyProfile: Handler = async (req, res) => {
  const user = await User.findOneBy({ id: parseInt(req.currentUser.userId) });
  console.log(req.currentUser);
  if (!user) throw { code: 404, message: "User not found" };
  res.status(200).json({ data: formatUser(user, req) });
};

export const updateMyProfile: Handler = async (req, res) => {
  validateUserUpdateData(req.body);
  const userRepository = AppDataSource.getRepository(User);
  let user = await userRepository.findOneBy({
    id: parseInt(req.currentUser.userId),
  });
  if (!user) throw { code: 404, message: "User not found" };
  user = { ...user, ...req.body };
  res.status(200).json({ data: formatUser(user as User, req) });
};

export const deleteMyProfile: Handler = async (req, res) => {
  const userDeleted = await User.delete({
    id: parseInt(req.currentUser.userId),
  });
  if (!userDeleted.affected) throw { code: 404, message: "User not found" };
  res.status(204).json(userDeleted);
};
