import express, { Express } from "express";
import dotenv from "dotenv";
import Routing from "./infrastructure/routing/routing";
import { AuthMiddleware } from "./infrastructure/middlewares/auth";
import bodyParser from "body-parser";

dotenv.config();

const port: number = Number(process.env.PORT) || 3000;
const app: Express = express();
const routing: Routing = new Routing();

//auth only in endpoints that need it
const auth: AuthMiddleware = new AuthMiddleware();

app.use(bodyParser.json());
app.use(routing.router);

//auth only in endpoints that need it
//app.use(auth.run);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});