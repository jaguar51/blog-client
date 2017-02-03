import ApiRequest from "../ApiRequest";

export default class ApiMethodBase {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    getToken() {
        if (localStorage.getItem('access_token')) {
            return 'Bearer ' + localStorage.getItem('access_token');
        } else {
            return btoa('web_app:secret_key');
        }
        // @TODO потом нужна более сложная логика получения токена из хранилища какого нибудь
        // return 'Bearer ' + '81f09ac6-0988-43db-b74c-b48bfe70b667';
    }

    prepareRequest(methodName, params) {
        params.header = {
            'Authorization': this.getToken()
        };
        return new ApiRequest(
            this.constructPath(methodName),
            params
        );

        // можно делать так без доп объекта, может будет лучше,
        // поскольку мы не будем плодить доп оюъекты
        //
        // return request(params.method, this.constructPath(params.methodName))
        //     .query(params.query)
        //     .send(params.body)
        //     .set('Authorization', this.getToken());
    }

    constructPath(methodName) {
        return this.baseUrl + '/api/' + this.getMethodsGroup() + '/' + methodName;
    }

    getMethodsGroup() {
        throw new Error('You have to implement the method getMethodsGroup!');
    }
}
