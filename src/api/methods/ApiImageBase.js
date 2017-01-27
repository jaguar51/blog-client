import ApiMethodBase from "./ApiMethodBase";

export default class ApiImageBase extends ApiMethodBase {

    constructor(baseUrl) {
        super(baseUrl);
    }

    getUrl(path) {
        return this.constructPath('file/' + path);
    }


    getById(id) {
        return this.prepareRequest(id, {
            method: 'GET'
        });
    }

    upload(file) {
        let data = new FormData();
        data.append("image", file);
        return this.prepareRequest('', {
            method: 'POST',
            body: data
        });
    }

    remove(id) {
        return this.prepareRequest(id, {
            method: 'DELETE'
        });
    }
}