import Api from "./Api";

export default class TokenService {

    constructor() {
        this.api = new Api.getDefault();
    }

    getToken() {
        return 'Bearer ' + localStorage.getItem('access_token');
    }

    refreshToken(callback) {
        if (this.isTokenExist()) {
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
                    callback.login();
                }),
                error: ((body) => {
                    console.log('error');
                    console.log(body);
                })
            });
        }
    }

    isTokenExist() {
        return localStorage.getItem('access_token') !== null;
    }
}