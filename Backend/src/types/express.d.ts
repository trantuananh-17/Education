import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      pagination?: {
        page: number;
        limit: number;
      };
    }
    interface Request {
      userId?: Types.ObjectId;
    }

    interface Request {
      files: { [key: string]: File | File[] };
    }
  }
}
