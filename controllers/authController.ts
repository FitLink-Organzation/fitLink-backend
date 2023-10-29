import express, { Router, Request, Response } from "express";
import AuthService from "../services/authService";
import LoginRequest from "../routing/requests/loginRequest";
import RegisterRequest from "../routing/requests/registerRequest";
import RefreshRequest from "../routing/requests/refreshRequest";
import { JwtToken } from "../models/jwtToken";

export default class AuthController {
    private _authService: AuthService;

    constructor() {
        this._authService = new AuthService();
    }

    public async login(req: Request, res: Response): Promise<void> {
        let loginRequest = new LoginRequest(req.body?.userId, req.body?.userPassword);
        let token: JwtToken = await this._authService.login(loginRequest);
        res.status(200).send(token);
    }

    public async register(req: Request, res: Response): Promise<void> {
        let registerRequest = new RegisterRequest(req.body?.userId, req.body?.userPassword, req.body?.repeatedUserPassword);
        let token = await this._authService.register(registerRequest);
        res.status(200).send(token);
    }

    public async refresh(req: Request, res: Response): Promise<void> {
        const refreshRequest = new RefreshRequest(req.body);
        let token = await this._authService.refresh(refreshRequest);
        res.status(200).send(token);
    }
}