import { Request, Response } from 'express';
import { IAuthenticateUser } from '../../interfaces/user.interfaces';
import { AuthenticateUserService } from '../../services/users/AuthenticateUser.service';

export class AuthenticateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const user: IAuthenticateUser = request.body;

        const authenticateUserService = new AuthenticateUserService();
        const result: string = await authenticateUserService.execute(user);

        return response.status(200).json({ token: result });
    }
}