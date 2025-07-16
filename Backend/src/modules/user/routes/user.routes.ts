import { Router } from "express";
import {
  changePasswordController,
  loginController,
  registerController,
} from "../controller/user.controller";
import authMiddleware from "../../../middleware/auth.middleware";
import roleMiddleware from "../../../middleware/role.middleware";

const userRouter = Router();

userRouter.post("/register", registerController);
userRouter.post("/login", loginController);
userRouter.patch(
  "/changePassword",
  authMiddleware,
  roleMiddleware(["student"]),
  changePasswordController
);

export default userRouter;
