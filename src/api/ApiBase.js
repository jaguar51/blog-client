export default class ApiBase {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.token = 'e2d39a99-c99f-4982-bef7-a908d41c8430';
    }

    static getDefault() {
        return new ApiBase('http://localhost:8080')
    }

    makeRequest(params) {
        if (NODE_ENV == 'development') {
            debugger;
        }
        console.log(params);
        console.log(this.baseUrl)
    }
}
