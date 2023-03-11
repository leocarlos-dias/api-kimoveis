import { Request, Response } from 'express';
import { ICategory } from '../../interfaces/category.interfaces';
import { GetCategoriesService } from '../../services/categories/GetCategories.service';


export class GetCategoriesController {
    async handle(request: Request, response: Response): Promise<Response> {

        const getCategoriesService = new GetCategoriesService();
        const result: ICategory[] = await getCategoriesService.execute();

        return response.status(200).json(result);
    }
}