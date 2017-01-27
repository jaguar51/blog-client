import ApiImageBase from "./ApiImageBase";


/**
 * @author Yuriy Samsonov
 * @version 1.0
 * @date 26.01.2017
 */
export default class ApiAvatar extends ApiImageBase {

    constructor(baseUrl) {
        super(baseUrl);
    }

    getMethodsGroup() {
        return 'avatars';
    }
}
