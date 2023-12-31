import { Appointment } from "../models/Appointment";
import { formatPaginationResponse, formatAppointment } from "../utils/format";
import { validateAppointment } from "../utils/appointmentValidation";
import { AppointmentData, AppointmentQuery } from "../types/appointments";
import { CurrentUserData } from "../types";
import { LessThanOrEqual, MoreThanOrEqual } from "typeorm";

export const getAppointmentById = async (
  id: number,
  user?: CurrentUserData
) => {
  const query: AppointmentQuery = { id };

  if (user) {
    const { role, userId } = user;
    query[role === "tattooist" ? "tattooistId" : "clientId"] = userId;
  }

  const appointment = await Appointment.findOne({
    where: query,
    relations: ["client", "tattooist"],
  });

  if (!appointment) throw { code: 404, message: "Appointment not found" };

  return { data: formatAppointment(appointment) };
};

export const getAppointments = async (
  query: AppointmentQuery,
  user?: CurrentUserData,
  order?: { [key: string]: "ASC" | "DESC" }
) => {
  let { pageSize = 10, page = 1, date } = query;
  pageSize = parseInt(pageSize as string);
  page = parseInt(page as string);

  const [appointments, totalItems] = await Appointment.findAndCount({
    where: {
      ...(date && {
        startTime: MoreThanOrEqual(new Date(+date)),
        endTime: LessThanOrEqual(new Date(+date + 86400000)),
      }),
      ...(user && {
        [user.role === "tattooist" ? "tattooistId" : "clientId"]: user.userId,
      }),
    },
    take: pageSize,
    relations: {
      client: true,
      tattooist: true,
    },
    order: order || {},
    skip: (page - 1) * pageSize,
  });

  return formatPaginationResponse({
    page,
    pageSize,
    totalItems,
    items: appointments.map((a) => formatAppointment(a)),
  });
};

export const createAppointment = async (
  data: AppointmentData,
  user?: CurrentUserData
) => {
  if (user) {
    const { role, userId } = user;
    data[role === "tattooist" ? "tattooistId" : "clientId"] = userId;
  }

  await validateAppointment(data);
  const createdAppointment = await Appointment.create(data).save();
  return { data: formatAppointment(createdAppointment) };
};

export const updateAppointment = async (
  id: number,
  data: AppointmentData,
  user?: CurrentUserData
) => {
  const query: AppointmentQuery = { id };

  if (user) {
    const { role, userId } = user;
    query[role === "tattooist" ? "tattooistId" : "clientId"] = userId;
  }

  let appointment = await Appointment.findOneBy(query);
  if (!appointment) throw { code: 404, message: "Appointment not found" };
  const { startTime, endTime, clientId, tattooistId } = appointment;

  await validateAppointment(
    { startTime, endTime, clientId, tattooistId, ...data },
    true,
    id
  );

  Object.assign(appointment, data);
  await appointment.save();
  return { data: formatAppointment(appointment as Appointment) };
};

export const deleteAppointment = async (id: number, user?: CurrentUserData) => {
  const query: AppointmentQuery = { id };

  if (user) {
    const { role, userId } = user;
    query[role === "tattooist" ? "tattooistId" : "clientId"] = userId;
  }

  const appointmentDeleted = await Appointment.delete(query);

  if (!appointmentDeleted.affected)
    throw { code: 404, message: "Appointment not found" };

  return appointmentDeleted;
};
