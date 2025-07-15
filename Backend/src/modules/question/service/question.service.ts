import {
  apiError,
  APIResponse,
  apiResponse,
} from "../../../utils/apiResponse.utils";
import HttpStatus from "../../../utils/httpstatus.utils";
import { IQuestionResponse } from "../interface/question.interface";
import QuestionModel, { IQuestion } from "../model/question.model";

export const createQuestionService = async (
  question: IQuestion
): Promise<APIResponse<IQuestion>> => {
  try {
    const { quizId, questionText, questionType, answers } = question;
    const newQuestion = new QuestionModel({
      quizId,
      questionText,
      questionType,
      answers,
    });

    const response = await newQuestion.save();

    return apiResponse(
      HttpStatus.CREATED,
      "Thêm câu hỏi thành công.",
      response
    );
  } catch (error) {
    console.log("Error in createQuestionController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const deleteQuestionService = async (id: string) => {
  try {
    const response = await QuestionModel.findByIdAndDelete(id);

    if (!response) {
      return apiError(HttpStatus.NOT_FOUND, "Không tìm thấy câu hỏi để xóa!");
    }

    return apiResponse(HttpStatus.OK, "Xoá câu hỏi thành công");
  } catch (error) {
    console.log("Error in createQuestionController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const updateQuestionService = async (
  id: string,
  question: IQuestion
) => {
  try {
    const response = await QuestionModel.findByIdAndUpdate(id, question, {
      new: true,
    });

    if (!response) {
      return apiError(HttpStatus.NOT_FOUND, "Không tìm thấy câu hỏi để sửa!");
    }

    return apiResponse(HttpStatus.OK, "Sửa câu hỏi thành công.");
  } catch (error) {
    console.log("Error in createQuestionController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const getQuestionsService = async () => {
  try {
    const query: any = {};

    const response = await QuestionModel.find(query);

    return apiResponse(HttpStatus.OK, "Lấy kho câu hỏi thành công.", response);
  } catch (error) {
    console.log("Error in createQuestionController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};
