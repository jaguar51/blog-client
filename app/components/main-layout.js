import React from "react";
import {Link} from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/styles.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../assets/js/loginform.js";
import "../assets/js/tags.js";

const MainLayout = React.createClass({
    render: function () {
        return (
            <div className="app">
                <nav className="navbar navbar-default navbar-fixed-top navbar-style">
                    <div className="container">
                        <div className="custom-navbar">
                            <div className="navbar-header ">
                                <button type="button" data-target="#navbarCollapse" data-toggle="collapse"
                                        className="navbar-toggle custom-button">
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
                                    <li><Link to="#" className="loginBtn">Вход</Link></li>
                                    <li><Link to="#" className="signUpBtn">Регистрация</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
});

export default MainLayout;