import React from "react";
import {browserHistory, Link} from "react-router";
import Api from "../api/Api";

export default class Comment extends React.Component {

    constructor(props) {
        super(props);
        this.api = Api.getDefault();
    }

    getUserName() {
        let userName = "DELETED";
        let author = this.props.data.author;
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

    getUserAvatar() {
        let author = this.props.data.author;
        if (author !== null) {
            if (author.avatar !== null) {
                return this.api.avatar.getUrl(author.avatar.originalPath);
            }
        }
        return '/assets/img/default-avatars/avatar-01.png';
    }

    render() {
        return (
            <div>
                <hr />
                <p>
                    {this.props.data.text}
                </p>
                <footer className="article-info author">
                    <Link className="author-content" to={'/profile/' + this.props.data.author.id}>
                        <img src={this.getUserAvatar()} width="40px" height="40px" alt=""/>
                        <span>{this.getUserName()}</span>
                    </Link>
                    <span className="comments">1 Aug at 4:20 pm</span>
                </footer>
            </div>
        );
    }
}
