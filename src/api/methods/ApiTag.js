import ApiCrudBase from "./ApiCrudBase";

/**
 * @author Yuriy Samsonov
 * @version 1.0
 * @date 26.01.2017
 */
export default class ApiTag extends ApiCrudBase {

    constructor(baseUrl) {
        super(baseUrl);
    }

    getMethodsGroup() {
        return 'tags';
    }
}
