import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { RequestCustom } from "../types/express";
import HttpStatus from "../utils/httpstatus.utils";
import { IUserPayload } from "../modules/user/interface/user.interface";

dotenv.config();

const authMiddleware = (
  req: RequestCustom,
  res: Response,
  next: NextFunction
): any => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: "Bạn chưa đăng nhập" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY!);

    req.user = decoded as IUserPayload;
    next();
  } catch (error) {
    console.log("error: ", error);
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: "Token không hợp lệ" });
  }
};

export default authMiddleware;
