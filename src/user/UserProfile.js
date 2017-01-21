import React from "react";
import {browserHistory} from "react-router";
import ArticlePreview from "../article/ArticlePreview";

export default class UserProfile extends React.Component {

    constructor(props) {
        super(props);
    }

    createArticleClick() {
        browserHistory.push('/article-creation');
    }

    settingsClick() {
        browserHistory.push('/settings');
    }

    render() {
        return (
            <div className="wrap">
                <div className="container main">
                    <div className="row">
                        <aside className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                            <div className="profile">
                                <img className="profile-avatar"
                                     src={require('../../assets/img/default-avatars/avatar-01.png')} alt=""/>
                                <div>
                                    <h2 className="login">Joe Smith</h2>
                                    <span>Имя: Joe</span><br/>
                                    <span>Фамилия: Smith</span>
                                </div>

                                <button type="button"
                                        className="btn btn-primary btn-sm btn-block custom-button custom-btn-group"
                                        onClick={this.createArticleClick}>
                                    Создать статью
                                </button>


                                <div className="btn-group-vertical custom-btn-group">
                                    <button type="button" className="btn btn-primary btn-sm btn-block custom-button">Все
                                        статьи
                                    </button>
                                    <button type="button" className="btn btn-primary btn-sm btn-block custom-button">
                                        Черновики
                                    </button>
                                </div>

                                <button type="submit"
                                        className="btn btn-primary btn-sm btn-block custom-changes-btn"
                                        onClick={this.settingsClick}>Настройки
                                </button>

                            </div>
                        </aside>

                        <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                            <ArticlePreview />

                            <ArticlePreview />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};