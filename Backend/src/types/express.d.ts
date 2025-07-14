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
      user?: IUserPayload;
    }

    interface Request {
      files: { [key: string]: File | File[] };
    }
  }
}

export interface RequestCustom extends Request {
  user?: UserPayload;
}
