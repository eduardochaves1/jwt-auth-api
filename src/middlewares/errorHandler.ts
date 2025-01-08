import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

type Error = {
  status?: number;
  message?: any;
  issues?: any;
}

const errorHandler = (err: Error, Request: Request, res: Response, next: NextFunction) => {
  const zodErr = err instanceof ZodError;

  console.error(zodErr ? err.issues : err);

  const status = zodErr ? 400 : err.status || 500;

  res.status(status).json({
    error: {
      status: status,
      issues: err.issues || err.message || 'Internal Server Error',
    },
  });
};

export default errorHandler;
