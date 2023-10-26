import { Secret, decode, verify, sign, SignOptions } from 'jsonwebtoken';
import JwtToken from "../models/jwtToken";
import dotenv from "dotenv";
import User from '../models/user';

export default class JwtTokenService {
    private _jwtSecretKey: string;
    private _tokenLifetime: number;

    constructor() {
        dotenv.config();

        let jwtSecretKey: string | undefined = process.env.JWT_SECRET_KEY;
        let tokenLifetime: string | undefined = process.env.TOKEN_LIFETIME_DAYS;

        if (!jwtSecretKey || !tokenLifetime) {
            console.error('Wrong server configuration provided!')
            throw new Error('Wrong server configuration provided!');
        }

        this._jwtSecretKey = jwtSecretKey;
        this._tokenLifetime = Number(tokenLifetime);
    }

    public generateTokenForUser(user: User): JwtToken {
        let options: SignOptions = {
            expiresIn: this._tokenLifetime
        }

        const token = sign({user}, this._jwtSecretKey, options);
        return new JwtToken(token);
    }

    public validateToken(token: string): string {
        return verify(token, this._jwtSecretKey) as string;
    }
}