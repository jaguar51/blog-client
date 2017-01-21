import React from "react";
import {Link} from "react-router";
import ArticlePreview from "./ArticlePreview";

export default class ArticleStandard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <ArticlePreview />
            </div>
        );
    }
}
