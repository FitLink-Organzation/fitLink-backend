import JwtToken from "../models/jwtToken";
import LoginRequest from "../routing/requests/loginRequest";
import RegisterRequest from "../routing/requests/registerRequest";

export default class AuthService {
    public login(loginRequest: LoginRequest): JwtToken {
        return new JwtToken('access_token', 'refresh_token');
    }

    public register(registerRequest: RegisterRequest): JwtToken {
        console.debug('User registered!');
        return new JwtToken('access_token', 'refresh_token');
    }
}