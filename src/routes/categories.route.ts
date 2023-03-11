
import { Router } from "express";
import { CreateCategoryController } from "../controllers/categories/CreateCategory.controller";
import { GetCategoriesController } from "../controllers/categories/GetCategories.controller";
import { GetRealEstateCategoryController } from "../controllers/categories/GetRealEstateCategory.controller";
import { ensureAuthenticationMiddleware } from "../middlewares/ensureAuthentication.middleware";
import { ensureCheckSchemaMiddleware } from "../middlewares/ensureCheckSchema.middleware";
import { createCategorySchema } from "../schemas/category.schemas";

export const categoriesRoute: Router = Router();

categoriesRoute.post("/categories", ensureCheckSchemaMiddleware(createCategorySchema), ensureAuthenticationMiddleware("administrator"), new CreateCategoryController().handle);
categoriesRoute.get("/categories", new GetCategoriesController().handle);
categoriesRoute.get("/categories/:id/realEstate", new GetRealEstateCategoryController().handle);
