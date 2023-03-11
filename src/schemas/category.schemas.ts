import { z } from "zod";
import { realEstateSchema } from "./realEstate.schemas";

export const categorySchema = z.object({
    id: z.number().int().positive(),
    name: z.string().max(45),
});

export const createCategorySchema = categorySchema.omit({
    id: true,

});

export const getRealEstateCategorySchema = categorySchema.extend({
    realEstate: z.array(realEstateSchema)
});