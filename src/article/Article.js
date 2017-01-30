import React from "react";
import {Link} from "react-router";
import {Row, Col, Grid} from 'react-bootstrap';
import ArticleBody from "./ArticleBody";
import Comments from "../comment/Comments";

export default class Article extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="wrap">
                <Grid className="main">
                    <Row>
                        <Col lg={9} md={10} sm={12} xs={12} className="block-center-alignment">
                            <ArticleBody />
                            <Comments/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
};
