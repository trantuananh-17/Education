import { Router } from "express";
import {
  createCourseController,
  getAllCourseController,
} from "../controller/course.controller";
import { paginationMiddleware } from "../../../middleware/pagination.middleware";

const courseRouter = Router();

courseRouter.post("/", createCourseController);
courseRouter.get("/", paginationMiddleware(), getAllCourseController);

export default courseRouter;
