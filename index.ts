import { ErrorMiddleware } from './middlewares/errorMiddleware';
import express, { Express } from "express";
import dotenv from "dotenv";
import Routing from "./routing/routing";
import bodyParser from "body-parser";

dotenv.config();

const port: number = Number(process.env.PORT) || 3000;
const app: Express = express();
const routing: Routing = new Routing();
const errorMiddleware = new ErrorMiddleware();

app.use(bodyParser.json());
app.use(routing.router);
app.use(errorMiddleware.run);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});