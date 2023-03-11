import { JwtPayload } from "jsonwebtoken";
import { z, ZodTypeAny } from "zod";
import { authenticateUserSchema, createUserSchema, updateUserSchema, userSchema, userWithoutPasswordSchema } from "../schemas/user.schemas";

export type IUser = z.infer<typeof userSchema>;
export type ICreateUser = z.infer<typeof createUserSchema>;
export type IUserWithoutPassword = z.infer<typeof userWithoutPasswordSchema>
export type IAuthenticateUser = z.infer<typeof authenticateUserSchema>
export type IUpdateUser = z.infer<typeof updateUserSchema>
export type ISchema = z.infer<ZodTypeAny>;

export interface IDecodedToken extends JwtPayload {
    admin: boolean,
}