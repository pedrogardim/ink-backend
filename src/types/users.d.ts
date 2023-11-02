import { User, UserRoleType } from "../models/User";
import { PaginationQuery } from "./controllers";

export interface UserQuery extends PaginationQuery {
  email?: string;
  id?: number;
  firstName?: string;
  lastName?: string;
  phoneNumber?: number;
  role?: UserRoleType;
  createdAt?: Date;
  updatedAt?: Date;
}
