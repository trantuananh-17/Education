import mongoose from "mongoose";
import {
  apiError,
  apiResponse,
  APIResponse,
} from "../../../utils/apiResponse.utils";
import HttpStatus from "../../../utils/httpstatus.utils";
import UserModel from "../../user/model/user.model";
import CoursesModel, { ICourse } from "../model/course.model";

export const createCourseService = async (
  course: Partial<ICourse>
): Promise<APIResponse<ICourse>> => {
  try {
    const {
      title,
      description,
      instructorId,
      lessons,
      resources,
      reviews,
      quizzes,
      category,
      users,
    } = course;

    const newCourse = new CoursesModel({
      title,
      description,
      instructorId,
      lessons,
      resources,
      reviews,
      quizzes,
      category,
      users,
    });

    const response = await newCourse.save();

    await UserModel.updateOne(
      { _id: instructorId },
      { $push: { courses: response._id } }
    );

    return apiResponse(
      HttpStatus.CREATED,
      "Thêm mới khóa học thành công",
      response
    );
  } catch (error) {
    console.log("Error in createCourseService: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const updateCourseService = async (
  id: string,
  course: Partial<ICourse>
) => {
  try {
    const response = await CoursesModel.findByIdAndUpdate(id, course, {
      new: true,
    });

    if (!response) {
      return apiError(HttpStatus.NOT_FOUND, "Không tìm thấy khóa học để sửa.");
    }

    return apiResponse(HttpStatus.OK, "Cập nhật khóa học thành công");
  } catch (error) {
    console.log("Error in updateCourseService: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const deleteCourseService = async (id: string) => {
  try {
    const response = await CoursesModel.findByIdAndDelete(id);

    if (!response) {
      return apiError(HttpStatus.NOT_FOUND, "Không tìm thấy khóa học để xóa.");
    }

    return apiResponse(HttpStatus.OK, "Xóa khóa học thành công");
  } catch (error) {
    console.log("Error in deleteCourseService: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const getAllCourseService = async (
  page: number,
  limit: number
): Promise<
  APIResponse<{
    data: ICourse[];
    totalDocs: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  }>
> => {
  try {
    const skip = (page - 1) * limit;

    const courses = await CoursesModel.find()
      .skip(skip)
      .limit(limit)
      .populate("instructorId", "_id email fullname");

    const totalDocs = await CoursesModel.countDocuments();

    const totalPages = Math.ceil(totalDocs / limit);

    return apiResponse(HttpStatus.OK, "Lấy danh sách khóa học thành công.", {
      data: courses,
      totalDocs,
      totalPages,
      currentPage: page,
      limit,
    });
  } catch (error) {
    console.log("Error in getAllCourseService: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const getCourseByIdService = async (
  id: string
): Promise<APIResponse<ICourse>> => {
  try {
    const courses = await CoursesModel.findById(id)
      .populate("instructorId", "_id email fullname")
      // .populate("lessons")
      // .populate("reviews")
      .populate("users");

    if (!courses) {
      return apiError(HttpStatus.NOT_FOUND, "Không tìm thấy khóa học");
    }

    return apiResponse(
      HttpStatus.OK,
      "Lấy danh sách khóa học thành công.",
      courses
    );
  } catch (error) {
    console.log("Error in getCourseByIdService: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};
