import ApiBase from "./ApiBase";
import request from "superagent";

export default class ApiArticleImages {

    constructor() {
        this.imagesUrl = ApiBase.getDefault().baseUrl + '/api/images';
        this.imagesFileUrl = this.imagesUrl + '/file';
    }

    uploadFile(file) {
        let self = this;
        request
            .post(this.imagesUrl)
            .send(file)
            .set('Authorization', ApiBase.token)
            .end(function(error, result){
                if (error || !result.ok) {
                    console.log(result.body)
                } else {
                    console.log(result.body);
                    self.result = result.body;
                }
            });
    }

}