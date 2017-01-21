import React from "react";
import ArticleBig from "../article/ArticleBig";
import ArticleStandard from "../article/ArticleStandard";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
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
}
