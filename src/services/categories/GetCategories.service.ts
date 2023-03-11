import { Repository } from "typeorm";
import { AppDataSource } from "../../database/dataSource";
import { Category } from "../../entities/Category.entity";
import { ICategory } from "../../interfaces/category.interfaces";

export class GetCategoriesService {
    async execute(): Promise<ICategory[]> {
        const userRepository: Repository<Category> = AppDataSource.getRepository(Category);
        const categories: ICategory[] = await userRepository.find();

        return categories;
    }
}