import { Request, Response } from "express";
import { apiError } from "../../../utils/apiResponse.utils";
import HttpStatus from "../../../utils/httpstatus.utils";

export const createLessonController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
  } catch (error) {
    console.log("Error in registerController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const updatecreateLessonController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
  } catch (error) {
    console.log("Error in registerController: ", error);
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
  } catch (error) {
    console.log("Error in registerController: ", error);
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
    console.log("Error in registerController: ", error);
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
  } catch (error) {
    console.log("Error in registerController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const getcreateLessonByIdController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
  } catch (error) {
    console.log("Error in registerController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};
