export default class Api {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    static getDefault() {
        return new Api('http://localhost:8080')
    }

    makeRequest(params) {
        if (NODE_ENV == 'development') {
            debugger;
        }
        console.log(params);
        console.log(this.baseUrl)
    }
}
