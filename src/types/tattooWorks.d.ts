import { TattooWork, TattooWorkType } from "../models/TattooWork";
import { PaginationQuery } from "./controllers";

export interface TattooWorkData {
  id?: number;
  description?: string;
  startTime?: Date;
  endTime?: Date;
  clientId?: number;
  tattooistId?: number;
  type?: TattooWorkType;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TattooWorkQuery extends PaginationQuery, TattooWorkData {}
