import { JwtPayload } from 'jsonwebtoken';
import User from './user';

export class JwtToken {

    constructor(private _accessToken: string, private _refreshToken: string) {

    }

    public get accessToken(): string {
        return this._accessToken;
    }

    public get refreshToken(): string {
        return this._refreshToken;
    }
}

export class JwtUserPayload implements JwtPayload {
    public user: User;
    public exp: number;
    public iat: number;
}