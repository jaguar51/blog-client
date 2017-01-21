import React from "react";
import {Link} from "react-router";
import ArticlePrev from "./article-prev";

const BigArticle = React.createClass({
    render: function () {
        return (
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <ArticlePrev />
            </div>
        );
    }
});

export default BigArticle;