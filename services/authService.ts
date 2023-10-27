import { IUserDocument } from "../database/schemas/userSchema";
import JwtToken from "../models/jwtToken";
import User from "../models/user";
import UserRepository from "../repositories/userRepository";
import LoginRequest from "../routing/requests/loginRequest";
import RegisterRequest from "../routing/requests/registerRequest";
import HashingService from "./hashingService";
import JwtTokenService from "./jwtTokenService";

export default class AuthService {
    private _jwtTokenService: JwtTokenService;
    private _hashingService: HashingService;
    private _userRepository: UserRepository;

    constructor() {
        this._jwtTokenService = new JwtTokenService();
        this._hashingService = new HashingService();
        this._userRepository = new UserRepository();
    }

    public async login(loginRequest: LoginRequest): Promise<JwtToken> {
        let dbUser: IUserDocument | null = await this._userRepository.getByUserName(loginRequest.userName);
        console.debug(dbUser);

        if (!dbUser) {
            throw new Error('User not found!');
        }
        if (!await this._hashingService.verifyPasswordHash(loginRequest.userPassword, dbUser.passwordHash)) {
            throw new Error('Wrong password!');
        }
        
        let user = new User(dbUser?.userName, dbUser?.passwordHash, dbUser?.lastName, dbUser?.firstName);
        let token = this._jwtTokenService.generateTokenForUser(user);

        user.accessToken = token.accessToken;
        await this._userRepository.updateUser(user);
        return token;
    }

    public async register(registerRequest: RegisterRequest): Promise<JwtToken> {
        let hashedPassword = await this._hashingService.hashPassword(registerRequest.userPassword);
        let user = new User(registerRequest.userId, hashedPassword, 'Jon', 'Does');
        let token = this._jwtTokenService.generateTokenForUser(user);

        user.accessToken = token.accessToken;
        await this._userRepository.createUser(user);
        console.debug('User registered!');

        return token;
    }
}