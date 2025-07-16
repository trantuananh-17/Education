import { Request, Response } from "express";
import { apiError } from "../../../utils/apiResponse.utils";
import HttpStatus from "../../../utils/httpstatus.utils";
import {
  changePasswordService,
  loginService,
  registerService,
} from "../service/user.service";

export const registerController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email, password, fullName } = req.body;

    const response = await registerService(req.body);

    res.status(response.status_code).json(response);
  } catch (error) {
    console.log("Error in registerController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const loginController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const response = await loginService(req.body);

    res.status(response.status_code).json(response);
  } catch (error) {
    console.log("Error in loginController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const changePasswordController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId = req.user.id;

    const response = await changePasswordService(userId, req.body);

    res.status(response.status_code).json(response);
  } catch (error) {
    console.log("Error in changePasswordController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};
