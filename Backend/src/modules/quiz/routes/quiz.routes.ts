import { Router } from "express";
import authMiddleware from "../../../middleware/auth.middleware";
import roleMiddleware from "../../../middleware/role.middleware";
import {
  createQuizController,
  deleteQuizController,
  getQuizByIdController,
  updateQuizController,
} from "../controller/quiz.controller";
import { getQuizByIdService } from "../service/quiz.serivce";
import { paginationMiddleware } from "../../../middleware/pagination.middleware";

const quizRouter = Router();

quizRouter.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "teacher"]),
  createQuizController
);

quizRouter.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "teacher"]),
  updateQuizController
);

quizRouter.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "teacher"]),
  deleteQuizController
);

quizRouter.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "teacher", "student"]),
  paginationMiddleware(),
  getQuizByIdController
);

export default quizRouter;
