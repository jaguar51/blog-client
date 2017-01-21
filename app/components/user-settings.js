import React from "react";
import {Link} from "react-router";

const UserSettings = React.createClass({
    render: function () {
        return (
            <div className="wrap">
                <div className="container main">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="profile">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <h3>Профиль</h3>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                    <img className="img-thumbnail profile-avatar"
                                         src="app/assets/img/default-avatars/avatar-01.png" alt=""/>
                                </div>
                                <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                    <div className="col-md-9 personal-info">
                                        <form className="form-horizontal" role="form">
                                            <div className="row">
                                                <div className="form-group">
                                                    <label htmlFor="login"
                                                           className="col-lg-4 control-label">Логин:</label>
                                                    <div className="col-lg-8">
                                                        <input id="login" className="form-control" type="text"/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="first-name"
                                                           className="col-lg-4 control-label">Имя:</label>
                                                    <div className="col-lg-8">
                                                        <input id="first-name" className="form-control" type="text"/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="last-name" className="col-lg-4 control-label">Фамилия:</label>
                                                    <div className="col-lg-8">
                                                        <input id="last-name" className="form-control" type="text"/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="email"
                                                           className="col-lg-4 control-label">Email:</label>
                                                    <div className="col-lg-8">
                                                        <input id="email" className="form-control" type="email"
                                                               disabled/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="password" className="col-lg-4 control-label">Новый
                                                        пароль:</label>
                                                    <div className="col-lg-8">
                                                        <input id="password" className="form-control" type="password"/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="password-repeat" className="col-lg-4 control-label">Повторите
                                                        пароль:</label>
                                                    <div className="col-lg-8">
                                                        <input id="password-repeat" className="form-control"
                                                               type="password"/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-9 control-label"/>
                                                    <div className="col-md-3">
                                                        <input type="submit"
                                                               className="btn btn-primary settings-btn custom-button"
                                                               value="Сохранить"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default UserSettings;