import React from "react";
import {browserHistory, Link} from "react-router";
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
            request: "",
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
        this.searchOnChange = this.searchOnChange.bind(this);
        this.onClickSearch = this.onClickSearch.bind(this);
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
        });
        browserHistory.push('/');
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
            return React.cloneElement(this.props.children, {auth: this.state.auth});
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

    searchOnChange(event) {
        this.setState({
            request: event.target.value
        });
    }

    onClickSearch() {
        if (this.state.request !== "") {
            browserHistory.push('/' + this.state.request);
        }
    }

    render() {
        console.log(this.state.auth);
        return (
            <div className="app">
                <Navbar className="navbar-style custom-navbar" fixedTop>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a className="logo" href="/">Blog</a>
                        </Navbar.Brand>
                        <Navbar.Toggle className="custom-button"/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Navbar.Form pullLeft>
                            <FormGroup>
                                <InputGroup>
                                    <FormControl type="text" className="search" placeholder="Найти"
                                                 onChange={this.searchOnChange} value={this.state.request}/>
                                    <InputGroup.Button>
                                            <Button className="custom-button search-btn" href={'/?q=' + this.state.request}>
                                                <Glyphicon glyph="search"/>
                                            </Button>
                                    </InputGroup.Button>
                                </InputGroup>
                            </FormGroup>
                        </Navbar.Form>
                        <Nav className="right-profile">
                            {this.getUserMenu()}
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
