import { Request, Response, NextFunction } from "express";

type Error = {
  status?: number;
  message?: any;
  issues?: any;
}

const errorHandler = (err: Error, Request: Request, res: Response, next: NextFunction) => {
  console.error(err.issues);

  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message || err.issues[0].message || 'Internal Server Error',
    },
  });
};

export default errorHandler;
