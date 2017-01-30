import React from "react";
import {Link} from "react-router";
import {Col} from 'react-bootstrap';
import ArticlePreview from "./ArticlePreview";

export default class ArticleBig extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Col lg={6} md={6} sm={12} xs={12}>
                <ArticlePreview />
            </Col>
        );
    }
}
