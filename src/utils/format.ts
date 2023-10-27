import { Request } from "express";
import { User } from "../models/User";

export const getBaseUrl = (req: Request) =>
  req.protocol + "://" + req.get("host") + "/api";

export const formatUser = (user: User, req: Request) => ({
  kind: "user",
  self: `${getBaseUrl(req)}/users/${user.id}`,
  ...user,
  password: undefined,
});
