import { Request, Response } from "express";
import { ICategory, ICreateCategory } from "../../interfaces/category.interfaces";
import { CreateCategoryService } from "../../services/categories/CreateCategory.service";

export class CreateCategoryController {
    public async handle(request: Request, response: Response): Promise<Response> {
        const category: ICreateCategory = request.body;

        const createCategoryService = new CreateCategoryService();
        const result: ICategory = await createCategoryService.execute(category);

        return response.status(201).json(result);
    }
}
