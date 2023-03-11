import { DeepPartial, Repository } from 'typeorm';
import { AppDataSource } from '../../../database/dataSource';
import { User } from '../../../entities/User.entity';

type iUserRepo = Repository<User>;
type iUserDeepPartial = DeepPartial<User>;

const readUsers = async (): Promise<Array<User>> => {
  const userRepo: iUserRepo = AppDataSource.getRepository(User);
  const usersTotal = 5;

  return await userRepo.save(
    Array.from(Array(usersTotal))
      .map((val, index): iUserDeepPartial => {
        const name = `user${index}`;
        const email = `${name}@mail.com`;

        return {
          id: expect.any(Number),
          name,
          email,
          password: '1234',
          admin: expect.any(Boolean),
        };
      })
      .map(({ id, ...el }) => el)
  );
};

export default { readUsers };
