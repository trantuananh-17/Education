import { Request, Response, NextFunction } from "express";
import logger from "../config/winston.config";

const logRequestTime = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on("finish", () => {
    const end = Date.now();
    const duration = end - start;

    logger.info(
      `Request to ${req.method} ${req.originalUrl} took ${duration}ms - ${res.statusCode}`
    );
  });

  next();
};

export default logRequestTime;
