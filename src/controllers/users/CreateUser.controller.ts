import { Request, Response } from "express";
import { ICreateUser, IUserWithoutPassword } from "../../interfaces/user.interfaces";
import { CreateUserService } from "../../services/users/CreateUser.service";

export class CreateUserController {
    public async handle(request: Request, response: Response): Promise<Response> {
        const user: ICreateUser = request.body;

        const createUserService = new CreateUserService();
        const result: IUserWithoutPassword = await createUserService.execute(user);

        return response.status(201).json(result);
    }
}
