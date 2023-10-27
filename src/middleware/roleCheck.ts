import { Handler } from "express";

type RoleCheckMiddleware = (role: string) => Handler;

export const roleCheck: RoleCheckMiddleware =
  (requiredRole: string) => (req, res, next) => {
    const { role } = req.currentUser;
    const isAuthorized =
      role === "super_admin" ||
      role === requiredRole ||
      (requiredRole !== "super_admin" && role === "admin");
    if (isAuthorized) return next();
    throw { code: 401, message: "You are not authorized to do that" };
  };
