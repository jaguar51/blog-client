import ApiAccount from "./methods/ApiAccount";
import ApiArticle from "./methods/ApiArticle";
import ApiArticleImage from "./methods/ApiArticleImage";
import ApiAvatar from "./methods/ApiAvatar";
import ApiComment from "./methods/ApiComment";
import ApiTag from "./methods/ApiTag";

export default class Api {

    constructor(baseUrl) {
        this.account = new ApiAccount(baseUrl);
        this.article = new ApiArticle(baseUrl);
        this.articleImage = new ApiArticleImage(baseUrl);
        this.avatar = new ApiAvatar(baseUrl);
        this.comment = new ApiComment(baseUrl);
        this.tag = new ApiTag(baseUrl);
    }

    static getDefault() {
        return new Api('http://localhost:8080')
    }

    get token() {
        // надо решить где лучше работать с токеном,
        // получать токен наверное лучше через еще один доп класс
        // а в апи добавить еще один метод для получения класса для работы с токеном
        return 'e2d39a99-c99f-4982-bef7-a908d41c8430';
    }
}
