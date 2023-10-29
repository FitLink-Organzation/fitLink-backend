export default class User {
    constructor(public userName: string, public passwordHash: string, public lastName: string, public firstName: string) {

    }

    public accessToken: string = '';
    public refreshToken: string = '';
}