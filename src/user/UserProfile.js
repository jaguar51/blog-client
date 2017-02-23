import React from "react";
import {browserHistory} from "react-router";
import {Row, Col, Grid, Button, ButtonGroup} from 'react-bootstrap';
import Api from "../api/Api";
import UserInfo from "./UserInfo";
import InfiniteScroll from 'react-infinite-scroller';
import TokenService from "../api/TokenService";
import UserProfileMenu from "./UserProfileMenu";
import ArticlePreview from "../article/ArticlePreview";

export default class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.api = Api.getDefault();
        this.tokenService = new TokenService();
        this.state = {
            page: 0,
            author: null,
            articles: [],
            hasMore: true,
        };
        this.api.account.getById(this.props.params.userId).execute({
            success: ((body) => {
                console.log('success');
                console.log(body);
                this.setState({
                    author: body.data.result,
                })
            }),
            error: ((body) => {
                console.error('error');
                console.error(body);
            })
        });

        this.loadItems = this.loadItems.bind(this);
    }

    loadItems() {
        let data = {
            "page": this.state.page,
            "limit": 4,
            "status": "PUBLISHED",
            "authorId": this.props.params.userId,
        };
        this.api.article.list(data).execute({
            success: ((body) => {
                console.log('success');
                console.log(body);
                if (body.data.result.length === 0) {
                    this.setState({
                        hasMore: false,
                    });
                    if (this.state.articles.length === 0) {
                        this.setState({
                            articles: this.state.articles.concat([<Field key="emptyField" text="Нет статей"/>]),
                        })
                    }
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
            })
        });
    }

    getUserProfileMenu() {
        if (this.tokenService.isTokenExist() && (this.tokenService.getId() === this.props.params.userId)) {
            return <UserProfileMenu/>
        } else {
            return null;
        }
    }

    render() {
        let articles = this.state.articles;
        let standardArticles = [];
        for (let i = 0; i < articles.length; i++) {
            standardArticles.push(<ArticlePreview key={articles[i].id} data={articles[i]} size="max"/>);
        }

        return (
            <div className="wrap">
                <Grid className="main">
                    <Row>
                        <Col lg={3} md={3} sm={12} xs={12}>
                            <div className="profile">
                                {this.state.author === null ? null : <UserInfo info={this.state.author} />}
                                {this.getUserProfileMenu()}
                            </div>
                        </Col>

                        <Col lg={9} md={9} sm={12} xs={12}>
                            <Row>
                                {this.state.author === null ? null : <InfiniteScroll
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
                                    </InfiniteScroll>}
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
};