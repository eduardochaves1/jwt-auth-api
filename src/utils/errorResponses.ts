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

export default errorResponse;
