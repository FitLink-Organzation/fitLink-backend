export default class LoginRequest {
    private _userId: string;
    private _userPassword: string;

    constructor(userId: string, userPassword: string) {
        this.userId = userId;
        this.userPassword = userPassword;
    }

    public get userId(): string {
        return this._userId;
    }

    public get userPassword(): string {
        return this._userPassword;
    }

    private set userId(userId: string) {
        if (userId === undefined || userId === null || userId === '') {
            throw new Error('User id not provided!');
        }
        this._userId = userId;
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