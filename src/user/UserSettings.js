import React from "react";
import {Link} from "react-router";
import ReactDOM from "react-dom";
import {Row, Col, Grid, Form, Button, FormGroup, FormControl, ControlLabel, Overlay, Popover} from 'react-bootstrap';
import {browserHistory} from "react-router";
import Api from "../api/Api";
import TokenService from "../api/TokenService";

export default class UserSettings extends React.Component {

    constructor(props) {
        super(props);
        this.api = Api.getDefault();
        this.tokenService = new TokenService();
        this.checkCurrentId();
        this.state = {
            author: null,
            password: "",
            repeatedPassword: "",
            show: false,
            message: "",
            target: this.refs.login,
        };
        this.api.account.getById(this.props.params.userId).execute({
            success: ((body) => {
                console.log('success');
                console.log(body);
                this.setState({
                    author: body.data.result,
                })
            }),
            error: ((body) => {
                console.error('error');
                console.error(body);
            })
        });

        this.getUserAvatar = this.getUserAvatar.bind(this);
        this.getLogin = this.getLogin.bind(this);
        this.getName = this.getName.bind(this);
        this.getSurname = this.getSurname.bind(this);
        this.getEmail = this.getEmail.bind(this);

        this.nameChange = this.nameChange.bind(this);
        this.loginChange = this.loginChange.bind(this);
        this.surnameChange = this.surnameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.repeatedPasswordChange = this.repeatedPasswordChange.bind(this);

        this.update = this.update.bind(this);
    }

    checkCurrentId() {
        this.tokenService.getId() !== this.props.params.userId ? browserHistory.push('/') : null;
    }

    getUserAvatar() {
        if (this.state.author !== null && this.state.author.avatar !== null) {
            return this.api.image.getUrl(this.state.author.avatar.originalPath);
        } else {
            return '/assets/img/default-avatars/avatar-01.png';
        }
    }

    getLogin() {
        if (this.state.author !== null) {
            return this.state.author.login;
        } else {
            return "";
        }
    }

    getName() {
        console.log(this.state.author);
        if (this.state.author !== null && this.state.author.name !== null) {
            return this.state.author.name;
        } else {
            return "";
        }
    }

    getSurname() {
        if (this.state.author !== null && this.state.author.surname !== null) {
            return this.state.author.surname;
        } else {
            return "";
        }
    }

    getEmail() {
        if (this.state.author !== null) {
            return this.state.author.email;
        } else {
            return "";
        }
    }

    loginChange(element) {
        let newAuthor = this.state.author;
        newAuthor.login = element.target.value;
        this.setState({
            author: newAuthor,
        });
    }

    nameChange(element) {
        let newAuthor = this.state.author;
        newAuthor.name = element.target.value;
        console.log(newAuthor);
        this.setState({
            author: newAuthor,
        });
    }

    surnameChange(element) {
        let newAuthor = this.state.author;
        newAuthor.surname = element.target.value;
        this.setState({
            author: newAuthor,
        });
    }

    passwordChange(element) {
        this.setState({
            password: element.target.value
        });
    }

    repeatedPasswordChange(element) {
        this.setState({
            repeatedPassword: element.target.value
        });
    }

    isLoginValid() {
        return this.state.author.login.length > 0 && this.state.author.login.length < 256;
    }

    isNameValid() {
        return this.state.author.name === null || this.state.author.name.length < 256;
    }

    isSurnameValid() {
        return this.state.author.surname === null || this.state.author.surname.length < 256;
    }

    isPasswordValid() {
        const length = this.state.password.length;
        return length > 3 && length < 256;
    }

    isPasswordsEquals() {
        return this.state.repeatedPassword === this.state.password;
    }

