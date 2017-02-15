import React from "react";
import {Row, Grid} from 'react-bootstrap';
import ArticlePreview from "../article/ArticlePreview";
import Api from "../api/Api";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.api = Api.getDefault();
        this.state = {
            articles: [],
        };
        this.data = {
            "limit": 2
        };
        this.api.article.list(this.data).execute({
            success: ((body) => {
                console.log('success');
                console.log(body);
                this.setState({
                    articles: body.data.result,
                })
            }),
            error: ((body) => {
                console.error('error');
                console.error(body);
            })
        });
    }




    render() {
        let articles = this.state.articles;
        let bigArticles = [];
        for (let i = 0; i < articles.length && i < 2; i++) {
            bigArticles.push(<ArticlePreview key={articles[i].id} size="big" data={articles[i]}/>);
        }
        let standardArticles = [];
        for (let i = 2; i < articles.length; i++) {
            standardArticles.push(<ArticlePreview key={articles[i].id} data={articles[i]}/>);
        }


        return (
            <div className="wrap">
                <Grid className="main">
                    <Row>
                        {bigArticles}
                    </Row>

                    <Row>
                        {standardArticles}
                    </Row>
                </Grid>
            </div>
        );
    }
}
