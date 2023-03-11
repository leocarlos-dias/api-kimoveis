import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../database/dataSource";
import { User } from "../entities/User.entity";
import { CustomError } from "../errors/CustomError";
import { IUser } from "../interfaces/user.interfaces";


export async function ensureAlreadyUserExistsMiddleware(request: Request, response: Response, next: NextFunction) {
    const id = Number(request.params.id);

    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const userFound: IUser | null = await userRepository.findOneBy({ id });

    if (!userFound) {
        throw new CustomError(404, "User not found");
    }

    return next();
}
