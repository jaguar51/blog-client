import React from "react";
import {Link} from "react-router";
import ArticlePreview from "./ArticlePreview";

const ArticleBig = React.createClass({
    render: function () {
        return (
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <ArticlePreview />
            </div>
        );
    }
});

export default ArticleBig;