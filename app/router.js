import React from "react";
import {Router, Route, browserHistory, IndexRoute} from "react-router";
// Layouts
import MainLayout from "./components/main-layout";
// Pages
import Home from "./components/home";
import Article from "./components/article";
import UserProfile from "./components/user-profile";
import UserSettings from "./components/user-settings";
import ArticleCreation from "./components/article-creation";

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