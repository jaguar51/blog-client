import React from "react";

const ArticleCreation = React.createClass({
    render: function () {
        return (
            <div className="wrap">
                <div className="container main">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="profile">
                                <h3>Создание статьи</h3>
                                <div className="form-group">
                                    <label htmlFor="header">Заголовок</label>
                                    <input type="text" className="form-control" id="header"
                                           placeholder="Введите заголовок"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="text">Текст</label>
                                    <textarea className="form-control" name="text" id="text"
                                              placeholder="Введите текст"/>
                                </div>
                                <div className="form-group tags-form">
                                    <label htmlFor="tag">Теги</label>
                                    <ul className="tags" id="tag">
                                        <li className="tagAdd">
                                            <input type="text"/>
                                        </li>
                                    </ul>
                                </div>
                                <button type="submit" className="btn btn-default custom-button">Отправить</button>
                                <button type="submit" className="btn btn-default custom-changes-btn">Сохранить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default ArticleCreation;