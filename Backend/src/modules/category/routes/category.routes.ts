import { Router } from "express";
import { paginationMiddleware } from "../../../middleware/pagination.middleware";
import {
  createCategoryController,
  deleteCategoryController,
  getCategoriesController,
  updateCategoryController,
} from "../controller/category.controller";
import authMiddleware from "../../../middleware/auth.middleware";
import roleMiddleware from "../../../middleware/role.middleware";

const categoryRouter = Router();

categoryRouter.get("/", paginationMiddleware(), getCategoriesController);
categoryRouter.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "teacher"]),
  createCategoryController
);

categoryRouter.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "teacher"]),
  updateCategoryController
);

categoryRouter.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "teacher"]),
  deleteCategoryController
);

export default categoryRouter;
