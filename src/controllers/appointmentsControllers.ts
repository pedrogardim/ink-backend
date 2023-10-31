import { Handler } from "express";
import { Appointment } from "../models/Appointment";
import { formatPaginationResponse, formatAppointment } from "../utils/format";
import { validateAppointment } from "../utils/appointmentValidation";
import { AppDataSource } from "../db";

//Admin CRUD
export const getAppointmentById: Handler = async (req, res) => {
  const appointment = await Appointment.findOne({
    where: {
      id: parseInt(req.params.id),
    },
    relations: {
      client: true,
      tattooist: true,
    },
  });
  if (!appointment) throw { code: 404, message: "Appointment not found" };
  res.status(200).json({ data: formatAppointment(appointment, req) });
};

export const getAppointments: Handler = async (req, res) => {
  let { pageSize = 10, page = 1 } = req.query;
  pageSize = parseInt(pageSize as string);
  page = parseInt(page as string);

  const [appointments, totalItems] = await Appointment.findAndCount({
    where: req.body,
    take: pageSize,
    relations: {
      client: true,
      tattooist: true,
    },
    skip: (page - 1) * pageSize,
  });

  res.status(200).json(
    formatPaginationResponse({
      req,
      page,
      pageSize,
      totalItems,
      items: appointments.map((a) => formatAppointment(a, req)),
    })
  );
};

export const createAppointment: Handler = async (req, res) => {
  await validateAppointment(req.body);
  const createdAppointment = await Appointment.create(req.body).save();
  res.status(201).json({ data: formatAppointment(createdAppointment, req) });
};

export const updateAppointment: Handler = async (req, res) => {
  let appointment = await Appointment.findOneBy({
    id: parseInt(req.params.id),
  });
  if (!appointment) throw { code: 404, message: "Appointment not found" };

  const { id, startTime, endTime, clientId, tattooistId } = appointment;

  await validateAppointment(
    { startTime, endTime, clientId, tattooistId, ...req.body },
    true,
    id
  );

  Object.assign(appointment, req.body);

  await appointment.save();
  res
    .status(200)
    .json({ data: formatAppointment(appointment as Appointment, req) });
};

export const deleteAppointment: Handler = async (req, res) => {
  const appointmentDeleted = await Appointment.delete({
    id: parseInt(req.params.id),
  });

  if (!appointmentDeleted.affected)
    throw { code: 404, message: "Appointment not found" };

  res.status(204).json(appointmentDeleted);
};

export const getMyAppointments: Handler = async (req, res) => {
  const { userId, role } = req.currentUser;
  let { pageSize = 10, page = 1 } = req.query;
  pageSize = parseInt(pageSize as string);
  page = parseInt(page as string);

  const idToQuery = role === "tattooist" ? "tattooistId" : "clientId";

  const [appointments, totalItems] = await Appointment.findAndCount({
    where: { [idToQuery]: userId },
    take: pageSize,
    relations: {
      client: role === "tattooist",
      tattooist: role !== "tattooist",
    },
    skip: (page - 1) * pageSize,
  });

  res.status(200).json(
    formatPaginationResponse({
      req,
      page,
      pageSize,
      totalItems,
      items: appointments.map((a) => formatAppointment(a, req)),
    })
  );
};

export const requestAppointment: Handler = async (req, res) => {
  const { userId, role } = req.currentUser;
  const { startTime, endTime, tattooistId } = req.body;

  if (role === "tattooist")
    throw { code: 501, message: "Tattooist can't create appointments yet" };

  await validateAppointment({
    startTime,
    endTime,
    tattooistId,
    clientId: userId,
  });

  const createdAppointment = await Appointment.create({
    startTime,
    endTime,
    tattooistId,
    clientId: userId,
  }).save();

  res
    .status(200)
    .json({ data: formatAppointment(createdAppointment as Appointment, req) });
};

export const updateMyAppointment: Handler = async (req, res) => {
  const { userId, role } = req.currentUser;
  const idToQuery = role === "tattooist" ? "tattooistId" : "clientId";

  let appointment = await Appointment.findOne({
    where: {
      id: parseInt(req.params.id),
      [idToQuery]: userId,
    },
  });
  if (!appointment) throw { code: 404, message: "Appointment not found" };

  if (req.body.clientId)
    throw { code: 400, message: "You can not change the client" };

  const { id, startTime, endTime, clientId, tattooistId } = appointment;

  await validateAppointment(
    { startTime, endTime, clientId, tattooistId, ...req.body },
    true,
    id
  );

  Object.assign(appointment, req.body);

  await appointment.save();
  res
    .status(200)
    .json({ data: formatAppointment(appointment as Appointment, req) });
};

export const deleteMyAppointment: Handler = async (req, res) => {
  const { userId, role } = req.currentUser;
  const idToQuery = role === "tattooist" ? "tattooistId" : "clientId";

  const appointmentDeleted = await Appointment.delete({
    id: parseInt(req.params.id),
    [idToQuery]: userId,
  });

  if (!appointmentDeleted.affected)
    throw { code: 404, message: "Appointment not found" };

  res.status(204).json(appointmentDeleted);
};
