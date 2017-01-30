import React from "react";
import {Row, Grid} from 'react-bootstrap';
import ArticlePreview from "../article/ArticlePreview";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="wrap">
                <Grid className="main">
                    <Row>
                        <ArticlePreview size="big"/>
                        <ArticlePreview size="big"/>
                    </Row>

                    <Row>
                        <ArticlePreview/>
                        <ArticlePreview/>
                        <ArticlePreview/>
                    </Row>
                </Grid>
            </div>
        );
    }
}
