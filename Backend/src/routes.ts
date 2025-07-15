import { Router } from "express";
import userRouter from "./modules/user/routes/user.routes";
import questionRouter from "./modules/question/routes/question.routes";

const router = Router();

router.use("/users", userRouter);
router.use("/questions", questionRouter);

export default router;
