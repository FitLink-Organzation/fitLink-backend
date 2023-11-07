import { createTables, Database } from './database/utils/db'
import express, { Express } from "express";
import dotenv from "dotenv";
import Routing from "./routing/routing";
import bodyParser from "body-parser";

dotenv.config();

const port: number = Number(process.env.PORT) || 8000;
const app: Express = express();

(async () => {
    const database = Database.getInstance()
    await database.getPool().connect()
    createTables()
})()

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});