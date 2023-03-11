import { Router } from "express";
import { CreateScheduleController } from "../controllers/schedules/CreateSchedule.controller";
import { GetSchedulesController } from "../controllers/schedules/GetSchedules.controller";
import { ensureAuthenticationMiddleware } from "../middlewares/ensureAuthentication.middleware";
import { ensureCheckSchemaMiddleware } from "../middlewares/ensureCheckSchema.middleware";
import { createScheduleSchema } from "../schemas/schedule.schemas";

export const schedulesRoute: Router = Router();

schedulesRoute.post("/schedules", ensureAuthenticationMiddleware(), ensureCheckSchemaMiddleware(createScheduleSchema), new CreateScheduleController().handle);
schedulesRoute.get("/schedules/realEstate/:id", ensureAuthenticationMiddleware("administrator"), new GetSchedulesController().handle);

