import { verify } from "jsonwebtoken";
import { CustomError } from "../errors/CustomError";
import { IDecodedToken } from "../interfaces/user.interfaces";

export function verifyToken(receivedToken: string): IDecodedToken {
    const [, token] = receivedToken.split(" ");

    const decoddedToken: IDecodedToken = verify(token, String(process.env.SECRET_KEY)) as IDecodedToken;

    if (!decoddedToken.sub) {
        throw new CustomError(403, "Invalid token");
    }

    return decoddedToken
}