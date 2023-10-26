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
        let user: IUserDocument | null = await this._userRepository.getByUserName(loginRequest.userName);

        if (!user) {
            throw new Error('User not found!');
        }
        
        let token = this._jwtTokenService.generateTokenForUser(new User(user?.userName, user?.passwordHash, user?.lastName, user?.firstName));
        return token;
    }

    public async register(registerRequest: RegisterRequest): Promise<JwtToken> {
        let hashedPassword = await this._hashingService.hashPassword(registerRequest.userPassword);
        let user = new User(registerRequest.userId, hashedPassword, 'Jon', 'Does');
        let token = this._jwtTokenService.generateTokenForUser(user);

        await this._userRepository.createUser(user);
        console.debug('User registered!');

        return token;
    }
}