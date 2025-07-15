import { Router } from "express";
import userRouter from "./modules/user/routes/user.routes";
<<<<<<< HEAD
import categoryRouter from "./modules/category/routes/category.routes";
=======
import questionRouter from "./modules/question/routes/question.routes";
>>>>>>> 87dc424ae564159d63f36b27ac8655c6f8b3277e

const router = Router();

router.use("/users", userRouter);
<<<<<<< HEAD
router.use("/categories", categoryRouter);
=======
router.use("/questions", questionRouter);
>>>>>>> 87dc424ae564159d63f36b27ac8655c6f8b3277e

export default router;
