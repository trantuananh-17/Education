import {
  createQuizService,
  deleteQuizService,
  getQuizByIdService,
  updateQuizService,
} from "./../service/quiz.serivce";
import { apiError } from "../../../utils/apiResponse.utils";
import HttpStatus from "../../../utils/httpstatus.utils";
import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { errorRes } from "../../../utils/errorResponse.utils";

export const createQuizController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const response = await createQuizService(req.body);
    res.status(response.status_code).json(response);
  } catch (error) {
    console.log("Error in createQuizController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const updateQuizController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const id = req.params.id;
    const response = await updateQuizService(id, req.body);
    res.status(response.status_code).json(response);
  } catch (error) {
    console.log("Error in updateQuizController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const deleteQuizController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const id = req.params.id;
    const response = await deleteQuizService(id);
    res.status(response.status_code).json(response);
  } catch (error) {
    console.log("Error in deleteQuizController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const getQuizByIdController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const id = req.params.id;

    if (!isValidObjectId(id)) {
      return errorRes(res, "Id không hợp lệ", HttpStatus.BAD_REQUEST);
    }

    const page = req.pagination?.page || 1;
    const limit = req.pagination?.limit || 12;

    const response = await getQuizByIdService(id, page, limit);

    res.status(response.status_code).json(response);
  } catch (error) {
    console.log("Error in getQuizByIdController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};
