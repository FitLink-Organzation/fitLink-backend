import express, { Request, Response} from "express";
import JwtToken from "../../../models/jwtToken";
import AuthService from "../../services/authService";

export const authRoute = express.Router();
const authService = new AuthService();

authRoute.post('/login', (req: Request, res: Response) => {

    if(!req.body) {
        console.debug('Request body not provided!');
        res.status(400).send({ message: 'Bad request' });
        return;
    }

    if ('userId' in req.body === false || 'userPassword' in req.body === false) {
        console.debug("User id or user password not provided!");
        res.status(400).send({ message: 'Bad request' });
        return;
    }

    let tokens: JwtToken = authService.login(req.body.userId, req.body.userPassword);
    res.status(200).send(tokens);
});