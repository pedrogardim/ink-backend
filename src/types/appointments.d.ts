import { Appointment, AppointmentType } from "../models/Appointment";
import { PaginationQuery } from "./controllers";

export interface AppointmentData {
  id?: number;
  description?: string;
  startTime?: Date;
  endTime?: Date;
  clientId?: number;
  tattooistId?: number;
  type?: AppointmentType;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AppointmentQuery extends PaginationQuery, AppointmentData {
  date?: string;
}
