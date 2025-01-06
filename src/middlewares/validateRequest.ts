import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

const validateRequest = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  const validation = schema.parse(req.body);

  if (!validation.success) {
    res.status(400).json(validation.error)
  }

  req.body = validation.data;
  next();
}

export default validateRequest;
