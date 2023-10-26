import { ErrorRequestHandler } from "express";

import { Response } from "express";

const typeOrmErrorsMap = {
  ER_DUP_ENTRY: 409,
  ECONNRESET: 503,
};

export const formatErrorCode = (
  code: keyof typeof typeOrmErrorsMap | number
) => {
  if (typeof code === "number") return code;

  return typeOrmErrorsMap[code] || 500;
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  const formatedCode = formatErrorCode(err.code);
  res.status(formatedCode).json({
    error: {
      message: err.message,
      code: formatedCode,
    },
  });
};
