import { app } from "./app";
import { AppDataSource } from "./database/dataSource";

AppDataSource.initialize().then(() => {
    console.log("Database has new connection")
    app.listen(3333, () => console.log("Server is running on PORT 3333"));
});
