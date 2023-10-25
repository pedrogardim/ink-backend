import { Handler } from "express";

export const register: Handler = async (req, res) => {
  try {
    res.json("Hello world");
  } catch (err) {
    res.json(err);
  }
};

export const login: Handler = async (req, res) => {
  try {
    res.json("Hello world");
  } catch (err) {
    res.json(err);
  }
};
