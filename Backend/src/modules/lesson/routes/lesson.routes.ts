import { Router } from "express";
import {
  createLessonController,
  deleteLessonController,
  getLessonByCourseController,
  getLessonByIdController,
  updateLessonController,
} from "../controller/lesson.controller";

const lessonRouter = Router();

lessonRouter.post("/", createLessonController);
lessonRouter.put("/:id", updateLessonController);
lessonRouter.delete("/:id", deleteLessonController);
lessonRouter.get("/course/:courseId", getLessonByCourseController);
lessonRouter.get("/:id", getLessonByIdController);

export default lessonRouter;
