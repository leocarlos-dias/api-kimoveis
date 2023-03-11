
import { Router } from "express";
import { CreateUserController } from "../controllers/users/CreateUser.controller";
import { DeleteUserController } from "../controllers/users/DeleteUser.controller";
import { GetUsersController } from "../controllers/users/GetUsers.controller";
import { UpdateUserController } from "../controllers/users/UpdateUser.controller";
import { ensureAlreadyUserExistsMiddleware } from "../middlewares/ensureAlreadyUserExists.middleware";
import { ensureAuthenticationMiddleware } from "../middlewares/ensureAuthentication.middleware";
import { ensureCheckSchemaMiddleware } from "../middlewares/ensureCheckSchema.middleware";
import { createUserSchema, updateUserSchema } from "../schemas/user.schemas";

export const usersRoute: Router = Router();

usersRoute.post("/users", ensureCheckSchemaMiddleware(createUserSchema), new CreateUserController().handle);
usersRoute.get("/users", ensureAuthenticationMiddleware("administrator"), new GetUsersController().handle);
usersRoute.patch("/users/:id", ensureCheckSchemaMiddleware(updateUserSchema), ensureAlreadyUserExistsMiddleware, ensureAuthenticationMiddleware(), new UpdateUserController().handle);
usersRoute.delete("/users/:id", ensureAlreadyUserExistsMiddleware, ensureAuthenticationMiddleware(), new DeleteUserController().handle);
