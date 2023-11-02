import { User, UserRoleType } from "../models/User";
import { PaginationQuery } from "./controllers";

export interface UserData {
  email?: string;
  id?: number;
  firstName?: string;
  lastName?: string;
  phoneNumber?: number;
  role?: UserRoleType;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserQuery extends PaginationQuery, UserData {}
