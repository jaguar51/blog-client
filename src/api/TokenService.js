import Api from "./Api";

export default class TokenService {

    constructor() {
        this.api = new Api.getDefault();
        this.getToken = this.getToken.bind(this);
    }

    getBearerToken() {
        return 'Bearer ' + this.getToken();
    }

    getToken() {
        return localStorage.getItem('access_token');
    }

    getId() {
        return localStorage.getItem('account_id');
    }

    refreshToken(callback) {
        let data = {
            "refresh_token": localStorage.getItem('refresh_token'),
            "grant_type": "refresh_token"
        };
        this.api.oauth.authorization(data).execute({
            success: ((body) => {
                console.log('success');
                console.log(body);
                localStorage.setItem('refresh_token', body.refresh_token);
                localStorage.setItem('access_token', body.access_token);
                localStorage.setItem('account_id', body.account_id);
                callback.auth();
            }),
            error: ((body) => {
                console.log('error');
                console.log(body);
                callback.notAuth();
            })
        });
    }

    quit() {
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('access_token');
        localStorage.removeItem('account_id');
    }

    isTokenExist() {
        return localStorage.getItem('access_token') !== null;
    }
}