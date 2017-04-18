import React from "react";
import {NavItem, Nav} from 'react-bootstrap';

export default class LoginNav extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Nav pullRight>
                <NavItem onClick={this.props.login}>Вход</NavItem>
                <NavItem onClick={this.props.signup}>Регистрация</NavItem>
            </Nav>
        );
    }
};
