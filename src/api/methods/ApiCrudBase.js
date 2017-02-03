import ApiMethodBase from "./ApiMethodBase";

/**
 * @author Yuriy Samsonov
 * @version 1.0
 * @date 26.01.2017
 */
export default class ApiCrudBase extends ApiMethodBase {

    constructor(baseUrl) {
        super(baseUrl);
    }

    list(params) {
        return this.prepareRequest('list', {
            method: 'GET',
            query: params
        });
    }

    getById(id) {
        return this.prepareRequest(id, {
            method: 'GET'
        });
    }

    create(entity) {
        return this.prepareRequest('', {
            method: 'POST',
            body: entity
        });
    }

    update(entity) {
        return this.prepareRequest('', {
            method: 'PUT',
            body: entity
        });
    }

    remove(id) {
        return this.prepareRequest(id, {
            method: 'DELETE'
        });
    }
}
