import { ErrorRequestHandler } from "express";
import { STATUS_CODES } from "http";

const typeOrmErrorsMap = {
  ER_DUP_ENTRY: { message: "This element already exists", code: 409 },
  ECONNRESET: { message: "Connection to the database was lost", code: 503 },
  ER_NO_REFERENCED_ROW_2: {
    message: "Either the client or the tattoist does not exist",
    code: 409,
  },
  TokenExpiredError: {
    message: "Session token expired",
    code: 401,
  },
  JsonWebTokenError: {
    message: "User is not authenticated",
    code: 401,
  },
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let error = err;
  console.log(JSON.stringify(err));
  if (Object.keys(typeOrmErrorsMap).includes(err.code || err.name)) {
    error =
      typeOrmErrorsMap[(err.code || err.name) as keyof typeof typeOrmErrorsMap];
  }
  if (!error.code || typeof error.code !== "number") {
    error.code = 500;
  }
  const { message, code } = error;
  console.log({ message, code });
  res.status(code).json({ error: { message, code } });
};
