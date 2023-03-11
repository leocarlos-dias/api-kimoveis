import { Request, Response } from 'express';
import { ICreateRealEstate, IRealEstate } from '../../interfaces/realEstate.interfaces';
import { CreateRealEstateService } from '../../services/realEstate/CreateRealEstate.service';

export class CreateRealEstateController {
    async handle(request: Request, response: Response): Promise<Response> {
        const realEstate: ICreateRealEstate = request.body

        const createRealEstateService = new CreateRealEstateService()
        const result: IRealEstate = await createRealEstateService.execute(realEstate)

        return response.status(201).json(result);
    }
}