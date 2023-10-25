import { NextFunction, Router } from "express";
import { authRoute } from "./localRoutes/auth.route";

export default class Routing {
    private _router: Router;

    constructor() {
        this._router = Router({mergeParams: true});
        this.createRoutes();
    }

    public get router(): Router {
        return this._router;
    }

    private createRoutes(): void {
        this._router.use('/auth', authRoute);
    }
}