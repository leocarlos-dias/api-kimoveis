import { z } from "zod";
import { createRealEstateSchema, realEstateSchema } from "../schemas/realEstate.schemas";

export type IRealEstate = z.infer<typeof realEstateSchema>;
export type ICreateRealEstate = z.infer<typeof createRealEstateSchema>;
