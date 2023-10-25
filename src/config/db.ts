import { DataSource } from "typeorm";
import { User } from "../models/User";
import { Appointment } from "../models/Appointment";
import { CreateUsersTable1698242505641 } from "../migrations/1698242505641-CreateUsersTable";
import { CreateAppointmentsTable1698243116264 } from "../migrations/1698243116264-CreateAppointmentsTable";

require("dotenv").config();

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USERNAME, MYSQL_PASSWORD } = process.env;

export const AppDataSource = new DataSource({
  type: "mysql",
  database: "tattoo_app",
  host: MYSQL_HOST,
  port: +(MYSQL_PORT as string),
  username: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  entities: [User, Appointment],
  migrations: [
    CreateUsersTable1698242505641,
    CreateAppointmentsTable1698243116264,
  ],
});
