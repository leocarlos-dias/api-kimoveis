import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { ZodError } from "zod";
import { CustomError } from "../errors/CustomError";

export function errorHandler(error: Error, request: Request, response: Response, next: NextFunction) {

    switch (true) {
        case error instanceof CustomError:
            return error instanceof CustomError && response.status(error.statusCode).json({ message: error.message });

        case error instanceof ZodError:
            return error instanceof ZodError && response.status(400).json({ message: error.flatten().fieldErrors });

        case error instanceof JsonWebTokenError:
            return response.status(401).json({ message: error.message });

        default:
            return response.status(500).json({ message: "Internal server error" });
    }
}