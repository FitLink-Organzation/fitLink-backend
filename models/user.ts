export default class User {
    constructor(public email: string, public passwordHash: string, public lastName: string, public firstName: string) {

    }

    public accessToken: string = '';
    public refreshToken: string = '';
    public status: string;
    public activationDate: Date;
}