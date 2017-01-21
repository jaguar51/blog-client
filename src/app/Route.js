import React from "react";
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import MainLayout from "./MainLayout";
import Home from "./Home";
import Article from "../article/Article";
import UserProfile from "../user/UserProfile";
import UserSettings from "../user/UserSettings";
import ArticleCreation from "../article/ArticleCreation";

export default (
    <Router history={browserHistory}>
        <Route component={MainLayout}>
            <Route path="/" component={Home}/>
            <Route path="article" component={Article}/>
            <Route path="/profile" component={UserProfile}/>
            <Route path="/settings" component={UserSettings}/>
            <Route path="/article-creation" component={ArticleCreation}/>
        </Route>
    </Router>
);