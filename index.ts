import { createTables, Database } from './database/utils/db'
import express, {Express, NextFunction} from "express";
import cookieParser from 'cookie-parser'

import dotenv from "dotenv";
import {authRoute} from "./routing/routes/auth.route";

dotenv.config();

const port: number = Number(process.env.PORT) || 8000;
const app: Express = express();
//Init DB
(async () => {
    const database = Database.getInstance()
    await database.getPool().connect()
    await createTables()
})()

app.use(express.json());
app.use(cookieParser());

app.use("/authenticate", authRoute);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});