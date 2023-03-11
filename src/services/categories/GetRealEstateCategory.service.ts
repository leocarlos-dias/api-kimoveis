import { Repository } from "typeorm";
import { AppDataSource } from "../../database/dataSource";
import { Category } from "../../entities/Category.entity";
import { CustomError } from "../../errors/CustomError";
import { ICategory, IGetRealEstateCategorySchema } from "../../interfaces/category.interfaces";

export class GetRealEstateCategoryService {
    async execute(id: number): Promise<IGetRealEstateCategorySchema> {
        const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);

        const categoryFound: ICategory | null = await categoryRepository.findOneBy({ id });
        if (!categoryFound) throw new CustomError(404, "Category not found");

        const realEstateFound: IGetRealEstateCategorySchema | null = await categoryRepository.findOne({
            relations: {
                realEstate: true
            },
            where: {
                id
            }
        });
        if (!realEstateFound) {
            throw new CustomError(404, "RealEstate not found");
        }

        return realEstateFound
    }
}