import { number } from "joi";
import {
  apiError,
  apiResponse,
  APIResponse,
} from "../../../utils/apiResponse.utils";
import HttpStatus from "../../../utils/httpstatus.utils";
import CategoryModel, { ICategory } from "../model/category.model";
import dotenv from "dotenv";

dotenv.config();

export const getCategoriesService = async (
  query: string | undefined,
  page: number,
  limit: number,
  sortBy: string,
  sortOrder: "asc" | "desc"
): Promise<
  APIResponse<{
    data: ICategory[];
    totalDocs: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  }>
> => {
  try {
    const filter: any = {};

    if (query?.trim()) {
      const searchRegex = new RegExp(query.trim(), "i");
      filter.$or = [{ title: searchRegex }];
    }

    const skip = (page - 1) * limit;

    const sortDirection = sortOrder === "asc" ? 1 : -1;

    const aggr = await CategoryModel.aggregate([
      { $match: filter },
      {
        $facet: {
          data: [
            { $sort: { [sortBy]: sortDirection } },
            { $skip: skip },
            { $limit: limit },
            {
              $project: {
                _id: 1,
                title: 1,
                description: 1,
              },
            },
          ],
          totalCount: [{ $count: "count" }],
        },
      },
    ]);

    const result = aggr[0] as {
      data: ICategory[];
      totalCount: { count: number }[];
    };

    const totalDocs = result.totalCount[0]?.count || 0;
    const totalPages = Math.ceil(totalDocs / limit);
    const categories = result.data;

    return apiResponse(HttpStatus.OK, "Lấy danh sách danh mục thành công.", {
      data: categories,
      totalDocs,
      totalPages,
      currentPage: page,
      limit,
    });
  } catch (error) {
    console.log("Error in getCategoriesController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const createCategoryService = async (
  category: ICategory
): Promise<APIResponse<ICategory>> => {
  try {
    const { title, description } = category;
    const newCategory = new CategoryModel({ title, description });

    const createdCategory = await newCategory.save();

    return apiResponse(
      HttpStatus.CREATED,
      "Thêm mới danh mục thành công.",
      createdCategory
    );
  } catch (error) {
    console.log("Error in createCategoryService: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const updateCategoryService = async (
  id: string,
  category: ICategory
): Promise<any> => {
  try {
    await CategoryModel.findByIdAndUpdate(id, category, {
      new: true,
    });
    return apiResponse(HttpStatus.OK, "Cập nhật danh mục thành công.");
  } catch (error) {
    console.log("Error in updateCategoryService: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const deleteCategoryService = async (id: string): Promise<any> => {
  try {
    await CategoryModel.findByIdAndDelete(id);
    return apiResponse(HttpStatus.OK, "Xóa danh mục thành công.");
  } catch (error) {
    console.log("Error in deleteCategoryService: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};
