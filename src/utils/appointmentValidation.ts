import { MoreThanOrEqual, LessThanOrEqual, Not } from "typeorm";
import { Appointment } from "../models/Appointment";
import { User } from "../models/User";

const INT_REGEX = /^-?\d+$/;
const URL_REGEX =
  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
const DESC_REGEX = /^.{1,256}$/;

type ValidationRules = {
  [key: string]: {
    validation: (data: any) => boolean;
    required?: boolean;
  };
};

const validationRules: ValidationRules = {
  startTime: {
    validation: (date) => !isNaN(Date.parse(date)),
    required: true,
  },
  endTime: {
    validation: (date) => !isNaN(Date.parse(date)),
    required: true,
  },
  clientId: {
    validation: (id) => INT_REGEX.test(id),
    required: true,
  },
  tattooistId: {
    validation: (id) => INT_REGEX.test(id),
    required: true,
  },
  description: {
    validation: (desc) => DESC_REGEX.test(desc) && typeof desc === "string",
  },
  imageUrl: {
    validation: (url) => URL_REGEX.test(url),
  },
  type: {
    validation: (type) => type === "tattoo" || type === "piercing",
  },
};

type AppointmentData = {
  [key: keyof typeof validationRules]: string | number;
};

export const validateAppointment = async (
  appointmentData: AppointmentData,
  isUpdating?: boolean,
  id?: number
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
    if (rule.required && !appointmentData[key] && appointmentData[key] !== 0)
      throw {
        message: `Field '${field}' can't be empty`,
        code: 400,
      };

    if (
      (appointmentData[key] || appointmentData[key] === 0) &&
      !rule.validation(appointmentData[key])
    )
      throw {
        message: `Field '${field}' is not valid`,
        code: 400,
      };
  }

  const { startTime, endTime } = appointmentData;

  if (+new Date(startTime) > +new Date(endTime))
    throw {
      message: "End time must be after start time",
      code: 400,
    };

  if (new Date(startTime).getHours() < 9 || new Date(endTime).getHours() > 21)
    throw {
      message: "Appoint must be within 9am and 9pm",
      code: 400,
    };

  const tattooist = await User.findOne({
    where: { id: appointmentData.tattooistId as number },
    select: {
      role: true,
    },
  });

  if (tattooist && tattooist?.role !== "tattooist")
    throw {
      message: "Given tattooist is not a tattooist",
      code: 422,
    };

  const overlapingAppointments = await Appointment.count({
    relations: ["tattooist"],
    where: {
      ...(isUpdating && { id: Not(id as number) }),
      tattooistId: appointmentData.tattooistId as number,
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
