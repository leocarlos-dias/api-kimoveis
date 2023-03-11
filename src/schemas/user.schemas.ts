import { z } from "zod";

export const userSchema = z.object({
    id: z.number().int().positive(),
    name: z.string().max(45),
    email: z.string().email().max(45),
    admin: z.boolean().default(false),
    password: z.string().max(120),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().or(z.undefined())
});

export const userWithoutPasswordSchema = userSchema.omit({
    password: true,
});

export const createUserSchema = userSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
});

export const authenticateUserSchema = userSchema.pick({
    email: true,
    password: true,
});

export const updateUserSchema = userSchema.pick({
    name: true,
    email: true,
    password: true
}).partial();