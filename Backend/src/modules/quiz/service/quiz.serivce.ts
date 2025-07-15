import mongoose from "mongoose";
import {
  apiError,
  APIResponse,
  apiResponse,
} from "../../../utils/apiResponse.utils";
import HttpStatus from "../../../utils/httpstatus.utils";
import QuestionModel from "../../question/model/question.model";
import QuizModel, { IQuiz } from "../model/quiz.model";
import { IQuizResponseDTO } from "../interface/quiz.interface";

export const createQuizService = async (
  quiz: IQuiz
): Promise<APIResponse<IQuiz>> => {
  try {
    const {
      courseId,
      title,
      description,
      questions,
      level,
      category,
      duration,
    } = quiz;

    const checkQuestions = await QuestionModel.find({
      _id: {
        $in: questions.map((id) => new mongoose.Types.ObjectId(id)),
      },
    });

    if (checkQuestions.length !== questions.length) {
      return apiError(HttpStatus.BAD_REQUEST, "Một số câu hỏi không tồn tại");
    }

    const newQuiz: IQuiz = new QuizModel({
      courseId,
      title,
      description,
      questions,
      level,
      category,
      duration,
    });

    const response = await newQuiz.save();

    await QuestionModel.updateMany(
      { _id: { $in: questions.map((id) => new mongoose.Types.ObjectId(id)) } },
      { $push: { quizzesId: response._id } }
    );

    return apiResponse(
      HttpStatus.CREATED,
      "Thêm mới đề thi thành công.",
      response
    );
  } catch (error) {
    console.log("Error in createQuizController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const updateQuizService = async (id: string, quiz: IQuiz) => {
  try {
    const response = await QuizModel.findByIdAndUpdate(id, quiz, {
      new: true,
    });

    if (!response) {
      return apiError(HttpStatus.NOT_FOUND, "Không tìm thấy đề thi để sửa!");
    }

    return apiResponse(HttpStatus.OK, "Sửa đề thi thành công.");
  } catch (error) {
    console.log("Error in updateQuizService: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const deleteQuizService = async (id: string) => {
  try {
    const response = await QuizModel.findByIdAndDelete(id);

    if (!response) {
      return apiError(HttpStatus.NOT_FOUND, "Không tìm thấy đề thi để xóa!");
    }

    return apiResponse(HttpStatus.OK, "Xoá đề thi thành công");
  } catch (error) {
    console.log("Error in deleteQuizService: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const getQuizByIdService = async (
  id: string,
  page: number,
  limit: number
): Promise<
  APIResponse<{
    data: IQuizResponseDTO[];
    totalQuestions: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  }>
> => {
  try {
    const skip = (page - 1) * limit;

    const aggr = await QuizModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: { path: "$category", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course",
        },
      },
      { $unwind: { path: "$course", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "questions",
          localField: "questions",
          foreignField: "_id",
          as: "questions",
        },
      },
      {
        $addFields: {
          totalQuestions: { $size: { $ifNull: ["$questions", []] } },
        },
      },
      { $unwind: { path: "$questions", preserveNullAndEmptyArrays: true } },
      {
        $facet: {
          data: [
            { $skip: skip },
            { $limit: limit },
            {
              $project: {
                _id: 1,
                title: 1,
                description: 1,
                duration: 1,
                level: 1,
                "category.title": 1,
                "course.title": 1,
                "questions.questionType": 1,
                "questions.questionText": 1,
                "questions.answers": 1,
              },
            },
          ],
          totalQuestions: [{ $project: { totalQuestions: 1 } }],
        },
      },
    ]);

    const result = aggr[0] as {
      data: IQuizResponseDTO[];
      totalQuestions: { totalQuestions: number }[];
    };

    const totalQuestions = result.totalQuestions[0]?.totalQuestions || 0;
    const totalPages = Math.ceil(totalQuestions / limit);
    const quiz = result.data;

    return apiResponse(HttpStatus.OK, "Lấy đề thi thành công", {
      data: quiz,
      totalQuestions,
      totalPages,
      currentPage: page,
      limit,
    });
  } catch (error) {
    console.log("Error in getQuizByIdService: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};
