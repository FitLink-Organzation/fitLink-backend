import dotenv from 'dotenv';
import mongoose from 'mongoose';

export default class Database {
    private _connectionString: string;

    constructor() {
        dotenv.config();

        let connectionString = process.env.CONNECTION_STRING;

        if (!connectionString) {
            throw new Error('Wrong server configuration provided!');
        }

        this._connectionString = connectionString;
    }

    public async connectToDatabase(): Promise<void> {
        await mongoose.connect(this._connectionString);

        console.debug('Connected to database!');
    }
}