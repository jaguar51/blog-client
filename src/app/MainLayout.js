import React from "react";
import {Link} from "react-router";
import LogForm from "../sign/LogForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/styles.css";
import "bootstrap/dist/js/bootstrap.min.js";

export default class MainLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showSign: false,
            checked: 'login'
        };
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
                <nav className="navbar navbar-default navbar-fixed-top navbar-style">
                    <div className="container">
                        <div className="custom-navbar">
                            <div className="navbar-header ">
                                <button type="button" data-target="#navbarCollapse" data-toggle="collapse" className="navbar-toggle custom-button">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"/>
                                    <span className="icon-bar"/>
                                    <span className="icon-bar"/>
                                </button>
                                <Link to="/" className="navbar-brand logo">Blog</Link>
                            </div>

                            <div id="navbarCollapse" className="collapse navbar-collapse">
                                <form className="nav navbar-form navbar-left" role="search">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="input-group">
                                                <input type="text" className="form-control search" placeholder="Найти"/>
                                                <span className="input-group-btn">
                                                    <button className="btn btn-default custom-button search-btn" type="button">
                                                        <span className="glyphicon glyphicon-search"/>
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <ul className="nav navbar-nav navbar-right">
                                    <li className="loginBtn" onClick={this.logInButtonClick}>Вход</li>
                                    <li className="signUpBtn" onClick={this.signUpButtonClick}>Регистрация</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
                <main>
                    {this.props.children}
                    {this.state.showSign ? <LogForm checked={this.state.checked} onClose={this.hideSignWindow}/> : null}
                </main>
            </div>
        );
    }
};
