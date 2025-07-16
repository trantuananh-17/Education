import { Request, Response } from "express";
import { apiError } from "../../../utils/apiResponse.utils";
import HttpStatus from "../../../utils/httpstatus.utils";
import {
  createLessonService,
  deleteLessonService,
  getLessonByCourseService,
  getLessonByIdService,
  updateLessonService,
} from "../service/lesson.service";

export const createLessonController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const response = await createLessonService(req.body);
    res.status(response.status_code).json(response);
  } catch (error) {
    console.log("Error in createLessonController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const updateLessonController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const id = req.params.id;
    const response = await updateLessonService(id, req.body);
    res.status(response.status_code).json(response);
  } catch (error) {
    console.log("Error in updateLessonController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const deleteLessonController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const id = req.params.id;
    const response = await deleteLessonService(id);
    res.status(response.status_code).json(response);
  } catch (error) {
    console.log("Error in deleteLessonController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const getLessonsController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
  } catch (error) {
    console.log("Error in getLessonsController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const getLessonByCourseController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const courseId = req.params.courseId;

    const response = await getLessonByCourseService(courseId);
    res.status(response.status_code).json(response);
  } catch (error) {
    console.log("Error in getLessonByCourseController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const getLessonByIdController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const id = req.params.id;

    const response = await getLessonByIdService(id);
    res.status(response.status_code).json(response);
  } catch (error) {
    console.log("Error in getLessonByIdController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};
