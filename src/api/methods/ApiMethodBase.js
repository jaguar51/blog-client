import ApiRequest from "../ApiRequest";
import TokenService from "../TokenService";

export default class ApiMethodBase {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    prepareRequest(methodName, params) {
        let tokenService = new TokenService;
        if (params.header == null) {
            params.header = {};
        }
        if (tokenService.isTokenExist()) {
            params.header['Authorization'] = tokenService.getToken();
            // params.header = {
            //     'Authorization': tokenService.getToken()
            // };
        }
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
