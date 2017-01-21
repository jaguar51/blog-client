import React from "react";
import ArticlePrev from "./article-prev";

const UserProfile = React.createClass({
    render: function () {
        return (
            <div className="wrap">
                <div className="container main">
                    <div className="row">
                        <aside className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                            <div className="profile">
                                <img className="profile-avatar" src="app/assets/img/default-avatars/avatar-01.png"
                                     alt=""/>
                                <div>
                                    <h2 className="login">Joe Smith</h2>
                                    <span>Имя: Joe</span><br/>
                                    <span>Фамилия: Smith</span>
                                </div>
                                <form action="/article-creation">
                                    <button type="button" className="btn btn-primary btn-sm btn-block custom-button">
                                        Создать статью
                                    </button>
                                </form>
                                <div className="btn-group-vertical custom-btn-group">
                                    <button type="button" className="btn btn-primary btn-sm btn-block custom-button">Все
                                        статьи
                                    </button>
                                    <button type="button" className="btn btn-primary btn-sm btn-block custom-button">
                                        Черновики
                                    </button>
                                </div>
                                <form action="/settings">
                                    <button type="submit"
                                            className="btn btn-primary btn-sm btn-block custom-changes-btn">Настройки
                                    </button>
                                </form>
                            </div>
                        </aside>

                        <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                            <ArticlePrev />

                            <ArticlePrev />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default UserProfile;