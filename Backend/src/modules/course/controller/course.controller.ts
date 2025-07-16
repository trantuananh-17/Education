import { Request, Response } from "express";
import { apiError } from "../../../utils/apiResponse.utils";
import HttpStatus from "../../../utils/httpstatus.utils";
import {
  createCourseService,
  deleteCourseService,
  getAllCourseService,
  getCourseByIdService,
  updateCourseService,
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
    const id = req.params.id;

    const response = await updateCourseService(id, req.body);

    res.status(response.status_code).json(response);
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
    const id = req.params.id;

    const response = await deleteCourseService(id);

    res.status(response.status_code).json(response);
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
    res.status(response.status_code).json(response);
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
    const id = req.params.id;

    const response = await getCourseByIdService(id);

    res.status(response.status_code).json(response);
  } catch (error) {
    console.log("Error in getCourseByIdController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};
