import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

const validateRequest = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  const valid = schema.parse(req.body);

  if (!valid) {
    res.status(400).json({ error: valid.error })
    return;
  }

  next();
}

export const validateParam = (param: string, schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  if (req.params[param]) {
    const valid = schema.parse(req.params[param]);

    if (!valid) {
      res.status(400).json(valid.error);
      return;
    }

    next();
    return;
  }

  res.status(400).json({ error: `Missing required param: ${param}`});
}

export default validateRequest;
