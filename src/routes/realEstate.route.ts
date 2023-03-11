
import { Router } from "express";
import { CreateRealEstateController } from "../controllers/realEstate/CreateRealEstate.controller";
import { GetRealEstateController } from "../controllers/realEstate/GetRealEstate.controller";
import { ensureAuthenticationMiddleware } from "../middlewares/ensureAuthentication.middleware";
import { ensureCheckSchemaMiddleware } from "../middlewares/ensureCheckSchema.middleware";
import { createRealEstateSchema } from "../schemas/realEstate.schemas";


export const realEstateRoute: Router = Router();

realEstateRoute.post("/realEstate", ensureCheckSchemaMiddleware(createRealEstateSchema), ensureAuthenticationMiddleware("administrator"), new CreateRealEstateController().handle);
realEstateRoute.get("/realEstate", new GetRealEstateController().handle);
