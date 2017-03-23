import React from "react";
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import MainLayout from "./MainLayout";
import Home from "./Home";
import Article from "../article/Article";
import UserProfile from "../user/UserProfile";
import UserSettings from "../user/UserSettings";
import ArticleCreation from "../article/ArticleCreation";
import TokenService from "../api/TokenService";

function requireAuth(nextState, replace) {
    this.tokenService = new TokenService();
    console.log(localStorage.getItem('account_id'));
    if (!this.tokenService.isTokenExist()) {
        console.log(localStorage.getItem('access_token'));
        replace({
            pathname: '/',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

export default (
    <Router history={browserHistory}>
        <Route component={MainLayout}>
            <Route path="/" component={Home}/>
            <Route path="/article/:articleId" component={Article}/>
            <Route path="/profile/:userId(/:status)" component={UserProfile}/>
            <Route path="/settings" component={UserSettings} onEnter={requireAuth}/>
            <Route path="/article-creation" component={ArticleCreation} onEnter={requireAuth}/>
        </Route>
    </Router>
);