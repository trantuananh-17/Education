import { Router } from "express";
import courseRouter from "./modules/course/routes/course.routes";

const router = Router();

router.use("/courses", courseRouter);

export default router;
