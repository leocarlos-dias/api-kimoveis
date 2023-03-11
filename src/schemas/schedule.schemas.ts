import { z } from "zod";
import { realEstateSchema } from "./realEstate.schemas";
import { userSchema } from "./user.schemas";

export const scheduleSchema = z.object({
    id: z.number().int().positive(),
    date: z.string(),
    hour: z.string(),
    realEstate: realEstateSchema,
    user: userSchema
});

export const createScheduleSchema = scheduleSchema.omit({
    id: true,
    user: true,
    realEstate: true
}).extend({
    realEstateId: z.number().int().positive()
});