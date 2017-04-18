import React from "react";
import {Link} from "react-router";
import {Row, Col, Grid} from 'react-bootstrap';
import ArticleBody from "./ArticleBody";
import Api from "../api/Api";
import Field from "../app/Field";
import Comments from "../comment/Comments";

export default class Article extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            article: null,
            message: null,
        };

        this.api = Api.getDefault();

        this.api.article.getById(this.props.params.articleId).execute({
            success: ((body) => {
                console.log('success');
                console.log(body);
                this.setState({
                    article: body.data.result === null ? "not found" : body.data.result,
                    message: "Данная статья не найдена"
                })
            }),
            error: ((body) => {
                console.error('error');
                console.error(body);
                if (/rights/.test(body.error_description)) {
                    this.setState({
                        article: "not found",
                        message: "Нет прав доступа"
                    })
                }
            })
        });

        this.getArticle = this.getArticle.bind(this);
    }

    getArticle() {
        if (this.state.article === "not found") {
            return <Field key="emptyField" text={this.state.message}/>
        }
        else if (this.state.article !== null) {
            return <div><ArticleBody article={this.state.article}/><Comments articleId={this.props.params.articleId}/></div>;
        }
        return null;
    }

    render() {
        return (
            <div className="wrap">
                <Grid className="main">
                    <Row>
                        <Col lg={9} md={10} sm={12} xs={12} className="block-center-alignment">
                            {this.getArticle()}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
};
