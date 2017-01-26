import ApiArticleImage from "./methods/ApiArticleImage";

export default class Api {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;

        this.articleImage = new ApiArticleImage(baseUrl);
        // аналогичным образом сюда добавляй другие группы методов
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
