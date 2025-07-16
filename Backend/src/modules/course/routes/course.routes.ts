import { Router } from "express";
import {
  createCourseController,
  getAllCourseController,
} from "../controller/course.controller";

const courseRouter = Router();

courseRouter.post("/", createCourseController);
courseRouter.get("/", getAllCourseController);

export default courseRouter;
