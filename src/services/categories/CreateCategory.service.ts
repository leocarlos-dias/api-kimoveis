import { Repository } from "typeorm";
import { AppDataSource } from "../../database/dataSource";
import { Category } from "../../entities/Category.entity";
import { CustomError } from "../../errors/CustomError";
import { ICategory, ICreateCategory } from "../../interfaces/category.interfaces";

export class CreateCategoryService {
    async execute(category: ICreateCategory): Promise<ICategory> {
        const userRepository: Repository<Category> = AppDataSource.getRepository(Category);

        const categoryAlreadyExists = await userRepository.findOneBy({ name: category.name });
        if (categoryAlreadyExists) {
            throw new CustomError(409, "Category already exists");
        }

        const createdCategory: ICategory = await userRepository.save(userRepository.create(category));

        return createdCategory;
    }
}