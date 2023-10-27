import { Handler } from "express";
import { User } from "../models/User";
import { formatPaginationResponse, formatUser } from "../utils/format";

//Admin CRUD
export const getUserById: Handler = async (req, res) => {
  const user = await User.findOneBy({ id: parseInt(req.params.id) });
  if (!user) {
    throw { code: 404, message: "User not found" };
  }
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
  res.status(200).json("ok");
};

export const updateUser: Handler = async (req, res) => {
  res.status(200).json("ok");
};

export const deleteUser: Handler = async (req, res) => {
  res.status(200).json("ok");
};

export const setAsTattoist: Handler = async (req, res) => {
  res.status(200).json("ok");
};

//User

export const getMyProfile: Handler = async (req, res) => {
  res.status(200).json("ok");
};

export const updateMyProfile: Handler = async (req, res) => {
  res.status(200).json("ok");
};

export const deleteMyProfile: Handler = async (req, res) => {
  res.status(200).json("ok");
};
