import { Response } from "express";

export type HttpErrorCodes = 400 | 401 | 403 | 404 | 409 | 500 | 503;

const errorResponse = (
  res: Response,
  status: HttpErrorCodes = 500,
  error: string = 'Internal Server Error',
  details?: any
) => {
  res.status(status).json({ status, error, details });
}

export const userNotFoundError = (res: Response, username: string) => {
  errorResponse(res, 404, `No user found with the username ${username}`);
}

export const usernameAlreadyInUse = (res: Response) => {
  errorResponse(res, 409, 'Username Already in Use');
}

export const dbUnknowledgeError = (res: Response) => {
  errorResponse(res, 500, "The operation was not acknowledged by the database");
}

export const internalError = (res: Response, error: any) => {
  errorResponse(res, 500, 'Internal Server Error', error);
}

export default errorResponse;
