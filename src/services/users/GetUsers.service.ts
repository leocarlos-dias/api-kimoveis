import { AppDataSource } from "../../database/dataSource";
import { User } from "../../entities/User.entity";
import { IUserWithoutPassword } from "../../interfaces/user.interfaces";
import { removePassword } from "../../libs/removePassword";

export class GetUsersService {
    async execute(): Promise<IUserWithoutPassword[]> {
        const userRepository = AppDataSource.getRepository(User);

        const users: User[] = await userRepository.find();
        const usersWithoutPassword = users.map(removePassword);

        return usersWithoutPassword;
    }
}