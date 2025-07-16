import { Router } from "express";
import {
  createCourseController,
  deleteCourseController,
  getAllCourseController,
  getCourseByIdController,
  updateCourseController,
} from "../controller/course.controller";
import { paginationMiddleware } from "../../../middleware/pagination.middleware";

const courseRouter = Router();

courseRouter.post("/", createCourseController);
courseRouter.get("/", paginationMiddleware(), getAllCourseController);
courseRouter.get("/:id", getCourseByIdController);
courseRouter.put("/:id", updateCourseController);
courseRouter.delete("/:id", deleteCourseController);

export default courseRouter;
