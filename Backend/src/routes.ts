import { Router } from "express";
import courseRouter from "./modules/course/routes/course.routes";

import userRouter from "./modules/user/routes/user.routes";
import categoryRouter from "./modules/category/routes/category.routes";
import questionRouter from "./modules/question/routes/question.routes";
import quizRouter from "./modules/quiz/routes/quiz.routes";
import lessonRouter from "./modules/lesson/routes/lesson.routes";

const router = Router();

router.use("/users", userRouter);
router.use("/categories", categoryRouter);
router.use("/questions", questionRouter);
router.use("/quizzes", quizRouter);
router.use("/lessons", lessonRouter);
router.use("/courses", courseRouter);

export default router;
