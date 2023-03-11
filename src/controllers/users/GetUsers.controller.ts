import { Request, Response } from 'express';
import { IUserWithoutPassword } from '../../interfaces/user.interfaces';
import { GetUsersService } from '../../services/users/GetUsers.service';

export class GetUsersController {
    async handle(request: Request, response: Response): Promise<Response> {

        const getUsersService = new GetUsersService();
        const result: IUserWithoutPassword[] = await getUsersService.execute();

        return response.status(200).json(result);
    }
}