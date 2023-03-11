import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { OrmConfigurator } from "./OrmConfigurator";

process.env.NODE_ENV ??= "development";

const ormConfigurator = new OrmConfigurator();

const dataSourceOptions = process.env.NODE_ENV === "development"
    ? ormConfigurator.getDeveloper()
    : ormConfigurator.getTest();

export const AppDataSource = new DataSource(dataSourceOptions);