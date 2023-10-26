import JwtToken from "../models/jwtToken";
import User from "../models/user";
import LoginRequest from "../routing/requests/loginRequest";
import RegisterRequest from "../routing/requests/registerRequest";
import HashingService from "./hashingService";
import JwtTokenService from "./jwtTokenService";

export default class AuthService {
    private _jwtTokenService: JwtTokenService;
    private _hashingService: HashingService;

    constructor() {
        this._jwtTokenService = new JwtTokenService();
        this._hashingService = new HashingService();
    }

    public login(loginRequest: LoginRequest): JwtToken {
        let user = new User(loginRequest.userId, loginRequest.userPassword);
        let token = this._jwtTokenService.generateTokenForUser(user);
        console.debug(token);
        return token;
    }

    public async register(registerRequest: RegisterRequest): Promise<JwtToken> {
        let hashedPassword = await this._hashingService.hashPassword(registerRequest.userPassword);
        let user = new User(registerRequest.userId, hashedPassword);
        let token = this._jwtTokenService.generateTokenForUser(user);
        console.debug('User registered!');

        return token;
    }
}