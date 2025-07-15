import { Router } from "express";
import authMiddleware from "../../../middleware/auth.middleware";
import roleMiddleware from "../../../middleware/role.middleware";
import {
  createQuestionController,
  deleteQuestionController,
  getQuestionsController,
  updateQuestionController,
} from "../controller/question.controller";

const questionRouter = Router();

questionRouter.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  createQuestionController
);
questionRouter.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  getQuestionsController
);
questionRouter.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  updateQuestionController
);
questionRouter.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteQuestionController
);

export default questionRouter;
