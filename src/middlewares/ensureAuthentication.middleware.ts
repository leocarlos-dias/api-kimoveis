import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/CustomError";
import { IDecodedToken } from "../interfaces/user.interfaces";
import { verifyToken } from "../libs/verifyToken";


export function ensureAuthenticationMiddleware(permission?: string) {
    return async function (request: Request, response: Response, next: NextFunction) {
        const receivedToken: string | undefined = request.headers.authorization;
        const id = Number(request.params.id);

        if (!receivedToken) {
            throw new CustomError(401, "Missing bearer token");
        }

        const { admin, sub }: IDecodedToken = verifyToken(receivedToken);

        if (permission === "administrator" && !admin) {
            throw new CustomError(403, "Insufficient permission");
        }

        if (!admin) {
            const isMethodNotAllowed = ['PATCH', 'DELETE'].includes(request.method) && id !== Number(sub);
            const isPermissionInsufficient = isMethodNotAllowed || permission;

            if (isPermissionInsufficient) {
                if (id !== Number(sub)) {
                    throw new CustomError(403, "Insufficient permission");
                }
            }
        }

        return next();
    }
}