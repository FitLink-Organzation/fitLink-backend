import { Router } from "express";
import AuthController from "./controllers/authController";

export default class Routing {
    private _router: Router;
    private _authController: AuthController;

    constructor() {
        this._router = Router({mergeParams: true});
        this._authController = new AuthController();
        this.createRoutes();
    }

    public get router(): Router {
        return this._router;
    }

    private createRoutes(): void {
        this._router.use('/auth', this._authController.createRoutes());
    }
}