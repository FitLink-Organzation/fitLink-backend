import dotenv from 'dotenv';
import { Request, Response, NextFunction } from "express";
import AuthToken from '../models/authToken';
import JwtTokenService from '../services/jwtTokenService';

dotenv.config();

export class AuthMiddleware {
    private _jwtTokenService: JwtTokenService;

    constructor() {
        this._jwtTokenService = new JwtTokenService();
    }

    public run(req: Request, res: Response, next: NextFunction): void {
        const token: string = req.headers.authorization?.replace('Bearer ', '') || '';

        if (!token) {
            res.status(401).send({ message: 'No token provided' });
            return;
        }

        let decoded = this._jwtTokenService.validateToken(token);
    }
}