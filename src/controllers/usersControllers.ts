import { Handler } from "express";
import { User } from "../models/User";

//Admin CRUD
export const getUserById: Handler = async (req, res) => {
  const user = await User.findOneBy({ id: parseInt(req.params.id) });
  res.status(200).json(user);
};

export const getUsers: Handler = async (req, res) => {
  res.status(200).json("ok");
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
