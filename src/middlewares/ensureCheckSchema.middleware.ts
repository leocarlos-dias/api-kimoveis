import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import { ISchema } from "../interfaces/user.interfaces";


export function ensureCheckSchemaMiddleware(schema: ZodTypeAny) {

    return function (request: Request, response: Response, next: NextFunction) {
        const currentPayload: ISchema = request.body;

        const payloadValidated = schema.parse(currentPayload);

        request.body = payloadValidated;
        return next();
    }
}