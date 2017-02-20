import React, {PropTypes} from "react";
import {browserHistory, Link} from "react-router";
import {Col} from 'react-bootstrap';
import TextTruncate from "react-text-truncate";
import Api from "../api/Api";

class ArticlePreview extends React.Component {

    constructor(props) {
        super(props);
        this.api = Api.getDefault();
        this.commentDeclensions = [" комментарий", " комментария", " комментариев"];
    }

    handleClick() {
        browserHistory.push('/article');
    }

    handleFooterClick() {
        browserHistory.push('/profile');
    }

    getTitle() {
        return this.props.data.title;
    }

    getImage() {
        debugger;
        if (this.props.data.images.length !== 0) {
            return this.api.image.getUrl(this.props.data.images[0].originalPath);
        } else {
            return require('../../assets/img/default-article-img/default-img1.png');
        }
    }

    getText() {
        return this.props.data.text;
    }

    getUserAvatar() {
        if (this.props.data.author.avatar !== null) {
            return this.api.avatar.getUrl(this.props.data.author.avatar.originalPath);
        } else {
            return require('../../assets/img/default-avatars/avatar-01.png');
        }
    }

    getComments() {
        let number = this.props.data.commentsCount;
        let cases = [2, 0, 1, 1, 1, 2];
        return number + this.commentDeclensions[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }

    getUserName() {
        let userName = null;
        if (this.props.data.author.name !== null) {
            userName = this.props.data.author.name;
            if (this.props.data.author.surname !== null) {
                userName = userName + this.props.data.author.surname;
            }
        } else {
            userName = this.props.data.author.login;
        }
        return userName;
    }

    get size() {
        if (this.props.size === "small") {
            return 3;
        } else if (this.props.size === "big") {
            return 6;
        } else if (this.props.size === "max") {
            return 12;
        } else {
            return 4;
        }
    }

    render() {
        return (
            <Col lg={this.size} md={this.size} sm={12} xs={12}>
                <div className="article">
                    <figure className="article-image is-3by2" onClick={this.handleClick}>
                        <img src={this.getImage()} alt=""/>
                    </figure>
                    <div className="article-body-preview" onClick={this.handleClick}>
                        <h2 className="article-title">
                            {this.getTitle()}
                        </h2>
                        <TextTruncate line={1} truncateText="…" text={this.getText()} className="article-content"/>
                    </div>
                    <footer className="article-info-preview author" onClick={this.handleFooterClick}>
                        <div className="author-content">
                            <img src={this.getUserAvatar()} width="40px"
                                 height="40px" alt=""/>
                            <span> By {this.getUserName()}</span>
                        </div>
                        <span className="comments">{this.getComments()}</span>
                    </footer>
                </div>
            </Col>
        );
    }
}

ArticlePreview.propTypes = {
    size: PropTypes.string
};

export default ArticlePreview;
