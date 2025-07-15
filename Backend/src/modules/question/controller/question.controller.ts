import { Request, Response } from "express";
import { apiError } from "../../../utils/apiResponse.utils";
import HttpStatus from "../../../utils/httpstatus.utils";
import {
  createQuestionService,
  deleteQuestionService,
  getQuestionsService,
  updateQuestionService,
} from "../service/question.service";

export const createQuestionController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const response = await createQuestionService(req.body);
    res.status(response.status_code).json(response);
  } catch (error) {
    console.log("Error in createQuestionController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const updateQuestionController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const id = req.params.id;

    const response = await updateQuestionService(id, req.body);
    res.status(response.status_code).json(response);
  } catch (error) {
    console.log("Error in createQuestionController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const deleteQuestionController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const id = req.params.id;
    const response = await deleteQuestionService(id);
    res.status(response.status_code).json(response);
  } catch (error) {
    console.log("Error in createQuestionController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const getQuestionsController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const response = await getQuestionsService();
    res.status(response.status_code).json(response);
  } catch (error) {
    console.log("Error in createQuestionController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};
