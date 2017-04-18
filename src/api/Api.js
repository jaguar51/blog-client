import ApiAccount from "./methods/ApiAccount";
import ApiArticle from "./methods/ApiArticle";
import ApiImage from "./methods/ApiImage";
import ApiAvatar from "./methods/ApiAvatar";
import ApiOauth from "./methods/ApiOauth";
import ApiComment from "./methods/ApiComment";
import ApiTag from "./methods/ApiTag";

export default class Api {

    constructor(baseUrl) {
        this.account = new ApiAccount(baseUrl);
        this.article = new ApiArticle(baseUrl);
        this.oauth = new ApiOauth(baseUrl);
        this.avatar = new ApiAvatar(baseUrl);
        this.comment = new ApiComment(baseUrl);
        this.image = new ApiImage(baseUrl);
        this.tag = new ApiTag(baseUrl);
    }

    static getDefault() {
        return new Api('http://localhost:8080')
    }

    get token() {
        // надо решить где лучше работать с токеном,
        // получать токен наверное лучше через еще один доп класс
        // а в апи добавить еще один метод для получения класса для работы с токеном
        return '81f09ac6-0988-43db-b74c-b48bfe70b667';
    }
}
