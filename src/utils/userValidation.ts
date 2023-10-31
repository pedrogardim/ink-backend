import { LoginPayload } from "../types/auth";

const NAME_REGEX = /^[a-zA-Z\u00C0-\u017F ]+$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
const PHONE_NUMBER_REGEX = /^[0-9]{9}$/;
const URL_REGEX =
  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

type ValidationRules = {
  [key: string]: {
    validation: (data: any) => boolean;
    required?: boolean;
  };
};

const validationRules: ValidationRules = {
  firstName: {
    validation: (id) => NAME_REGEX.test(id),
    required: true,
  },
  lastName: {
    validation: (id) => NAME_REGEX.test(id),
    required: true,
  },
  email: {
    validation: (id) => EMAIL_REGEX.test(id),
    required: true,
  },
  password: {
    validation: (id) => PASSWORD_REGEX.test(id),
    required: true,
  },
  phoneNumber: {
    validation: (id) => PHONE_NUMBER_REGEX.test(id),
    required: true,
  },
  profilePicUrl: {
    validation: (id) => URL_REGEX.test(id),
  },
  role: {
    validation: (type) =>
      ["client", "tattooist", "admin", "super_admin"].includes(type),
  },
};

type RegisterPayload = {
  [key: keyof typeof validationRules]: string | number;
};

export const validateUserData = (
  data: RegisterPayload,
  isUpdating?: boolean
) => {
  for (const fields of Object.keys(isUpdating ? data : validationRules)) {
    const key = fields as keyof RegisterPayload;
    const rule = validationRules[key];
    if (!rule)
      throw {
        message: `Field '${key}' can't be inserted into user`,
        code: 400,
      };
    if (rule.required && !data[key] && data[key] !== 0)
      throw {
        message: `Field '${key}' can't be empty`,
        code: 400,
      };

    if ((data[key] || data[key] === 0) && !rule.validation(data[key]))
      throw {
        message: `Field '${key}' is not valid`,
        code: 400,
      };
  }

  return true;
};

export const validateLogin = (data: LoginPayload) => {
  for (const field of ["email", "password"]) {
    const key = field as keyof LoginPayload;
    if (!data[key])
      throw {
        message: `Field '${field}' can't be empty`,
        code: 400,
      };
  }
  return true;
};
