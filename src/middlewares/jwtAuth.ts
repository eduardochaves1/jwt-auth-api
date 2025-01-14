import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import errorResponse from "../utils/errorResponses";

const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.path === '/api/users/login') {
    next();
    return;
  }

  const authorizationHeader = req.headers.authorization;
  const token = authorizationHeader?.split(' ')[1]

  if (!token) {
    errorResponse(res, 401, 'Missing Berarer Token in Authorization Header');
    return;
  }

  const jwtSecret = process.env.JWT_SECRET as string;

  try {
    const decoded = jwt.verify(token, jwtSecret);

    (req as any).user = decoded;
  } catch (error) {
    errorResponse(res, 401, 'Error while trying to Authenticate', error);
    return;
  }

  next();
}

export default jwtAuth;
