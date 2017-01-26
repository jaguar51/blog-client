import request from "superagent";

/**
 * @author Yuriy Samsonov
 * @version 1.0
 * @date 26.01.2017
 */

export default class ApiRequest {

    constructor(path, parameters) {
        this.path = path;
        this.parameters = parameters;
    }

    execute(callback) {
        this.start()
            .end(
                function (error, result) {
                    if (error || !result.ok) {
                        callback.error(result.body);
                    } else {
                        callback.success(result.body);
                    }
                }
            );
    }

    executeWithSimpleCallback(callback) {
        start()
            .end(callback);
    }

    start() {
        return request(this.parameters.method, this.path)
            .query(this.parameters.query)
            .send(this.parameters.body)
            .set(this.parameters.header);
    }
}
