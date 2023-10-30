export default class LoginRequest {
    private _email: string;
    private _userPassword: string;

    constructor(email: string, userPassword: string) {
        this.email = email;
        this.userPassword = userPassword;
    }

    public get email(): string {
        return this._email;
    }

    public get userPassword(): string {
        return this._userPassword;
    }

    private set email(email: string) {
        if (email == null) {
            throw new Error('User id not provided!');
        }
        this._email = email;
    }

    private set userPassword(userPassword: string) {
        if (userPassword === undefined || userPassword === null || userPassword === '') {
            throw new Error('User password not provided!');
        }
        if (userPassword.length < 8) {
            throw new Error('User password must have at least 8 characters!');
        }
        this._userPassword = userPassword;
    }
}