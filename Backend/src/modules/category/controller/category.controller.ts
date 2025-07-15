import { Request, Response } from "express";
import { apiError } from "../../../utils/apiResponse.utils";
import HttpStatus from "../../../utils/httpstatus.utils";
import {
  createCategoryService,
  deleteCategoryService,
  getCategoriesService,
  updateCategoryService,
} from "../service/category.service";

export const createCategoryController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const response = await createCategoryService(req.body);

    res.status(response.status_code).json(response);
  } catch (error) {
    console.log("Error in createCategoryController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const updateCategoryController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const id = req.params.id;

    const response = await updateCategoryService(id, req.body);

    res.status(response.status_code).json(response);
  } catch (error) {
    console.log("Error in updateCategoryController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const deleteCategoryController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const id = req.params.id;

    const response = await deleteCategoryService(id);

    res.status(response.status_code).json(response);
  } catch (error) {
    console.log("Error in deleteCategoryController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const getCategoriesController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const query =
      typeof req.query.q === "string" ? req.query.q.trim() : undefined;

    const page = req.pagination?.page || 1;
    const limit = req.pagination?.limit || 12;

    const sortBy = (req.query.sortBy as string) || "createdAt";
    const sortOrder =
      (req.query.sortOrder as string) === "asc" ? "asc" : "desc";

    const response = await getCategoriesService(
      query,
      page,
      limit,
      sortBy,
      sortOrder
    );
    return res.status(response.status_code).json(response);
  } catch (error) {
    console.log("Error in getCategoriesController: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};
