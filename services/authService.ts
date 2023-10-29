import { JwtPayload } from 'jsonwebtoken';
import { IUserDocument } from "../database/schemas/userSchema";
import { JwtToken, JwtUserPayload } from "../models/jwtToken";
import User from "../models/user";
import UserRepository from "../repositories/userRepository";
import LoginRequest from "../routing/requests/loginRequest";
import RefreshRequest from "../routing/requests/refreshRequest";
import RegisterRequest from "../routing/requests/registerRequest";
import HashingService from "./hashingService";
import JwtTokenService from "./jwtTokenService";

export default class AuthService {
    private readonly _jwtTokenService: JwtTokenService;
    private readonly _hashingService: HashingService;
    private readonly _userRepository: UserRepository;

    constructor() {
        this._jwtTokenService = new JwtTokenService();
        this._hashingService = new HashingService();
        this._userRepository = new UserRepository();
    }

    public async login(loginRequest: LoginRequest): Promise<JwtToken> {
        const dbUser: IUserDocument | null = await this._userRepository.getByUserName(loginRequest.userName);
        console.debug(dbUser);

        if (!dbUser) {
            throw new Error('User not found!');
        }
        if (!await this._hashingService.verifyPasswordHash(loginRequest.userPassword, dbUser.passwordHash)) {
            throw new Error('Wrong password!');
        }
        
        const user = new User(dbUser?.userName, dbUser?.passwordHash, dbUser?.lastName, dbUser?.firstName);
        const accessToken: string = this._jwtTokenService.generateAccessTokenForUser(user);
        const refreshToken: string = this._jwtTokenService.generateRefreshTokenForUser(user);
        const token: JwtToken = new JwtToken(accessToken, refreshToken);

        user.accessToken = token.accessToken;
        user.refreshToken = token.refreshToken;
        await this._userRepository.updateUser(user);

        return token;
    }

    public async register(registerRequest: RegisterRequest): Promise<JwtToken> {
        const hashedPassword = await this._hashingService.hashPassword(registerRequest.userPassword);
        const user = new User(registerRequest.userId, hashedPassword, 'Jon', 'Does');
        const accessToken: string = this._jwtTokenService.generateAccessTokenForUser(user);
        const refreshToken: string = this._jwtTokenService.generateRefreshTokenForUser(user);
        const token: JwtToken = new JwtToken(accessToken, refreshToken);

        user.accessToken = token.accessToken;
        user.refreshToken = token.refreshToken;
        await this._userRepository.createUser(user);
        console.debug('User registered!');

        return token;
    }

    public async refresh(refreshRequest: RefreshRequest): Promise<JwtToken> {
        const jwtPayload: JwtUserPayload = this._jwtTokenService.validateToken(refreshRequest.refreshToken);

        if (!jwtPayload) {
            throw new Error('Invalid refresh token!');
        }

        const dbUser: IUserDocument | null = await this._userRepository.getByUserName(jwtPayload.user.userName);

        if (!dbUser) {
            throw new Error('User not found!');
        }

        if (dbUser.accessToken) {
            const jwtPayload: JwtUserPayload = this._jwtTokenService.validateToken(dbUser.accessToken);
            const expiration = jwtPayload.exp * 1000;
            const now = Date.now();

            if (expiration > now) {
                throw new Error('Access token is still valid!');
            }
        }

        if (dbUser.refreshToken !== refreshRequest.refreshToken) {
            throw new Error('Invalid refresh token!');
        }

        const user = new User(dbUser.userName, dbUser?.passwordHash, dbUser?.lastName, dbUser?.firstName);
        const accessToken: string = this._jwtTokenService.generateAccessTokenForUser(user);
        const refreshToken: string = this._jwtTokenService.generateRefreshTokenForUser(user);
        const token: JwtToken = new JwtToken(accessToken, refreshToken);

        user.accessToken = token.accessToken;
        user.refreshToken = token.refreshToken;
        await this._userRepository.updateUser(user);

        return token;
    }
}