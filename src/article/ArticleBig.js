import React from "react";
import {Link} from "react-router";
import ArticlePreview from "./ArticlePreview";

export default class ArticleBig extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <ArticlePreview />
            </div>
        );
    }
}
