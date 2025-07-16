import mongoose from "mongoose";
import {
  apiError,
  APIResponse,
  apiResponse,
} from "../../../utils/apiResponse.utils";
import HttpStatus from "../../../utils/httpstatus.utils";
import CoursesModel from "../../course/model/course.model";
import LessonModel, { ILesson } from "../model/lesson.model";

export const createLessonService = async (
  lesson: Partial<ILesson>
): Promise<APIResponse<ILesson>> => {
  try {
    const { courseId, title, content, resources } = lesson;

    const newLesson = new LessonModel({ courseId, title, content, resources });

    const response = await newLesson.save();

    await CoursesModel.updateOne(
      { _id: courseId },
      { $push: { lessons: response._id } }
    );

    return apiResponse(
      HttpStatus.CREATED,
      "Thêm mới bài giảng thành công.",
      response
    );
  } catch (error) {
    console.log("Error in createLessonService: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const updateLessonService = async (id: string, lesson: ILesson) => {
  try {
    const response = await LessonModel.findByIdAndUpdate(id, lesson, {
      new: true,
    });

    if (!response) {
      return apiError(HttpStatus.NOT_FOUND, "Không tìm thấy bài giảng để sửa!");
    }

    return apiResponse(HttpStatus.OK, "Sửa bài giảng thành công.");
  } catch (error) {
    console.log("Error in updateLessonService: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const deleteLessonService = async (id: string) => {
  try {
    const response = await LessonModel.findByIdAndDelete(id);

    if (!response) {
      return apiError(HttpStatus.NOT_FOUND, "Không tìm thấy bài giảng để xóa!");
    }

    await CoursesModel.updateMany({ lessons: id }, { $pull: { lessons: id } });

    return apiResponse(HttpStatus.OK, "Xoá bài giảng thành công");
  } catch (error) {
    console.log("Error in deleteLessonService: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const getLessonsService = async () => {
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

export const getLessonByCourseService = async (
  courseId: string
): Promise<APIResponse<ILesson[]>> => {
  try {
    const response = await LessonModel.find({
      courseId: new mongoose.Types.ObjectId(courseId),
    });
    console.log(courseId);

    console.log(response);

    return apiResponse(
      HttpStatus.OK,
      "Lấy bài giảng theo khóa học thành công",
      response
    );
  } catch (error) {
    console.log("Error in registerController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const getLessonByIdService = async (
  id: string
): Promise<APIResponse<ILesson | null>> => {
  try {
    const response = await LessonModel.findById(id);
    return apiResponse(HttpStatus.OK, "Lấy bài giảng thành công", response);
  } catch (error) {
    console.log("Error in registerController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};
