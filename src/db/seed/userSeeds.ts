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
        email: faker.internet.email().toLowerCase(),
        password: bcrypt.hashSync("abc12345$", 1),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phoneNumber: faker.number.int({ min: 3e8, max: 9e8 }),
        profilePicUrl: faker.image.avatarLegacy(),
        role: faker.helpers.arrayElement(randomRoles),
      })
    );

  users[users.length - 1].role = "super_admin";
  users[users.length - 1].email = "admin@admin.com";
  users[users.length - 1].firstName = "admin";
  users[users.length - 1].lastName = "";

  await User.save(users);

  return users;
};
