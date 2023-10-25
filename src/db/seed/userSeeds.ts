import { User, UserRoleType } from "../../models/User";
import { fakerES as faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

export const seedUsers = async () => {
  const randomRoles = ["client", "tattooist"] as UserRoleType[];

  await User.clear();
  const users = Array(200)
    .fill(null)
    .map(() =>
      User.create({
        email: faker.internet.email(),
        password: bcrypt.hashSync("1234", 1),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        phone_number: faker.number.int({ min: 3e8, max: 9e8 }),
        profile_pic_url: faker.image.avatarLegacy(),
        role: faker.helpers.arrayElement(randomRoles),
      })
    );

  users[users.length - 1].role = "super_admin";
  users[users.length - 1].email = "admin@admin.com";
  users[users.length - 1].first_name = "admin";
  users[users.length - 1].last_name = "";

  await User.save(users);
};
