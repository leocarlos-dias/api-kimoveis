import { Repository } from "typeorm";
import { AppDataSource } from "../../database/dataSource";
import { User } from "../../entities/User.entity";
import { CustomError } from "../../errors/CustomError";
import { IUpdateUser, IUser, IUserWithoutPassword } from "../../interfaces/user.interfaces";
import { removePassword } from "../../libs/removePassword";

export class UpdateUserService {
    async execute(user: IUpdateUser, id: number): Promise<IUserWithoutPassword> {
        const userRepository: Repository<User> = AppDataSource.getRepository(User);

        const userFound: IUser | null = await userRepository.findOneBy({ id });
        if (!userFound) throw new CustomError(404, "User not found");

        const mergeUser: IUser = Object.assign(userFound, user);

        const updatedUser: IUser = await userRepository.save(userRepository.create(mergeUser));
        const updatedUserWithoutPassword: IUserWithoutPassword = removePassword(updatedUser);

        return updatedUserWithoutPassword;
    }
}