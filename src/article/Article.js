import React from "react";
import {Link} from "react-router";
import ArticleBody from "./ArticleBody";
import Comments from "../comment/Comments";

const Article = React.createClass({
    render: function () {
        return (
            <div className="wrap">
                <div className="container main">
                    <div className="row">
                        <div className="col-lg-9 col-md-10 col-sm-12 col-xs-12 block-center-alignment">

                            <ArticleBody />

                            <Comments/>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default Article;