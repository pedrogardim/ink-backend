import { MoreThanOrEqual, LessThanOrEqual } from "typeorm";
import { Appointment } from "../models/Appointment";

const INT_REGEX = /^-?\d+$/;

type ValidationRules = {
  [key: string]: {
    formated: string;
    validation: (data: any) => boolean;
  };
};

const validationRules: ValidationRules = {
  startTime: {
    formated: "Start time",
    validation: (date) => !isNaN(Date.parse(date)),
  },
  endTime: {
    formated: "End time",
    validation: (date) => !isNaN(Date.parse(date)),
  },
  clientId: {
    formated: "Client ID",
    validation: (id) => INT_REGEX.test(id),
  },
  tattooistId: {
    formated: "Tattooist ID",
    validation: (id) => INT_REGEX.test(id),
  },
};

type AppointmentData = {
  [key: keyof typeof validationRules]: string;
};

export const validateAppointment = async (
  appointmentData: AppointmentData,
  isUpdating?: boolean
) => {
  for (const field of Object.keys(
    isUpdating ? appointmentData : validationRules
  )) {
    const key = field as keyof AppointmentData;
    const rule = validationRules[key];
    if (!rule)
      throw {
        message: `Field '${key}' can't be inserted into an appointment`,
        code: 400,
      };
    if (!appointmentData[key])
      throw {
        message: `${rule.formated} can't be empty`,
        code: 400,
      };

    if (!rule.validation(appointmentData[key]))
      throw {
        message: `${rule.formated} is not valid`,
        code: 400,
      };
  }
  const overlapingAppointments = await Appointment.count({
    relations: ["tattooist", "client"],
    where: {
      tattooistId: parseInt(appointmentData.tattooistId),
      startTime: LessThanOrEqual(new Date(appointmentData.endTime)),
      endTime: MoreThanOrEqual(new Date(appointmentData.startTime)),
    },
  });
  if (overlapingAppointments > 0)
    throw {
      message: "Appointment overlaps with another appointment",
      code: 409,
    };
};
