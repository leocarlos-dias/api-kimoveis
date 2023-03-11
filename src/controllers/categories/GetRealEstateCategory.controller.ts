import { Request, Response } from 'express';
import { IGetRealEstateCategorySchema } from '../../interfaces/category.interfaces';
import { GetRealEstateCategoryService } from '../../services/categories/GetRealEstateCategory.service';


export class GetRealEstateCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const category = Number(request.params.id)

        const getRealEstateCategoryService = new GetRealEstateCategoryService()
        const result: IGetRealEstateCategorySchema = await getRealEstateCategoryService.execute(category)

        return response.status(200).json(result);
    }
}