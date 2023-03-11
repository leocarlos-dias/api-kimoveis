
import { Router } from "express";
import { AuthenticateUserController } from "../controllers/users/AuthenticateUser.controller";
import { ensureCheckSchemaMiddleware } from "../middlewares/ensureCheckSchema.middleware";
import { authenticateUserSchema } from "../schemas/user.schemas";

export const sessionsRoute: Router = Router();

sessionsRoute.post("/login", ensureCheckSchemaMiddleware(authenticateUserSchema), new AuthenticateUserController().handle);