import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

export default class HashingService {
    private _saltRounds: number;

    constructor() {
        dotenv.config();

        let saltRounds = process.env.SALT_ROUNDS;

        if (!saltRounds) {
            throw new Error('Wrong server configuration provided!');
        }

        this._saltRounds = Number(saltRounds);
    }

    public async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, this._saltRounds);
    }

    public async verifyPasswordHash(userProvidedPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(userProvidedPassword, hashedPassword);
    }
}