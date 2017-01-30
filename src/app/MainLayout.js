import React from "react";
import {Link} from "react-router";
import {Nav, Navbar, NavItem, FormGroup, InputGroup, FormControl, Button, Glyphicon, Row, Col} from 'react-bootstrap';
import LogForm from "../sign/LogForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/styles.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Api from "../api/Api";

export default class MainLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showSign: false,
            checked: 'login'
        };
        // let api = Api.getDefault();
        // api.account.getById('f99a4a24-4a72-45c6-b854-036aff3929ad').execute({
        //     success: function (body) {
        //         console.log('success');
        //         console.log(body);
        //     },
        //     error: function (body) {
        //         console.log('error');
        //         console.log(body);
        //     }
        // });

        this.logInButtonClick = this.logInButtonClick.bind(this);
        this.signUpButtonClick = this.signUpButtonClick.bind(this);
        this.hideSignWindow = this.hideSignWindow.bind(this);
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
                        <form className="nav navbar-form navbar-left" role="search">
                            <FormGroup>
                                <InputGroup>
                                    <FormControl type="text" className="search"/>
                                    <InputGroup.Button>
                                        <Button className="custom-button search-btn">
                                            <Glyphicon glyph="search"/>
                                        </Button>
                                    </InputGroup.Button>
                                </InputGroup>
                            </FormGroup>
                        </form>
                        <Nav pullRight>
                            <NavItem onClick={this.logInButtonClick}>Вход</NavItem>
                            <NavItem onClick={this.signUpButtonClick}>Регистрация</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <main>
                    {this.props.children}
                    {this.state.showSign ? <LogForm checked={this.state.checked} onClose={this.hideSignWindow}/> : null}
                </main>
            </div>
        );
    }
};
