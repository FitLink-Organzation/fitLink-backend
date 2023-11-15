import express from 'express'
import AuthController from "../../controllers/auth.controller";

export const authRoute = express()
const authController = new AuthController()

authRoute.post('/login', authController.handleLogin);
authRoute.post('/register', authController.handleRegister);
authRoute.post('/refreshToken', authController.handleRefreshToken);

