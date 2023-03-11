import { Repository } from 'typeorm';
import { AppDataSource } from '../../../database/dataSource';
import { Category } from '../../../entities/Category.entity';


type iCategoryRepo = Repository<Category>;

const manyCategories = async (): Promise<any> => {
  const categoryRepo: iCategoryRepo = AppDataSource.getRepository(Category);
  const categoryTotal = 5;

  const manyCategories = Array.from(Array(categoryTotal)).map((val, index) => {
    return { id: expect.any(Number), name: `category ${index}` };
  });

  await categoryRepo
    .createQueryBuilder()
    .insert()
    .values(manyCategories.map(({ id, ...val }) => val))
    .execute();

  return manyCategories;
};

export default { manyCategories };
