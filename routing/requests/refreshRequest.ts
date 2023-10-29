export default class RefreshRequest {
    private _refreshToken: string;

    constructor(requestBody: any) {
        if (!requestBody) {
            throw new Error('Request body not provided!');
        }

        this.refreshToken = requestBody.refreshToken;
    }

    public get refreshToken(): string {
        return this._refreshToken;
    }

    private set refreshToken(refreshToken: string | null | undefined) {
        if (refreshToken === undefined || refreshToken === null || refreshToken === '') {
            throw new Error('Refresh token not valid!');
        }

        this._refreshToken = refreshToken;
    }
}