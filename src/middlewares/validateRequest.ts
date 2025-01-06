import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

const validateRequest = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  const validation = schema.parse(req.body);

  if (!validation.success) {
    res.status(400).json(validation.error)
  }

  next();
}

export const validateParam = (param: string, schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  if (req.params[param]) {
    const validation = schema.parse(req.params[param]);

    if (!validation.success) {
      res.status(400).json(validation.error);
    }

    next();
  }

  res.status(400).json({ message: `Missing required param: ${param}`});
}

export default validateRequest;
