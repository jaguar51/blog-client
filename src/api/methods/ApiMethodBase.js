import ApiRequest from "../ApiRequest";

export default class ApiMethodBase {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    getToken() {
        // @TODO потом нужна более сложная логика получения токена из хранилища какого нибудь
        return 'Bearer ' + '821992dc-e000-4041-bbdf-a4b8dbb89036';
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
