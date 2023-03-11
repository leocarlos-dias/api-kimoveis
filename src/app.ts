import express, { Application, json } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { categoriesRoute } from "./routes/categories.route";
import { realEstateRoute } from "./routes/realEstate.route";
import { schedulesRoute } from "./routes/schedules.route";
import { sessionsRoute } from "./routes/sessions.route";
import { usersRoute } from "./routes/users.route";
import swaggerDocs from "./swagger.json";

export const app: Application = express();

app.use(json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(usersRoute, sessionsRoute, realEstateRoute, categoriesRoute, schedulesRoute);
app.use(errorHandler)