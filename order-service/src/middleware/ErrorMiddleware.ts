import { AppError } from '@/utils/error';
import { logger } from '@/utils/logger';
import { Request, Response, NextFunction } from 'express';

export class ErrorMiddleware {
  public static handler = (
    err: AppError,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    logger.error(err);
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error',
    });
  };
}