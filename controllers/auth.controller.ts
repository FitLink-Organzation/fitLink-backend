import {Request, Response} from "express";

export default class AuthController {
    private readonly ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

    handleLogin = async (req: Request, res: Response) => {
        res.send("Login").status(200);
    }
    handleRegister = async (req: Request, res: Response) => {
        res.send("Register").status(201);
    }
    handleRefreshToken = async (req: Request, res: Response) => {
        res.send("Refresh").status(200);
    }
}