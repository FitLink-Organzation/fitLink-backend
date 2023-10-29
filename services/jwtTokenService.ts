import { Secret, decode, verify, sign, SignOptions, VerifyOptions } from 'jsonwebtoken';
import dotenv from "dotenv";
import User from '../models/user';
import { JwtUserPayload } from '../models/jwtToken';

export default class JwtTokenService {
    private readonly _jwtSecretKey: string;
    private readonly _accessTokenLifetime: number;
    private readonly _refreshTokenLifetime: number;

    constructor() {
        dotenv.config();

        const jwtSecretKey: string | undefined = process.env.JWT_SECRET_KEY;
        const accessTokenLifetime: string | undefined = process.env.ACCESS_TOKEN_LIFETIME_DAYS;
        const refreshTokenLifetime: string | undefined = process.env.REFRESH_TOKEN_LIFETIME_DAYS;


        if (!jwtSecretKey || !accessTokenLifetime || !refreshTokenLifetime) {
            console.error('Wrong server configuration provided!')
            throw new Error('Wrong server configuration provided!');
        }

        this._jwtSecretKey = jwtSecretKey;
        this._accessTokenLifetime = Number(accessTokenLifetime);
        this._refreshTokenLifetime = Number(refreshTokenLifetime);
    }

    public generateAccessTokenForUser(user: User): string {
        const options: SignOptions = {
            expiresIn: this._accessTokenLifetime * 24 * 60 * 60
        }

        return sign({ user }, this._jwtSecretKey, options);
    }

    public generateRefreshTokenForUser(user: User): string {
        const options: SignOptions = {
            expiresIn: this._refreshTokenLifetime * 24 * 60 * 60
        }

        return sign({ user }, this._jwtSecretKey, options);
    }

    public validateToken(token: string): JwtUserPayload {
        const verifyOptions: VerifyOptions = {
            ignoreExpiration: true
        }

        try {
            return <JwtUserPayload>verify(token, this._jwtSecretKey, verifyOptions);
        } catch (error) {
            throw new Error('Invalid token!');
        }
    }
}