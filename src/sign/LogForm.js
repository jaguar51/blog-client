import React, {PropTypes} from "react";
import Api from "../api/Api";

class LogForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: props.checked == 'login',
            showSignUp: props.checked == 'signup'
        };
        this.render = this.render.bind(this);
        this.logInClick = this.logInClick.bind(this);
        this.singUpClick = this.singUpClick.bind(this);
    }

    logInClick() {
        this.setState({
            showLogin: true,
            showSignUp: false
        });
    }

    singUpClick() {
        this.setState({
            showLogin: false,
            showSignUp: true
        });
    }



    render() {
        return (
            <div className="popup" id="login-dialog">
                <div className="login-wrap">
                    <div className="login-html">
                        <button type="button" className="close custom-close" onClick={this.props.onClose}>×</button>

                        <input checked={this.state.showLogin} onChange={this.logInClick} id="tab-1" type="radio"
                               name="tab" className="login"/>
                        <label htmlFor="tab-1" className="tab">Вход</label>

                        <input checked={this.state.showSignUp} onChange={this.singUpClick} id="tab-2" type="radio"
                               name="tab" className="sign-up"/>
                        <label htmlFor="tab-2" className="tab">Регистрация</label>

                        <div className="login-form" id="login-form">
                            <div className="sign-in-htm">
                                <div className="group">
                                    <label htmlFor="login-login-form">Имя пользователя</label>
                                    <input id="login-login-form" className="text-login" type="text"/>

                                    <label htmlFor="password-login-form">Пароль</label>
                                    <input id="password-login-form" className="text-login" type="password"
                                           data-type="password"/>

                                    <input id="remember-login-form" type="checkbox"/>
                                    <label htmlFor="remember-login-form">Запомнить меня</label>

                                    <button type="button" className="btn btn-primary btn-lg btn-block custom-button">
                                        Войти
                                    </button>
                                </div>
                                <div className="hr"/>
                                <div className="foot-link">
                                    <a href="#">Забыли пароль?</a>
                                </div>
                            </div>

                            <div className="sign-up-htm">
                                <div className="group">
                                    <label htmlFor="login-sign-up-form">Имя пользователя</label>
                                    <input id="login-sign-up-form" className="text-login" type="text"
                                           data-type="password" data-toggle="popover" data-trigger="manual"
                                           data-content="Введите логин."/>

                                    <label htmlFor="password-sign-up-form">Пароль</label>
                                    <input id="password-sign-up-form" className="text-login" type="password"
                                           data-type="password" data-toggle="popover" data-trigger="manual"
                                           data-content="Введите пароль. Минимум 4 символа."/>

                                    <label htmlFor="password-repeat-sign-up-form">Повторите пароль</label>
                                    <input id="password-repeat-sign-up-form" className="text-login" type="password"
                                           data-type="password" data-toggle="popover" data-trigger="manual"
                                           data-content="Неверное подтверждение пароля"/>

                                    <label htmlFor="email-sign-up-form">E-mail</label>
                                    <input id="email-sign-up-form" className="text-login" type="email"
                                           data-type="password" data-toggle="popover" data-trigger="manual"
                                           data-content="Введите e-mail."/>

                                    <button type="button" className="btn btn-primary btn-lg btn-block custom-button">Зарегистрироваться
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

LogForm.propTypes = {
    onClose: PropTypes.func.isRequired,
    checked: PropTypes.string.isRequired
};

export default LogForm;
