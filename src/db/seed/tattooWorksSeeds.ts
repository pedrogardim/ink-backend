import { Appointment, AppointmentType } from "../../models/Appointment";
import { User } from "../../models/User";
import { TattooWork } from "../../models/TattooWork";
import { fakerES as faker } from "@faker-js/faker";

export const seedTattooWorks = async (users: User[]) => {
  const randomTypes = ["tattoo", "piercing"] as AppointmentType[];

  const tattooists = users.filter((u) => u.role === "tattooist");

  await TattooWork.clear();

  const appointments = Array(300)
    .fill(null)
    .map((_, i) => {
      const workType = faker.helpers.arrayElement(randomTypes);
      return TattooWork.create({
        description: faker.lorem.text().slice(0, 256),
        imageUrl: `https://source.unsplash.com/featured/?${workType}-${i}`,
        tattooist: faker.helpers.arrayElement(tattooists),
        type: workType,
      });
    });

  await TattooWork.save(appointments);
};