    validateForm() {
        if (!this.isLoginValid()) {
            return {
                show: true,
                message: "Введите логин",
                target: this.refs.login
            };
        }

        if (!this.isNameValid()) {
            return {
                show: true,
                message: "Имя должно быть до 255 символов",
                target: this.refs.name
            };
        }

        if (!this.isSurnameValid()) {
            return {
                show: true,
                message: "Фамилия должна быть до 255 символов",
                target: this.refs.surname
            };
        }

        // if (!this.isPasswordValid()) {
        //     return {
        //         show: true,
        //         message: "Пароль должен быть от 4 до 255 символов",
        //         target: this.refs.password
        //     }
        // }
        //
        // if (!this.isPasswordsEquals()) {
        //     return {
        //         show: true,
        //         message: "Пароли не совпадают",
        //         target: this.refs.repeatedPassword
        //     }
        // }

        return null;
    }

    update() {
        let validationRes = this.validateForm();
        if (validationRes) {
            this.setState(validationRes);
            console.log(this.state.target);
        }
        else {
            this.api.account.update(this.tokenService.getId(), this.state.author).execute({
                success: ((body) => {
                    console.log('success');
                    console.log(body);
                    browserHistory.push('/profile/' + this.tokenService.getId());
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
                    }
                })
            });
        }
    }

    render() {
        return (
            <div className="wrap">
                <Grid className="main">
                    <Row>
                        <Col lg={12} md={12} sm={12} xs={12}>
                            <div className="profile">
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <h3>Профиль</h3>
                                </Col>
                                <Col lg={4} md={4} sm={12} xs={12}>
                                    <img className="img-thumbnail profile-avatar"
                                         src={this.getUserAvatar()} alt=""/>
                                </Col>
                                <Col lg={8} md={8} sm={12} xs={12}>
                                    <div className="col-md-9 personal-info">
                                        <Form horizontal>
                                            <Row>
                                                <FormGroup>
                                                    <Col componentClass={ControlLabel} lg={4}>
                                                        Логин:
                                                    </Col>
                                                    <Col lg={8}>
                                                        <FormControl type="text" value={this.getLogin()}
                                                                     onChange={this.loginChange} ref="login"/>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Col componentClass={ControlLabel} lg={4}>
                                                        Имя:
                                                    </Col>
                                                    <Col lg={8}>
                                                        <FormControl type="text" value={this.getName()}
                                                                     onChange={this.nameChange} ref="name"/>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Col componentClass={ControlLabel} lg={4}>
                                                        Фамилия:
                                                    </Col>
                                                    <Col lg={8}>
                                                        <FormControl type="text" value={this.getSurname()}
                                                                     onChange={this.surnameChange} ref="surname"/>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Col componentClass={ControlLabel} lg={4}>
                                                        Email:
                                                    </Col>
                                                    <Col lg={8}>
                                                        <FormControl type="email" disabled value={this.getEmail()}/>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Col componentClass={ControlLabel} lg={4}>
                                                        Новый пароль:
                                                    </Col>
                                                    <Col lg={8}>
                                                        <FormControl type="password" onChange={this.passwordChange}
                                                                     ref="password"/>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Col componentClass={ControlLabel} lg={4}>
                                                        Повторите пароль:
                                                    </Col>
                                                    <Col lg={8}>
                                                        <FormControl type="password"
                                                                     onChange={this.repeatedPasswordChange}
                                                                     ref="repeatedPassword"/>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Col componentClass={ControlLabel} md={9}/>
                                                    <Col md={3}>
                                                        <Button className="settings-btn custom-button"
                                                                onClick={this.update}>
                                                            Сохранить
                                                        </Button>
                                                    </Col>
                                                </FormGroup>
                                            </Row>
                                        </Form>
                                    </div>

                                    <Overlay
                                        show={this.state.show}
                                        onHide={() => this.setState({show: false})}
                                        placement="top"
                                        container={this}
                                        target={() => ReactDOM.findDOMNode(this.state.target)}
                                    >
                                        <Popover id="popover-positioned-scrolling-top">
                                            {this.state.message}
                                        </Popover>
                                    </Overlay>
                                </Col>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
