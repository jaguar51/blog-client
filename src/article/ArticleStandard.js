import React from "react";
import {Link} from "react-router";
import {Col} from 'react-bootstrap';
import ArticlePreview from "./ArticlePreview";

export default class ArticleStandard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Col lg={4} md={4} sm={12} xs={12}>
                <ArticlePreview />
            </Col>
        );
    }
}
