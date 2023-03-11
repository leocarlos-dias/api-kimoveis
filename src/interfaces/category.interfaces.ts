import { z } from "zod";
import { categorySchema, createCategorySchema, getRealEstateCategorySchema } from "../schemas/category.schemas";

export type ICategory = z.infer<typeof categorySchema>;
export type ICreateCategory = z.infer<typeof createCategorySchema>;
export type IGetRealEstateCategorySchema = z.infer<(typeof getRealEstateCategorySchema)>;