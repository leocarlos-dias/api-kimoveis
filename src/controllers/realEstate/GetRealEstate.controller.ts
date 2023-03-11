import { Request, Response } from 'express';
import { IRealEstate } from '../../interfaces/realEstate.interfaces';
import { GetRealEstateService } from '../../services/realEstate/GetRealEstate.service';

export class GetRealEstateController {
    async handle(request: Request, response: Response): Promise<Response> {
        const getRealEstateService = new GetRealEstateService()
        const result: IRealEstate[] = await getRealEstateService.execute()

        return response.status(200).json(result);
    }
}