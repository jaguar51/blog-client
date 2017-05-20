import React from "react";
import {Row, Grid} from 'react-bootstrap';
import ArticlePreview from "../article/ArticlePreview";
import InfiniteScroll from 'react-infinite-scroller';
import Api from "../api/Api";
import Field from "./Field";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.api = Api.getDefault();
        this.state = {
            request: this.props.location.query.q,
            page: 0,
            articles: [],
            hasMore: true,
        };
        this.loadItems = this.loadItems.bind(this);
        document.title = "Blog";
    }

    loadItems() {
        let data = {
            "page": this.state.page,
            "limit": 6,
            "orderBy": "creationDate:desc",
        };
        if (this.state.request !== undefined) {
            if (this.state.request.indexOf("tag:") === 0) {
                console.log(this.state.request.split('tag:'));
                data = {
                    "tag": this.state.request.split('tag:')[1],
                    "page": this.state.page,
                    "limit": 6,
                    "orderBy": "creationDate:desc",
                };
                this.api.article.list(data).execute({
                    success: ((body) => {
                        console.log('success');
                        console.log(body);
                        if (body.data.result.length === 0) {
                            this.setState({
                                hasMore: false,
                            });
                        } else {
                            this.setState({
                                page: this.state.page + 1,
                                articles: this.state.articles.concat(body.data.result),
                            })
                        }
                    }),
                    error: ((body) => {
                        console.error('error');
                        console.error(body);
                        this.setState({
                            hasMore: false,
                        });
                    })
                });
            } else {
                data = {
                    "q": this.state.request,
                    "page": this.state.page,
                    "limit": 6,
                    "orderBy": "creationDate:desc",
                };
                this.api.article.search(data).execute({
                    success: ((body) => {
                        console.log('success');
                        console.log(body);
                        if (body.data.result.length === 0) {
                            this.setState({
                                hasMore: false,
                            });
                        } else {
                            this.setState({
                                page: this.state.page + 1,
                                articles: this.state.articles.concat(body.data.result),
                            })
                        }
                    }),
                    error: ((body) => {
                        console.error('error');
                        console.error(body);
                        this.setState({
                            hasMore: false,
                        });
                    })
                });
            }
        } else {
            this.api.article.list(data).execute({
                success: ((body) => {
                    console.log('success');
                    console.log(body);
                    if (body.data.result.length === 0) {
                        this.setState({
                            hasMore: false,
                        });
                    } else {
                        this.setState({
                            page: this.state.page + 1,
                            articles: this.state.articles.concat(body.data.result),
                        })
                    }
                }),
                error: ((body) => {
                    console.error('error');
                    console.error(body);
                    this.setState({
                        hasMore: false,
                    });
                })
            });
        }
    }


    render() {
        let articles = this.state.articles;
        let bigArticles = [];
        let standardArticles = [];
        for (let i = 0; i < articles.length && i < 2; i++) {
            bigArticles.push(<ArticlePreview key={articles[i].id} size="big" data={articles[i]}/>);
        }
        for (let i = 2; i < articles.length; i++) {
            standardArticles.push(<ArticlePreview key={articles[i].id} data={articles[i]}/>);
        }


        return (
            <div className="wrap">
                <Grid className="main">
                    <Row>
                        {bigArticles.length === 0 ? <Field key="emptyField" text="Нет статей"/> : bigArticles}
                    </Row>
                    <Row>
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={this.loadItems}
                            hasMore={this.state.hasMore}
                            loader={
                                <div>
                                    <span className="loader">
                                        <span></span>
                                    </span>
                                    Loading ...
                                </div>
                            }
                        >
                            {standardArticles}
                        </InfiniteScroll>
                    </Row>
                </Grid>
            </div>
        );
    }
}
