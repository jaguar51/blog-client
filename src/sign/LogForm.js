import React, {PropTypes} from "react";
import ReactDOM from "react-dom";
import {Button, FormGroup, ControlLabel, FormControl, Checkbox, HelpBlock, Overlay, Popover} from 'react-bootstrap';
import Api from "../api/Api";

class LogForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            target: this.refs.email,
            message: '',
            login: '',
            password: '',
            email: '',
            repeatedPassword: '',
            showLogin: props.checked == 'login',
            showSignUp: props.checked == 'signup'
        };
        this.render = this.render.bind(this);
        this.logInClick = this.logInClick.bind(this);
        this.signUpClick = this.signUpClick.bind(this);
        this.signUpLogin = this.signUpLogin.bind(this);
        this.signUpPassword = this.signUpPassword.bind(this);
        this.signUpRepeatedPassword = this.signUpRepeatedPassword.bind(this);
        this.signUpEmail = this.signUpEmail.bind(this);
        this.signUp = this.signUp.bind(this);
        this.isInputEmpty = this.isInputEmpty.bind(this);
        this.isPasswordsEquals = this.isPasswordsEquals.bind(this);
        this.isEmailCorrect = this.isEmailCorrect.bind(this);
        this.isPasswordLength = this.isPasswordLength.bind(this);
    }

    logInClick() {
        this.setState({
            showLogin: true,
            showSignUp: false
        });
    }

    signUpClick() {
        this.setState({
            showLogin: false,
            showSignUp: true
        });
    }

    signUpLogin(element) {
        this.setState({
            login: element.target.value
        });
    }

    signUpPassword(element) {
        this.setState({
            password: element.target.value
        });
    }

    signUpRepeatedPassword(element) {
        this.setState({
            repeatedPassword: element.target.value
        });
    }

    signUpEmail(element) {
        this.setState({
            email: element.target.value
        });
    }

    isPasswordsEquals() {
        if (this.state.repeatedPassword !== this.state.password) {
            this.setState({
                show: true,
                message: "Пароли не совпадают.",
                target: this.refs.repeatedPassword
            });
        }
    }

    isEmailCorrect() {
        const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegExp.test(this.state.email)) {
            this.setState({
                show: true,
                message: "Неверный email.",
                target: this.refs.email
            });
        }
    }

    isInputEmpty() {
        const length = this.state.password.length;
        const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (this.state.login === '') {
            this.setState({
                show: true,
                message: "Введите логин.",
                target: this.refs.login
            });
        } else if (this.state.password === '') {
            this.setState({
                show: true,
                message: "Введите пароль.",
                target: this.refs.password
            });
        } else if (this.state.repeatedPassword === '') {
            this.setState({
                show: true,
                message: "Повторите пароль.",
                target: this.refs.repeatedPassword
            });
        } else if (this.state.email === '') {
            this.setState({
                show: true,
                message: "Введите email.",
                target: this.refs.email
            });
        } else if (length < 4 || length > 255) {
            this.setState({
                show: true,
                message: "Пароль должен быть от 4 до 255 символов.",
                target: this.refs.password
            });
        } else if (!emailRegExp.test(this.state.email)) {
            this.setState({
                show: true,
                message: "Неверный email.",
                target: this.refs.email
            });
        } else if (this.state.repeatedPassword !== this.state.password) {
            this.setState({
                show: true,
                message: "Пароли не совпадают.",
                target: this.refs.repeatedPassword
            });
        } else {
            this.setState({
                show: false
            });
            return true;
        }
        return false;
    }

    isPasswordLength() {
        const length = this.state.password.length;
        if (length < 4 || length > 255) {
            this.setState({
                show: true,
                message: "Пароль должен быть от 4 до 255 символов.",
                target: this.refs.password
            });
        }
    }

    signUp() {
        let api = Api.getDefault();
        this.isInputEmpty();
        if (this.isInputEmpty()) {
            let data = {
                "email": this.state.email,
                "login": this.state.login,
                "password": this.state.password
            };
            api.account.create(data).execute({
                success: function (body) {
                    console.log('success');
                    console.log(body);
                },
                error: function (body) {
                    console.log('error');
                    console.log(body);
                }
            });
        }
    }

    render() {

        return (
            <div className="popup" id="login-dialog">
                <div className="login-wrap">
                    <div className="login-html">
                        <Button type="button" className="custom-close" bsClass="close" onClick={this.props.onClose}>
                            ×
                        </Button>
                        <input checked={this.state.showLogin} onChange={this.logInClick} id="tab-1" type="radio"
                               name="tab" className="login"/>
                        <label htmlFor="tab-1" className="tab">Вход</label>

                        <input checked={this.state.showSignUp} onChange={this.signUpClick} id="tab-2" type="radio"
                               name="tab" className="sign-up"/>
                        <label htmlFor="tab-2" className="tab">Регистрация</label>

                        <div className="login-form" id="login-form">
                            <div className="sign-in-htm">
                                <form>
                                    <FormGroup controlId="LoginFormLogin">
                                        <ControlLabel>Имя пользователя</ControlLabel>
                                        <FormControl className="text-login" type="text"
                                                     onChange={this.signUpLogin} required/>
                                    </FormGroup>
                                    <FormGroup controlId="LoginFormPassword">
                                        <ControlLabel>Пароль</ControlLabel>
                                        <FormControl className="text-login" type="password"
                                                     onChange={this.signUpPassword} required/>
                                    </FormGroup>
                                    <Checkbox inline>
                                        Запомнить меня
                                    </Checkbox>
                                    <Button type="submit" className="custom-button" block bsStyle="primary"
                                            bsSize="large">
                                        Войти
                                    </Button>
                                </form>
                                <div className="hr"/>
                                <div className="foot-link">
                                    <a href="#">Забыли пароль?</a>
                                </div>
                            </div>

                            <div className="sign-up-htm">
                                <form>
                                    <FormGroup controlId="signUpFormLogin">
                                        <ControlLabel>Имя пользователя</ControlLabel>
                                        <FormControl className="text-login" type="text"
                                                     onChange={this.signUpLogin} ref="login"/>
                                    </FormGroup>
                                    <FormGroup controlId="signUpFormPassword">
                                        <ControlLabel>Пароль</ControlLabel>
                                        <FormControl className="text-login" type="password"
                                                     onChange={this.signUpPassword} ref="password"/>
                                        <FormControl.Feedback />
                                        <HelpBlock>Динна пароля от 4 до 255 символов</HelpBlock>
                                    </FormGroup>
                                    <FormGroup controlId="signUpFormRepeatedPassword">
                                        <ControlLabel>Повторите пароль</ControlLabel>
                                        <FormControl className="text-login" type="password"
                                                     onChange={this.signUpRepeatedPassword}
                                                     ref="repeatedPassword"/>
                                        <FormControl.Feedback />
                                    </FormGroup>
                                    <FormGroup controlId="signUpFormEmail">
                                        <ControlLabel>E-mail</ControlLabel>
                                        <FormControl className="text-login" type="email"
                                                     onChange={this.signUpEmail} ref="email"/>
                                    </FormGroup>

                                    <Button className="custom-button" block bsStyle="primary"
                                            bsSize="large" onClick={this.signUp}>
                                        Зарегистрироваться
                                    </Button>
                                </form>
                                <Overlay
                                    show={this.state.show}
                                    onHide={() => this.setState({show: false})}
                                    placement="right"
                                    container={this}
                                    target={() => ReactDOM.findDOMNode(this.state.target)}
                                >
                                    <Popover id="popover-positioned-scrolling-top">
                                        {this.state.message}
                                    </Popover>
                                </Overlay>
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
