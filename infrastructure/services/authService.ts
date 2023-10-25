import JwtToken from "../../models/jwtToken";

export default class AuthService {
    public login(userId: string, userPassword: string): JwtToken {
        return new JwtToken('access_token', 'refresh_token');
    }
}