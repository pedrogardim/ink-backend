import { TattooWorkData } from "../types/tattooWorks";

const DESCRIPTION_REGEX = /^.{1,256}$/; // Description from 1 to 256 characters.
const IMAGE_URL_REGEX = /^.{1,2000}$/; // URL from 1 to 2000 characters.
const ID_REGEX = /^[0-9]+$/; // ID validation, assuming IDs are numeric.

type TattooWorkValidationRules = {
  [key: string]: {
    validation: (data: any) => boolean;
    required?: boolean;
  };
};

const tattooWorkValidationRules: TattooWorkValidationRules = {
  description: {
    validation: (desc) => DESCRIPTION_REGEX.test(desc),
    required: true,
  },
  image_url: {
    validation: (url) => IMAGE_URL_REGEX.test(url),
    required: false,
  },
  tattooistId: {
    validation: (id) => ID_REGEX.test(id.toString()),
    required: true,
  },
  type: {
    validation: (type) => ["tattoo", "piercing"].includes(type),
    required: true,
  },
};

export const validateTattooWorkData = (
  data: TattooWorkData,
  isUpdating?: boolean
) => {
  for (const fields of Object.keys(
    isUpdating ? data : tattooWorkValidationRules
  )) {
    const key = fields as keyof TattooWorkData;
    const rule = tattooWorkValidationRules[key];
    if (!rule)
      throw {
        message: `Field '${key}' can't be inserted into TattooWork`,
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
