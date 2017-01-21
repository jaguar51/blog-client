import React from "react";
import {Link} from "react-router";
import ArticleBody from "./ArticleBody";
import Comments from "../comment/Comments";

export default class Article extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
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
};
