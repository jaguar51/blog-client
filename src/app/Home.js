import React from "react";
import ArticleBig from "../article/ArticleBig";
import ArticleStandard from "../article/ArticleStandard";

const Home = React.createClass({
    render: function () {
        return (
            <div className="wrap">
                <div className="container main">
                    <div className="row">
                        <ArticleBig/>
                        <ArticleBig/>
                    </div>

                    <div className="row">
                        <ArticleStandard/>
                        <ArticleStandard/>
                        <ArticleStandard/>
                    </div>
                </div>
            </div>
        );
    }
});

export default Home;