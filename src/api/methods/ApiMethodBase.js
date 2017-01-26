export default class ApiMethodBase {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    getToken() {
        // потом нужна более сложная логика получения токена из хранилища какого нибудь
        return 'e2d39a99-c99f-4982-bef7-a908d41c8430';
    }

    constructPath(methodName) {
        return this.baseUrl + '/api/' + this.getMethodsGroup() + '/' + methodName;
    }

    getMethodsGroup() {
        throw new Error('You have to implement the method getMethodsGroup!');
    }
}
