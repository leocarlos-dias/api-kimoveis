import { Repository } from "typeorm";
import { AppDataSource } from "../../database/dataSource";
import { User } from "../../entities/User.entity";
import { CustomError } from "../../errors/CustomError";
import { ICreateUser, IUser, IUserWithoutPassword } from "../../interfaces/user.interfaces";
import { removePassword } from "../../libs/removePassword";

export class CreateUserService {
    async execute(user: ICreateUser): Promise<IUserWithoutPassword> {
        const userRepository: Repository<User> = AppDataSource.getRepository(User);

        const emailAlreadyExists = await userRepository.findOneBy({ email: user.email });
        if (emailAlreadyExists) {
            throw new CustomError(409, "Email already exists");
        }

        const createdUser: IUser = await userRepository.save(userRepository.create(user));
        const createdUserWithoutPassword: IUserWithoutPassword = removePassword(createdUser);

        return createdUserWithoutPassword;
    }
}