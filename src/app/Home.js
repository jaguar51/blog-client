import React from "react";
import ArticleBig from "../article/ArticleBig";
import {Row, Grid} from 'react-bootstrap';
import ArticleStandard from "../article/ArticleStandard";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="wrap">
                <Grid className="main">
                    <Row>
                        <ArticleBig/>
                        <ArticleBig/>
                    </Row>

                    <Row>
                        <ArticleStandard/>
                        <ArticleStandard/>
                        <ArticleStandard/>
                    </Row>
                </Grid>
            </div>
        );
    }
}
