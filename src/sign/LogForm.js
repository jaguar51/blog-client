import React, {PropTypes} from "react";
import ReactDOM from "react-dom";
import {Button, FormGroup, ControlLabel, FormControl, Checkbox, Overlay, Popover} from "react-bootstrap";
import Api from "../api/Api";

class LogForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            remember: false,
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

        this.api = Api.getDefault();

        this.render = this.render.bind(this);

        this.changeFormClick = this.changeFormClick.bind(this);

        this.signUpLoginChange = this.signUpLoginChange.bind(this);
        this.signUpPasswordChange = this.signUpPasswordChange.bind(this);
        this.signUpRepeatedPasswordChange = this.signUpRepeatedPasswordChange.bind(this);
        this.signUpEmailChange = this.signUpEmailChange.bind(this);
        this.rememberChange = this.rememberChange.bind(this);

        this.signUp = this.signUp.bind(this);
        this.login = this.login.bind(this);

        this.isLoginValid = this.isLoginValid.bind(this);
        this.isEmailValid = this.isEmailValid.bind(this);
        this.isPasswordsEquals = this.isPasswordsEquals.bind(this);
        this.isPasswordValid = this.isPasswordValid.bind(this);
    }

    changeFormClick() {
        this.setState((prevState) => {
            return {
                showLogin: !prevState.showLogin,
                showSignUp: !prevState.showSignUp
            }
        })
    }

    signUpLoginChange(element) {
        this.setState({
            login: element.target.value
        });
    }

    signUpPasswordChange(element) {
        this.setState({
            password: element.target.value
        });
    }

    signUpRepeatedPasswordChange(element) {
        this.setState({
            repeatedPassword: element.target.value
        });
    }

    signUpEmailChange(element) {
        this.setState({
            email: element.target.value
        });
    }

    rememberChange() {
        this.setState({
            remember: !this.state.remember
        });
    }

    isLoginValid() {
        return this.state.login.length > 0
    }

    isEmailValid() {
        const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegExp.test(this.state.email);
    }

    isPasswordValid() {
        const length = this.state.password.length;
        return length > 3 && length < 256;
    }

    isPasswordsEquals() {
        return this.state.repeatedPassword === this.state.password;
    }

    validateSignUpForm() {
        if (!this.isLoginValid()) {
            return {
                show: true,
                message: "Введите логин",
                target: this.refs.login
            }
        }

        if (!this.isPasswordValid()) {
            return {
                show: true,
                message: "Пароль должен быть от 4 до 255 символов",
                target: this.refs.password
            }
        }

        if (!this.isPasswordsEquals()) {
            return {
                show: true,
                message: "Пароли не совпадают",
                target: this.refs.repeatedPassword
            }
        }

        if (!this.isEmailValid()) {
            return {
                show: true,
                message: "Неверный email",
                target: this.refs.email
            };
        }

        return null;
    }

    validateLoginForm() {
        if (!this.isLoginValid()) {
            return {
                show: true,
                message: "Введите логин",
                target: this.refs.login
            }
        }

        if (!this.isPasswordValid()) {
            return {
                show: true,
                message: "Пароль должен быть от 4 до 255 символов",
                target: this.refs.password
            }
        }

        return null;
    }

    signUp() {
        let validationRes = this.validateSignUpForm();
        if (validationRes) {
            this.setState(validationRes);
        } else {
            let data = {
                "email": this.state.email,
                "login": this.state.login,
                "password": this.state.password
            };
            this.api.account.create(data).execute({
                success: ((body) => {
                    console.log('success');
                    console.log(body);
                    this.props.onClose();
                }),
                error: ((body) => {
                    console.log('error');
                    console.log(body);
                    if (/login/.test(body.message)) {
                        this.setState({
                            show: true,
                            message: "Данный логин уже используется.",
                            target: this.refs.login
                        })
                    } else if (/mail/.test(body.message)) {
                        this.setState({
                            show: true,
                            message: "Данная почта уже используется.",
                            target: this.refs.email
                        })
                    }
                })
            });
        }
    }

    login() {
        let validationRes = this.validateLoginForm();
        if (validationRes) {
            this.setState(validationRes);
        } else {
            let data = {
                "username": this.state.login,
                "password": this.state.password,
                "scope": "read write",
                "grant_type": "password"
            };
            this.api.oauth.authorization(data).execute({
                success: ((body) => {
                    console.log('success');
                    console.log(body);
                    localStorage.setItem('refresh_token', body.refresh_token);
                    localStorage.setItem('access_token', body.access_token);
                    localStorage.setItem('account_id', body.account_id);
                    this.props.login();
                    this.props.onClose();
                }),
                error: ((body) => {
                    console.log('error');
                    console.log(body);
                    if (/login/.test(body.message)) {
                        this.setState({
                            show: true,
                            message: "Неверный логин или пароль.",
                            target: this.refs.login
                        })
                    }
                })
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
                        <input checked={this.state.showLogin} onChange={this.changeFormClick} id="tab-1" type="radio"
                               name="tab" className="login"/>
                        <label htmlFor="tab-1" className="tab">Вход</label>

                        <input checked={this.state.showSignUp} onChange={this.changeFormClick} id="tab-2" type="radio"
                               name="tab" className="sign-up"/>
                        <label htmlFor="tab-2" className="tab">Регистрация</label>

                        <div className="login-form" id="login-form">
                            <div className="sign-in-htm">
                                <form>
                                    <FormGroup controlId="LoginFormLogin">
                                        <ControlLabel>Имя пользователя</ControlLabel>
                                        <FormControl className="text-login" type="text"
                                                     onChange={this.signUpLoginChange} ref="login"/>
                                    </FormGroup>
                                    <FormGroup controlId="LoginFormPassword">
                                        <ControlLabel>Пароль</ControlLabel>
                                        <FormControl className="text-login" type="password"
                                                     onChange={this.signUpPasswordChange} ref="password"/>
                                    </FormGroup>
                                    <Checkbox inline onChange={this.rememberChange}>
                                        Запомнить меня
                                    </Checkbox>
                                    <Button className="custom-button" block bsStyle="primary"
                                            bsSize="large" onClick={this.login}>
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
                                                     onChange={this.signUpLoginChange} ref="login"/>
                                    </FormGroup>
                                    <FormGroup controlId="signUpFormPassword">
                                        <ControlLabel>Пароль</ControlLabel>
                                        <FormControl className="text-login" type="password"
                                                     onChange={this.signUpPasswordChange} ref="password"/>
                                        <FormControl.Feedback />
                                    </FormGroup>
                                    <FormGroup controlId="signUpFormRepeatedPassword">
                                        <ControlLabel>Повторите пароль</ControlLabel>
                                        <FormControl className="text-login" type="password"
                                                     onChange={this.signUpRepeatedPasswordChange}
                                                     ref="repeatedPassword"/>
                                        <FormControl.Feedback />
                                    </FormGroup>
                                    <FormGroup controlId="signUpFormEmail">
                                        <ControlLabel>E-mail</ControlLabel>
                                        <FormControl className="text-login" type="email"
                                                     onChange={this.signUpEmailChange} ref="email"/>
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
