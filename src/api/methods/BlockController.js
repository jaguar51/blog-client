import ApiCrudBase from "./ApiCrudBase";

export default class BlockController extends ApiCrudBase {

    constructor(baseUrl) {
        super(baseUrl);
    }

    block(entity) {
        return this.prepareRequest('block/', {
            method: 'POST',
            body: entity
        });
    }

    unlock(entity) {
        return this.prepareRequest('unlock/', {
            method: 'POST',
            body: entity
        });
    }
}
