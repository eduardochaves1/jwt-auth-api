import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import errorResponse from "../utils/errorResponses";

const validateRequest = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  const valid = schema.parse(req.body);

  if (!valid) {
    errorResponse(res, 400, 'Validation Error', valid.error);
    return;
  }

  next();
}

export const validateParam = (param: string, schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  if (req.params[param]) {
    const valid = schema.parse(req.params[param]);

    if (!valid) {
      errorResponse(res, 400, 'Validation Error', valid.error);
      return;
    }

    next();
    return;
  }

  errorResponse(res, 400, `Missing required param: ${param}`);
}

export default validateRequest;
