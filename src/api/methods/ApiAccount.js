import BlockController from "./BlockController";

/**
 * @author Yuriy Samsonov
 * @version 1.0
 * @date 26.01.2017
 */
export default class ApiAccount extends BlockController {

    constructor(baseUrl) {
        super(baseUrl);
    }

    getMethodsGroup() {
        return 'accounts';
    }
}
