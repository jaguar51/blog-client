import ApiBase from "./ApiBase";
import request from "superagent";

export default class ApiArticleImage extends ApiBase {

    constructor(baseUrl) {
        super(baseUrl);
    }

    uploadFile(file) {
        request
            .post(this.constructPath('file'))
            .send(file)
            .set('Authorization', this.getToken())
            .end(function (error, result) {
                if (error || !result.ok) {
                    // здесь тебе нужно свой каллбэк вызывать
                    console.log(result.body)
                } else {
                    // и тут тоже
                    console.log(result.body);
                    // self.result = result.body; это работатть не будет поскольку код выполняется асинхронно
                }
            });
    }

    getMethodsGroup() {
        return 'images'
    }
}
