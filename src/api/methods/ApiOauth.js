import ApiRequest from "../ApiRequest";

export default class ApiOauth {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    prepareRequest(params) {
        let headerKey = btoa('web_app:secret_key');
        params.header = {
            'Authorization': 'Basic ' + headerKey
        };
        return new ApiRequest(
            this.constructPath(),
            params
        );
    }

    authorization(params) {
        return this.prepareRequest({
            method: 'POST',
            query: params
        });
    }

    quit() {
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('access_token');
        localStorage.removeItem('account_id');
    }

    constructPath() {
        return this.baseUrl + '/oauth/token';
    }
}
