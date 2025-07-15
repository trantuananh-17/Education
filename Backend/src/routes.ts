import { Router } from "express";
import userRouter from "./modules/user/routes/user.routes";
import categoryRouter from "./modules/category/routes/category.routes";

const router = Router();

router.use("/users", userRouter);
router.use("/categories", categoryRouter);

export default router;
