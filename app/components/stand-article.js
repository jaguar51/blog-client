import React from "react";
import {Link} from "react-router";
import ArticlePrev from "./article-prev";

const StandArticle = React.createClass({
    render: function () {
        return (
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <ArticlePrev />
            </div>
        );
    }
});

export default StandArticle;