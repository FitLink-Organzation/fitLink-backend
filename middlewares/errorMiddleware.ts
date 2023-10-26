import { Request, Response, NextFunction } from 'express';

export class ErrorMiddleware {
    public run(error: Error, req: Request, res: Response, next: NextFunction): void {
        console.error(`Error occured: ${error.message}`);
        res.status(400).send({ message: error.message });
        next(error);
    }
}