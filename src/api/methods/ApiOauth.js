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
            method: 'GET',
            query: params
        });
    }

    constructPath() {
        return this.baseUrl + '/oauth/token';
    }
}
