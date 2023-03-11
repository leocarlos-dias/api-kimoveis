import { z } from "zod";
import { addressSchema } from "../schemas/address.schemas";

export type IAddress = z.infer<typeof addressSchema>;