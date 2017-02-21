import React from "react";
import {Link} from "react-router";
import {Nav, Navbar, NavItem, FormGroup, InputGroup, FormControl, Button, Glyphicon, Row, Col} from 'react-bootstrap';
import LogForm from "../sign/LogForm";
import LoginNav from "../sign/LoginNav";
import UserMenu from "../user/UserMenu";
import TokenService from "../api/TokenService";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-summernote/dist/react-summernote.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../../assets/css/styles.css";
import Api from "../api/Api";

export default class MainLayout extends React.Component {

    constructor(props) {
        super(props);
        this.api = Api.getDefault();
        this.tokenService = new TokenService();
        this.state = {
            auth: "loading",
            showSign: false,
            checked: 'login'
        };
        if (this.tokenService.isTokenExist()) {
            this.tokenService.refreshToken({
                auth: (() => {
                    this.setState({
                        auth: "auth",
                    });
                }),
                notAuth: (() => {
                    this.setState({
                        auth: "not auth",
                    });
                })
            });
        } else {
            this.state.auth = "not auth";
        }
        this.logInButtonClick = this.logInButtonClick.bind(this);
        this.signUpButtonClick = this.signUpButtonClick.bind(this);
        this.hideSignWindow = this.hideSignWindow.bind(this);
        this.quit = this.quit.bind(this);
        this.login = this.login.bind(this);
    }

    logInButtonClick() {
        this.setState({
            showSign: true,
            checked: 'login'
        });
    }

    signUpButtonClick() {
        this.setState({
            showSign: true,
            checked: 'signup'
        });
    }

    hideSignWindow() {
        this.setState({showSign: false});
    }

    quit() {
        this.tokenService.quit();
        this.setState({
            auth: "not auth"
        })
    }

    login() {
        this.setState({
            auth: "auth"
        })
    }

    getMain() {
        if (this.state.auth === "loading") {
            return null;
        } else {
            return this.props.children;
        }
    }

    getUserMenu() {
        if (this.state.auth === "loading") {
            return null;
        } else if (this.state.auth === "not auth") {
            return <LoginNav login={this.logInButtonClick} signup={this.signUpButtonClick}/>;
        } else {
            return <UserMenu quit={this.quit}/>;
        }
    }

    render() {
        console.log(this.state.auth);
        return (
            <div className="app">
                <Navbar className="navbar-style custom-navbar" fixedTop>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/" className="logo">Blog</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle className="custom-button"/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Navbar.Form pullLeft>
                            <FormGroup>
                                <InputGroup>
                                    <FormControl type="text" className="search" placeholder="Найти"/>
                                    <InputGroup.Button>
                                        <Button className="custom-button search-btn">
                                            <Glyphicon glyph="search"/>
                                        </Button>
                                    </InputGroup.Button>
                                </InputGroup>
                            </FormGroup>
                        </Navbar.Form>
                        <Nav className="right-profile">
                            {this.getUserMenu()}
                            {/*{this.state.auth ? <UserMenu quit={this.quit}/> :*/}
                            {/*<LoginNav login={this.logInButtonClick} signup={this.signUpButtonClick}/>}*/}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <main>
                    {this.getMain()}
                    {this.state.showSign ?
                        <LogForm checked={this.state.checked} onClose={this.hideSignWindow} login={this.login}/> : null}
                </main>
            </div>
        );
    }
};
