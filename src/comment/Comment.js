import React from "react";
import {browserHistory, Link} from "react-router";
import Api from "../api/Api";

export default class Comment extends React.Component {

    constructor(props) {
        super(props);
        this.api = Api.getDefault();

        this.getDate = this.getDate.bind(this);
        this.getUserAvatar = this.getUserAvatar.bind(this);
        this.getUserName = this.getUserName.bind(this);
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

    getDate() {
        let date = new Date(this.props.data.creationDate);
        let options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timezone: 'UTC',
            hour: 'numeric',
            minute: 'numeric'
        };
        return date.toLocaleString("ru", options).replace(/г.,/, 'в');
    }

    render() {
        let avatarImgStyle = {
            'backgroundImage': 'url(' + this.getUserAvatar() + ')',
            'backgroundRepeat': 'no-repeat',
            'backgroundPosition': 'center',
            'backgroundSize': 'cover',
            'width': '40px',
            'height': '40px',
        };

        return (
            <div>
                <hr />
                <p>
                    {this.props.data.text}
                </p>
                <footer className="article-info author">
                    <Link className="author-content" to={'/profile/' + this.props.data.author.id}>
                        <figure className="avatar" style={avatarImgStyle}/>
                        <span>{this.getUserName()}</span>
                    </Link>
                    <span className="comments">{this.getDate()}</span>
                </footer>
            </div>
        );
    }
}
