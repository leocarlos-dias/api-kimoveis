import { Request, Response } from 'express';
import { IUpdateUser } from '../../interfaces/user.interfaces';
import { UpdateUserService } from '../../services/users/UpdateUser.service';

export class UpdateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const user: IUpdateUser = request.body;
        const id = Number(request.params.id);

        const updateUserService = new UpdateUserService();
        const result = await updateUserService.execute(user, id);

        return response.status(200).json(result);
    }
}