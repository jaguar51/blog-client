import React, {PropTypes} from "react";
import {Button, FormGroup, ControlLabel, FormControl, Checkbox, HelpBlock} from 'react-bootstrap';
import Api from "../api/Api";

class LogForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
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
            return "error";
        } else {
            return null;
        }
    }

    isPasswordLength() {
        const length = this.state.password.length;
        if (length > 3 && length < 256) {
            return 'success';
        } else if (length === 0) {
            return null;
        } else {
            return 'error';
        }
    }

    signUp() {
        this.setState({
            show: !this.state.show
        });
        // let email = $("#email-sign-up-form");
        // let login = $("#login-sign-up-form");
        // let password = $("#password-sign-up-form");
        // let passwordRepeated = $("#password-repeat-sign-up-form");
        // let api = Api.getDefault();
        //
        // if (this.isEmpty(email) && this.isEmpty(login) && this.isEmpty(password)) {
        //     if (this.checkRepeatedPassword(password, passwordRepeated) && this.checkEmail(email) && this.checkPassword(password)) {
        //         let data = {
        //             "email": email.val(),
        //             "login": login.val(),
        //             "password": password.val()
        //         };
        //         api.account.create(data).execute({
        //             success: function (body) {
        //                 console.log('success');
        //                 console.log(body);
        //             },
        //             error: function (body) {
        //                 console.log('error');
        //                 console.log(body);
        //             }
        //         });
        //     }
        // }
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
                                    <Button type="submit" className="custom-button" block bsStyle="primary" bsSize="large">
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
                                                     onChange={this.signUpLogin} required/>
                                    </FormGroup>
                                    <FormGroup controlId="signUpFormPassword" validationState={this.isPasswordLength()}>
                                        <ControlLabel>Пароль</ControlLabel>
                                        <FormControl className="text-login" type="password"
                                                     onChange={this.signUpPassword} required/>
                                        <FormControl.Feedback />
                                        <HelpBlock>Динна пароля от 4 до 255 символов</HelpBlock>
                                    </FormGroup>
                                    <FormGroup controlId="signUpFormRepeatedPassword"
                                               validationState={this.isPasswordsEquals()}>
                                        <ControlLabel>Повторите пароль</ControlLabel>
                                        <FormControl className="text-login" type="password"
                                                     onChange={this.signUpRepeatedPassword} required
                                                     value={this.state.repeatedPassword}/>
                                        <FormControl.Feedback />
                                    </FormGroup>
                                    <FormGroup controlId="signUpFormEmail">
                                        <ControlLabel>E-mail</ControlLabel>
                                        <FormControl className="text-login" type="email"
                                                     onChange={this.signUpEmail} required/>
                                    </FormGroup>

                                    <Button type="submit" className="custom-button" block bsStyle="primary"
                                            bsSize="large">
                                        Зарегистрироваться
                                    </Button>
                                </form>
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
