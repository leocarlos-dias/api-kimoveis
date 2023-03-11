import { Repository } from "typeorm";
import { AppDataSource } from "../../database/dataSource";
import { User } from "../../entities/User.entity";
import { CustomError } from "../../errors/CustomError";
import { IUser } from "../../interfaces/user.interfaces";


export class DeleteUserService {
    async execute(id: number): Promise<void> {
        const userRepository: Repository<User> = AppDataSource.getRepository(User);

        const userFound: IUser | null = await userRepository.findOneBy({ id });
        if (!userFound) throw new CustomError(404, "User not found");

        await userRepository.softDelete({ id });
    }
}