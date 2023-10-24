import { DataSource } from "typeorm";
import { User } from "../models/User";

require("dotenv").config();

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USERNAME, MYSQL_PASSWORD } = process.env;

export const AppDataSource = new DataSource({
  type: "mysql",
  database: "tattoo_app",
  host: MYSQL_HOST,
  port: +(MYSQL_PORT as string),
  username: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  entities: [User],
});
