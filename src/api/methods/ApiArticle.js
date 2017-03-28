import BlockController from "./BlockController";

/**
 * @author Yuriy Samsonov
 * @version 1.0
 * @date 26.01.2017
 */
export default class ApiArticle extends BlockController {

    constructor(baseUrl) {
        super(baseUrl);
    }

    search(params) {
        return this.prepareRequest('search', {
            method: 'GET',
            query: params
        });
    }

    getMethodsGroup() {
        return 'articles';
    }
}
