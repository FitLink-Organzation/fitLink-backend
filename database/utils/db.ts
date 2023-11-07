import { Pool } from 'pg'
import { dbConfig } from '../../config/dbConfig'
import {Test} from "../models/test";

export class Database {
    private static instance: Database
    private pool: Pool

    private constructor() {
        this.pool = new Pool(dbConfig)
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }

    public getPool(): Pool {
        return this.pool
    }
}
export async function createTables() {
   await Test.createTable();
}

createTables()
