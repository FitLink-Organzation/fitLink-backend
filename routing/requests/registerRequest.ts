export default class RegisterRequest {
    private _userId: string;
    private _userPassword: string;
    private _repeatedUserPassword: string;

    constructor(userId: string, userPassword: string, repeatedUserPassword: string) {
        this.userId = userId;
        this.userPassword = userPassword;
        this.repeatedUserPassword = repeatedUserPassword;
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

    private set repeatedUserPassword(repeatedUserPassword: string) {
        if (repeatedUserPassword === undefined || repeatedUserPassword === null || repeatedUserPassword === '') {
            throw new Error('Repeated user password not provided!');
        }
        if (repeatedUserPassword !== this._userPassword) {
            throw new Error('Repeated user password does not match!');
        }
        this._repeatedUserPassword = repeatedUserPassword;
    }
}