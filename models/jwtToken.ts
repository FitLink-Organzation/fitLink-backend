export default class JwtToken {

    constructor(private _accessToken: string) {

    }

    public get accessToken(): string {
        return this.accessToken;
    }
}