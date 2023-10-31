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
      items: appointments.map((appointment) =>
        formatAppointment(appointment, req)
      ),
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
