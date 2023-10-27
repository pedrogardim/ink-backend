import { AppDataSource } from "..";
import { seedUsers } from "./userSeeds";
import { seedAppointments } from "./appointmentsSeeds";
import { seedTattooWorks } from "./tattooWorksSeeds";

AppDataSource.initialize().then(async () => {
  console.log("Start seeding...");
  await AppDataSource.query("SET FOREIGN_KEY_CHECKS = 0;");
  const users = await seedUsers();
  console.log("Users done");
  await seedAppointments(users);
  console.log("Appointments done");
  await seedTattooWorks(users);
  console.log("Tattoo works done");
  await AppDataSource.query("SET FOREIGN_KEY_CHECKS = 1;");
  AppDataSource.destroy();
});
