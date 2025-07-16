import { Request, Response } from "express";
import { apiError } from "../../../utils/apiResponse.utils";
import HttpStatus from "../../../utils/httpstatus.utils";
import {
  createCourseService,
  getAllCourseService,
} from "../service/course.service";

export const createCourseController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const response = await createCourseService(req.body);

    res.status(response.status_code).json(response);
  } catch (error) {
    console.log("Error in createCourseController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const updateCourseController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
  } catch (error) {
    console.log("Error in updateCourseController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const deleteCourseController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
  } catch (error) {
    console.log("Error in deleteCourseController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const getAllCourseController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const page = req.pagination?.page || 1;
    const limit = req.pagination?.limit || 12;

    const response = await getAllCourseService(page, limit);
    return res.status(response.status_code).json(response);
  } catch (error) {
    console.log("Error in getAllCourseController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const getCourseByIdController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
  } catch (error) {
    console.log("Error in getCourseByIdController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};
