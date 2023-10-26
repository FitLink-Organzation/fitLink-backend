export default class LoginRequest {
    private _userName: string;
    private _userPassword: string;

    constructor(userId: string, userPassword: string) {
        this.userName = userId;
        this.userPassword = userPassword;
    }

    public get userName(): string {
        return this._userName;
    }

    public get userPassword(): string {
        return this._userPassword;
    }

    private set userName(userId: string) {
        if (userId === undefined || userId === null || userId === '') {
            throw new Error('User id not provided!');
        }
        this._userName = userId;
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