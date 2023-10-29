import dotenv from 'dotenv';
import { Request, Response, NextFunction } from "express";
import JwtTokenService from '../services/jwtTokenService';
import { JwtUserPayload } from '../models/jwtToken';

dotenv.config();

export class AuthMiddleware {
    public run(req: Request, res: Response, next: NextFunction): void {
        const jwtTokenService = new JwtTokenService();
        const token: string = req.headers.authorization?.replace('Bearer ', '') || '';

        if (!token) {
            res.status(401).send({ message: 'No token provided' });
            return;
        }

        try {
            const decoded: JwtUserPayload = jwtTokenService.validateToken(token);
            res.status(200).send(decoded);
            next();
        } catch(error) {
            next(error)
        }
    }
}