import { ErrorRequestHandler } from "express";

const typeOrmErrorsMap = {
  ER_DUP_ENTRY: { message: "This element already exists", code: 409 },
  ECONNRESET: { message: "Connection to the database was lost", code: 503 },
  ER_NO_REFERENCED_ROW_2: {
    message: "Either the client or the tattoist does not exist",
    code: 409,
  },
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let error = err;
  if (Object.keys(typeOrmErrorsMap).includes(err.code)) {
    error = typeOrmErrorsMap[err.code as keyof typeof typeOrmErrorsMap];
  }
  res.status(error.code).json({ error });
};
