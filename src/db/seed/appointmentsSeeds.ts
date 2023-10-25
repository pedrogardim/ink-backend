import { Appointment, AppointmentType } from "../../models/Appointment";
import { User } from "../../models/User";
import { fakerES as faker } from "@faker-js/faker";

export const seedAppointments = async (users: User[]) => {
  const randomTypes = ["tattoo", "piercing"] as AppointmentType[];

  const clients = users.filter((u) => u.role === "client");
  const tattooists = users.filter((u) => u.role === "tattooist");

  await Appointment.clear();

  const appointments = Array(50)
    .fill(null)
    .map(() => {
      const startTime = faker.date.future({});
      const endTime = new Date(
        new Date(startTime).setHours(
          startTime.getHours() + faker.number.int({ min: 1, max: 6 })
        )
      );

      return Appointment.create({
        description: faker.lorem.text().slice(0, 256),
        start_time: startTime,
        end_time: endTime,
        type: faker.helpers.arrayElement(randomTypes),
        client: faker.helpers.arrayElement(clients),
        tattooist: faker.helpers.arrayElement(tattooists),
      });
    });

  await Appointment.save(appointments);
};
