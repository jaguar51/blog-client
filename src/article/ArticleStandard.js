import React from "react";
import {Link} from "react-router";
import ArticlePreview from "./ArticlePreview";

const ArticleStandard = React.createClass({
    render: function () {
        return (
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <ArticlePreview />
            </div>
        );
    }
});

export default ArticleStandard;