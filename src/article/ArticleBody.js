import React from "react";
import {browserHistory, Link} from "react-router";
import Api from "../api/Api";

export default class ArticleBody extends React.Component {

    constructor(props) {
        super(props);
        this.api = Api.getDefault();
    }

    getUserAvatar() {
        let author = this.props.article.author;
        if (author !== null) {
            if (author.avatar !== null) {
                return this.api.avatar.getUrl(author.avatar.originalPath);
            }
        }
        return '/assets/img/default-avatars/avatar-01.png';
    }

    getUserName() {
        let userName = "DELETED";
        let author = this.props.article.author;
        if (author !== null) {
            if (author.name !== null) {
                userName = author.name;
                if (author.surname !== null) {
                    userName = userName + " " + author.surname;
                }
            } else {
                userName = author.login;
            }
        }
        return userName;
    }

    tagOnClick(value) {
        browserHistory.push('/?q=tag:' + value);
    }

    render() {
        return (
            <div className="article-form">
                <div className="article-body">
                    <h1>
                        {this.props.article.title}
                    </h1>
                    <hr/>
                    <div dangerouslySetInnerHTML={{__html: this.props.article.text}}/>
                    <footer>
                        <span>Теги: </span>
                        {this.props.article.tags.map((item, index) =>
                            <li className="addedTag" key={item.id} onClick={this.tagOnClick.bind(this, item.value)}><span>{item.value}</span></li>
                        )}
                    </footer>
                    <footer className="article-info author">
                        <Link className="author-content" to={'/profile/' + this.props.article.author.id}>
                            <img src={this.getUserAvatar()} width="40px" height="40px" alt=""/>
                            <span>{this.getUserName()}</span>
                        </Link>
                        <span className="comments">1 Aug at 4:20 pm</span>
                    </footer>
                </div>
            </div>
        );
    }
}
