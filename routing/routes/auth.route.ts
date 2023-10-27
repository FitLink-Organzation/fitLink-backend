import express, { NextFunction, Request, Response, Router } from "express";
import AuthController from "../../controllers/authController";

export default function authRoute(): Router {
    let authRouter = express.Router();
    let authController = new AuthController();

    authRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
        await authController.login(req, res).catch((err => next(err)));
    });
    authRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
        await authController.register(req, res).catch((err => next(err)));
    });

    return authRouter;
}