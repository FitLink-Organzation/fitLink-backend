import { Router } from "express";
import authRoute from "./routes/auth.route";
import trainingRoute from "./routes/training.route";

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
        this._router.get('/', (req, res) => {
            res.status(200).json('Hello world!');
        })
        this._router.use('/auth', authRoute());
        this._router.use('/training', trainingRoute());
    }
}