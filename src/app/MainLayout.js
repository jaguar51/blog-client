import React from "react";
import {Link} from "react-router";
import {Nav, Navbar, NavItem, FormGroup, InputGroup, FormControl, Button, Glyphicon, Row, Col} from 'react-bootstrap';
import LogForm from "../sign/LogForm";
import LoginNav from "../sign/LoginNav";
import UserMenu from "../user/UserMenu";
import TokenService from "../api/TokenService";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/styles.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Api from "../api/Api";

export default class MainLayout extends React.Component {

    constructor(props) {
        super(props);
        this.api = Api.getDefault();
        this.tokenService = new TokenService();
        this.state = {
            auth: false,
            showSign: false,
            checked: 'login'
        };
        if (this.tokenService.isTokenExist()) {
            let data = {
                "refresh_token": localStorage.getItem('refresh_token'),
                "grant_type": "refresh_token"
            };
            this.api.oauth.authorization(data).execute({
                success: ((body) => {
                    console.log('success');
                    console.log(body);
                    localStorage.setItem('refresh_token', body.refresh_token);
                    localStorage.setItem('access_token', body.access_token);
                    localStorage.setItem('account_id', body.account_id);
                    this.setState({
                        auth: true
                    })
                }),
                error: ((body) => {
                    console.log('error');
                    console.log(body);
                })
            });
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
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('access_token');
        localStorage.removeItem('account_id');
        this.setState({
            auth: false
        })
    }

    login() {
        this.setState({
            auth: true
        })
    }

    render() {
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
                            {this.state.auth ? <UserMenu quit={this.quit}/> :
                                <LoginNav login={this.logInButtonClick} signup={this.signUpButtonClick}/>}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <main>
                    {this.props.children}
                    {this.state.showSign ? <LogForm checked={this.state.checked} onClose={this.hideSignWindow} login={this.login}/> : null}
                </main>
            </div>
        );
    }
};
