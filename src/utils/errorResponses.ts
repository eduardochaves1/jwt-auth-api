import { Response } from "express";

export type HttpErrorCodes = 400 | 401 | 403 | 404 | 500 | 503;

const errorResponse = (
  res: Response,
  status: HttpErrorCodes = 500,
  error: string = 'Internal Server Error',
  details?: any
) => {
  res.status(status).json({ status, error, details });
}

export default errorResponse;
