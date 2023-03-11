import { z } from "zod";
import { createAddressSchema } from "./address.schemas";

export const realEstateSchema = z.object({
    id: z.number().int().positive(),
    sold: z.boolean().default(false),
    value: z.number().positive().or(z.string()),
    size: z.number().positive(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const createRealEstateSchema = realEstateSchema.pick({
    value: true,
    size: true,
}).extend({
    address: createAddressSchema,
    categoryId: z.number().positive()
});