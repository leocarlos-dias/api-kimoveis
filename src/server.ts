import { app } from "./app";
import { AppDataSource } from "./database/dataSource";

AppDataSource.initialize().then(() => {
    console.log("Database has new connection")
    app.listen(process.env.PORT, () => console.log("Server is running on PORT " + process.env.PORT));
});
