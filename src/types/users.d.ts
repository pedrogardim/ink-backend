import { User, UserRoleType } from "../models/User";
import { PaginationQuery } from "./controllers";

export interface UserData {
  email?: string;
  password?: string;
  id?: number;
  firstName?: string;
  lastName?: string;
  phoneNumber?: number;
  role?: UserRoleType;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface UserQuery extends PaginationQuery, UserData {
  search?: string;
}
