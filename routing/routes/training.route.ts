import { AuthMiddleware } from './../../middlewares/authMiddleware';
import { Router } from "express";

export default function trainingRoute(): Router {
    const trainingRouter = Router({mergeParams: true});
    const authMiddleware = new AuthMiddleware();

    trainingRouter.use(authMiddleware.run);

    trainingRouter.post('/authTest', async (req, res, next) => {
        res.status(200).send('validationTest');
    });

    return trainingRouter;
}