import { LoginPayload, RegisterPayload } from "../types/auth";

const NAME_REGEX = /^[a-zA-Z]+$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
const PHONE_NUMBER_REGEX = /^[0-9]{9}$/;

type ValidationRules = {
  [key in keyof RegisterPayload]: {
    formated: string;
    regex: RegExp;
  };
};
const validationRules: ValidationRules = {
  firstName: {
    formated: "First name",
    regex: NAME_REGEX,
  },
  lastName: {
    formated: "Last name",
    regex: NAME_REGEX,
  },
  email: {
    formated: "Email",
    regex: EMAIL_REGEX,
  },
  password: {
    formated: "Password",
    regex: PASSWORD_REGEX,
  },
  phoneNumber: {
    formated: "Phone number",
    regex: PHONE_NUMBER_REGEX,
  },
};

export const validateRegistrationData = (data: RegisterPayload) => {
  for (const fields of Object.keys(validationRules)) {
    const key = fields as keyof RegisterPayload;
    const rule = validationRules[key];
    if (!data[key]) {
      throw {
        message: `${rule.formated} can't be empty`,
        code: 400,
      };
    }
    if (!rule.regex.test(data[key])) {
      throw {
        message: `${rule.formated} is not valid`,
        code: 400,
      };
    }
  }

  return true;
};

export const validateLogin = (data: LoginPayload) => {
  for (const field of ["email", "password"]) {
    const key = field as keyof LoginPayload;
    if (!data[key]) {
      throw {
        message: `${validationRules[key].formated} can't be empty`,
        code: 400,
      };
    }
  }
  return true;
};
