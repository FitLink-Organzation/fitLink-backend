import express, { Router, Request, Response } from "express";
import AuthService from "../../services/authService";
import JwtToken from "../../models/jwtToken";
import LoginRequest from "../requests/loginRequest";
import RegisterRequest from "../requests/registerRequest";

export default class AuthController {
    private _authRouter: Router;
    private _authService: AuthService;

    constructor() {
        this._authRouter = express.Router();
        this._authService = new AuthService();
    }

    public createRoutes(): Router {
        this._authRouter.post('/login', (req: Request, res: Response) => {
            this.login(req, res);
        });
        this._authRouter.post('/register', (req: Request, res: Response) => {
            this.register(req, res);
        });

        return this._authRouter;
    }

    private login(req: Request, res: Response): void {
        let loginRequest = new LoginRequest(req.body?.userId, req.body?.userPassword);
        let token: JwtToken = this._authService.login(loginRequest);
        res.status(200).send(token);
    }

    private register(req: Request, res: Response): void {
        let registerRequest = new RegisterRequest(req.body?.userId, req.body?.userPassword, req.body?.repeatedUserPassword);
        let token = this._authService.register(registerRequest);
        res.status(200).send(token);
    }
}