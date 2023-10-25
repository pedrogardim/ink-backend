import { AppDataSource } from "..";
import { seedUsers } from "./userSeeds";

AppDataSource.initialize().then(async () => {
  console.log("Start seeding...");
  await AppDataSource.query("SET FOREIGN_KEY_CHECKS = 0;");
  await seedUsers();
  console.log("Users done");
  await AppDataSource.query("SET FOREIGN_KEY_CHECKS = 1;");
  AppDataSource.destroy();
});
