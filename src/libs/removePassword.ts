import { IUser, IUserWithoutPassword } from "../interfaces/user.interfaces";

export function removePassword(user: IUser): IUserWithoutPassword {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}