import { Request, Response } from 'express';
import { DeleteUserService } from '../../services/users/DeleteUser.service';

export class DeleteUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const id = Number(request.params.id);

        const deleteUserService = new DeleteUserService();
        await deleteUserService.execute(id);

        return response.status(204).end();
    }
}