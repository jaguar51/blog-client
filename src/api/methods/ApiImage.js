import ApiImageBase from "./ApiImageBase";

export default class ApiImage extends ApiImageBase {

    constructor(baseUrl) {
        super(baseUrl);
    }

    getMethodsGroup() {
        return 'images'
    }
}
