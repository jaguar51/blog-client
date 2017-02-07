import Api from "./Api";

export default class TokenService {

    constructor() {
    }

    getToken() {
        return 'Bearer ' + localStorage.getItem('access_token');
    }

    isTokenExist() {
        return localStorage.getItem('access_token') !== null;
    }
}