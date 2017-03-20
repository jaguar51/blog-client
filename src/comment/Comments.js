import React from "react";
import {Link} from "react-router";
import Api from "../api/Api";
import InfiniteScroll from 'react-infinite-scroller';
import Comment from './Comment';
import TokenService from "../api/TokenService";

export default class Comments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            comments: [],
            hasMore: true,
            comment: "",
        };

        this.api = Api.getDefault();
        this.tokenService = new TokenService();

        this.loadItems = this.loadItems.bind(this);
        this.getInput = this.getInput.bind(this);
        this.commentOnChange = this.commentOnChange.bind(this);
        this.sendOnClick = this.sendOnClick.bind(this);
    }

    loadItems() {
        let data = {
            "articleId": this.props.articleId,
            "page": this.state.page,
            "limit": 20,
            "orderBy": "creationDate:desc",
        };
        this.api.comment.list(data).execute({
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
                        comments: this.state.comments.concat(body.data.result),
                    })
                }
            }),
            error: ((body) => {
                console.error('error');
                console.error(body);
            })
        });
    }

    commentOnChange(element) {
        this.setState({
            comment: element.target.value,
        });
    }

    sendOnClick() {
        if (this.state.comment !== "") {
            let data = {
                text: this.state.comment,
                article: {
                    id: this.props.articleId
                }
            };
            this.api.comment.create(data).execute({
                success: ((body) => {
                    console.log('success');
                    console.log(body);
                    this.setState({
                        page: 0,
                        hasMore: true,
                        comments: [],
                        comment: "",
                    });
                }),
                error: ((body) => {
                    console.error('error');
                    console.error(body);
                })
            });
        }
    }

    getInput() {
        if (this.tokenService.isTokenExist()) {
            return <div className="article-form">
                <div className="article-body">
                    <div className="form-group">
                        <label htmlFor="text">Оставить комментарий</label>
                        <textarea className="form-control vresize" name="text" id="text"
                                  placeholder="Введите текст" onChange={this.commentOnChange}
                                  value={this.state.comment}/>
                    </div>
                    <button className="btn btn-default custom-button" onClick={this.sendOnClick}>Отправить</button>
                </div>
            </div>
        }
        return null;
    }

    render() {
        let commentsInf = this.state.comments;
        let comments = [];
        for (let i = 0; i < commentsInf.length; i++) {
            comments.push(<Comment key={commentsInf[i].id} data={commentsInf[i]}/>);
        }

        return (
            <div>
                {this.getInput()}

                <div className="article-form">
                    <div className="article-body">
                        <h3>Комментарии</h3>
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={this.loadItems}
                            hasMore={this.state.hasMore}
                            loader={<div>
                                        <span className="loader">
                                            <span></span>
                                        </span>
                                Loading ...
                            </div>
                            }>
                            {comments.length === 0 ? <p>Нет комментариев</p> : comments}
                        </InfiniteScroll>
                    </div>
                </div>

            </div>
        );
    }
}
