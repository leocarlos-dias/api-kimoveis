import path from "path";
import { DataSourceOptions } from "typeorm";

export class OrmConfigurator {
    private MIGRATION_PATH: string = path.join(__dirname, './migrations/*.{ts,js}');
    private ENTITY_PATH: string = path.join(__dirname, "..", './entities/*.{ts,js}');

    getDeveloper(): DataSourceOptions {
        return {
            type: 'postgres',
            url: process.env.BD_URI_CONNECTION,
            synchronize: false,
            logging: false,
            entities: [this.ENTITY_PATH],
            migrations: [this.MIGRATION_PATH]
        }
    }

    getTest(): DataSourceOptions {
        return {
            type: 'sqlite',
            database: ':memory:',
            synchronize: true,
            logging: false,
            entities: [this.ENTITY_PATH],
        }
    }
}