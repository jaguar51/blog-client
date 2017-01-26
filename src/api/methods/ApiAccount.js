import ApiCrudBase from "./ApiCrudBase";

/**
 * @author Yuriy Samsonov
 * @version 1.0
 * @date 26.01.2017
 */
export default class ApiAccount extends ApiCrudBase {

    constructor(baseUrl) {
        super(baseUrl);
    }

    list(query) {
        return this.prepareRequest('list', {
            method: 'GET',
            query: query,
        });
    }

    getMethodsGroup() {
        return 'accounts';
    }
}
