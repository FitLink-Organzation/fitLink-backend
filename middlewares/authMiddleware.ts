import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from "express";
import AuthToken from '../models/authToken';

dotenv.config();

export class AuthMiddleware {

    public run(req: Request, res: Response, next: NextFunction): void {
        const token: string = req.headers.authorization || '';

        if (!token) {
            res.status(401).send({ message: 'No token provided' });
            return;
        }

        jwt.verify(token, process.env.JWT_SECRET || '', (err, decoded) => {
            if (err) {
                res.status(401).send({ message: 'Unauthorized' });
                return;
            }

            if (!decoded) {
                res.status(400).send({ message: 'Bad request' });
            }

            if (typeof decoded === 'string') {
                let decodedJson = JSON.parse(decoded);

                if (this.validateToken(decodedJson) === true) {
                    let decodedAuthToken = decodedJson as AuthToken;
                    req.body.userId = decodedAuthToken.userId
                } else {
                    res.status(401).send({ message: 'Unauthorized' });
                    return;
                }

            } else if (typeof decoded === 'object') {
                if (this.validateToken(decoded) === true) {
                    let decodedAuthToken = decoded as AuthToken;
                    req.body.userId = decodedAuthToken.userId
                } else {
                    res.status(401).send({ message: 'Unauthorized' });
                    return;
                }
            }

            next();
        });
    }

    private validateToken(token: any): token is AuthToken {
        if ('userId' in token === true || typeof token.userId !== 'string') {
            return true;
        }

        return false;
    }
}