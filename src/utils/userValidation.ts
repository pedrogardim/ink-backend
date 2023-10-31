import { LoginPayload } from "../types/auth";

const NAME_REGEX = /^[a-zA-Z\u00C0-\u017F ]+$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
const PHONE_NUMBER_REGEX = /^[0-9]{9}$/;

type ValidationRules = {
  [key: string]: {
    formated: string;
    validation: (data: any) => boolean;
  };
};

const validationRules: ValidationRules = {
  firstName: {
    formated: "First name",
    validation: (id) => NAME_REGEX.test(id),
  },
  lastName: {
    formated: "Last name",
    validation: (id) => NAME_REGEX.test(id),
  },
  email: {
    formated: "Email",
    validation: (id) => EMAIL_REGEX.test(id),
  },
  password: {
    formated: "Password",
    validation: (id) => PASSWORD_REGEX.test(id),
  },
  phoneNumber: {
    formated: "Phone number",
    validation: (id) => PHONE_NUMBER_REGEX.test(id),
  },
};

type RegisterPayload = {
  [key: keyof typeof validationRules]: string;
};

export const validateRegistrationData = (data: RegisterPayload) => {
  for (const fields of Object.keys(validationRules)) {
    const key = fields as keyof RegisterPayload;
    const rule = validationRules[key];
    if (!data[key])
      throw {
        message: `${rule.formated} can't be empty`,
        code: 400,
      };

    if (!rule.validation(data[key]))
      throw {
        message: `${rule.formated} is not valid`,
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
        message: `${validationRules[key].formated} can't be empty`,
        code: 400,
      };
  }
  return true;
};

export const validateUserUpdateData = (data: RegisterPayload) => {
  for (const fields of Object.keys(data)) {
    const key = fields as keyof RegisterPayload;
    const rule = validationRules[key];
    if (!rule)
      throw {
        message: `Field '${key}' can't be inserted into user`,
        code: 400,
      };
    if (!data[key])
      throw {
        message: `${rule.formated} can't be empty`,
        code: 400,
      };
    if (!rule.validation(data[key]))
      throw {
        message: `${rule.formated} is not valid`,
        code: 400,
      };
  }

  return true;
};
