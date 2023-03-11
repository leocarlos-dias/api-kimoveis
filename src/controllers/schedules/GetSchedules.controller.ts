import { Request, Response } from 'express';
import { IRealEstate } from '../../interfaces/realEstate.interfaces';
import { GetSchedulesService } from '../../services/schedules/GetSchedules.service';

export class GetSchedulesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const id = Number(request.params.id);

        const getSchedulesService = new GetSchedulesService()
        const result: IRealEstate = await getSchedulesService.execute(id)

        return response.status(200).json(result);
    }
}