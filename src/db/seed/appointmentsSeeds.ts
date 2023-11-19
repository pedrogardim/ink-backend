import { fakerES as faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { Appointment, AppointmentType } from "../../models/Appointment";
import { User } from "../../models/User";

export const seedAppointments = async (users: User[]) => {
  const randomTypes = ["tattoo", "piercing"] as AppointmentType[];

  const clients = users.filter((u) => u.role === "client");
  const tattooists = users.filter((u) => u.role === "tattooist");

  await Appointment.clear();

  const appointments = Array(50)
    .fill(null)
    .map(() => {
      const startTime = dayjs(0)
        .set("year", 2023)
        .set("months", faker.number.int({ min: 0, max: 12 }))
        .set("days", faker.number.int({ min: 0, max: 30 }))
        .set("hours", faker.number.int({ min: 9, max: 21 }))
        .set("minutes", faker.number.int({ min: 0, max: 12 }) * 5)
        .toDate();
      const endTime = dayjs(startTime)
        .clone()
        .add(faker.number.int({ min: 0, max: 12 }) * 10, "minutes")
        .toDate();

      return Appointment.create({
        description: faker.lorem.text().slice(0, 256),
        startTime: startTime,
        endTime: endTime,
        type: faker.helpers.arrayElement(randomTypes),
        client: faker.helpers.arrayElement(clients),
        tattooist: faker.helpers.arrayElement(tattooists),
      });
    });

  await Appointment.save(appointments);
};
