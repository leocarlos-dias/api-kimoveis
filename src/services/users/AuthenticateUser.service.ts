import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppDataSource } from "../../database/dataSource";
import { User } from "../../entities/User.entity";
import { CustomError } from "../../errors/CustomError";
import { IAuthenticateUser, IUser } from "../../interfaces/user.interfaces";

export class AuthenticateUserService {
    async execute(user: IAuthenticateUser): Promise<string> {
        const userRepository = AppDataSource.getRepository(User);

        const userFound: IUser | null = await userRepository.findOneBy({ email: user.email });
        if (!userFound) throw new CustomError(401, "Invalid credentials");

        const correctPassword: boolean = await compare(user.password, userFound.password)
        if (!correctPassword) throw new CustomError(401, "Invalid credentials");

        const token = sign({ admin: userFound.admin }, String(process.env.SECRET_KEY), {
            subject: String(userFound.id),
            expiresIn: "15m"
        });

        return token;
    }
}