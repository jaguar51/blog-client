import React from "react";
import {browserHistory} from "react-router";
import {Button, ButtonGroup} from "react-bootstrap";
import TokenService from "../api/TokenService";
import Api from "../api/Api";

export default class ArticleBody extends React.Component {

    constructor(props) {
        super(props);
        this.tokenService = new TokenService();
        this.api = Api.getDefault();
        this.state = {
            status: this.props.article.status,
        };

        this.deleteOnClick = this.deleteOnClick.bind(this);
        this.blockOnClick = this.blockOnClick.bind(this);
        this.changeOnClick = this.changeOnClick.bind(this);
        this.getModerButtons = this.getModerButtons.bind(this);
        this.getAdminButtons = this.getAdminButtons.bind(this);
        this.getChangeButtons = this.getChangeButtons.bind(this);
        this.authorOnClick = this.authorOnClick.bind(this);
        this.getAdminMenu = this.getAdminMenu.bind(this);
        this.getDate = this.getDate.bind(this);
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

    authorOnClick() {
        if (this.props.article.author !== null) {
            browserHistory.push('/profile/' + this.props.article.author.id);
        }
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

    deleteOnClick() {
        this.api.article.remove(this.props.article.id).execute({
            success: ((body) => {
                console.log('success');
                console.log(body);
                browserHistory.push('/');
            }),
            error: ((body) => {
                console.error('error');
                console.error(body);
            })
        });
    }

    blockOnClick() {
        let data = [];
        data.push(this.props.article.id);
        if (this.state.status !== "LOCKED") {
            this.api.article.block(data).execute({
                success: ((body) => {
                    console.log('success');
                    console.log(body);
                    this.setState({
                        status: "LOCKED",
                    });
                }),
                error: ((body) => {
                    console.error('error');
                    console.error(body);
                })
            });
        } else {
            this.api.article.unlock(data).execute({
                success: ((body) => {
                    console.log('success');
                    console.log(body);
                    this.setState({
                        status: "UNLOCKED",
                    });
                }),
                error: ((body) => {
                    console.error('error');
                    console.error(body);
                })
            });
        }
    }

    changeOnClick() {
        browserHistory.push('/article-creation/' + this.props.article.id);
    }

    getAdminMenu() {
        let menu = null;
        if (this.tokenService.isTokenExist() && this.props.article !== null) {
            let roles = JSON.parse(localStorage.getItem('roles'));
            for (let i = 0; i < roles.length; i++) {
                if (roles[i] === "ROLE_ADMIN") {
                    menu =
                        <ButtonGroup>{this.getAdminButtons()}{this.getModerButtons()}{this.getChangeButtons()}</ButtonGroup>;
                } else if (roles[i] === "ROLE_MODERATOR") {
                    menu = <ButtonGroup>{this.getModerButtons()}{this.getChangeButtons()}</ButtonGroup>;
                } else if (this.props.article.author !== null
                    && this.tokenService.getId() === this.props.article.author.id) {
                    menu = this.getChangeButtons();
                }
            }
        }
        return menu;
    }

    getAdminButtons() {
        return <Button bsSize="sm" bsStyle="danger" onClick={this.deleteOnClick}
                       className="delete-btn">Удалить статью</Button>;
    }

    getModerButtons() {
        return <Button bsSize="sm" bsStyle="danger" onClick={this.blockOnClick}
                       className="delete-btn">{this.state.status !== "LOCKED" ? "Заблокировать статью" : "Разблокировать статью"}</Button>;
    }

    getChangeButtons() {
        return <Button bsSize="sm" bsStyle="danger" onClick={this.changeOnClick} className="delete-btn">Изменить
            статью</Button>;
    }

    getDate() {
        let date = new Date(this.props.article.creationDate);
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
            <div className="article-form">
                <div className="article-body">
                    <h1>
                        {this.props.article.title}
                    </h1>
                    <hr/>
                    <div className="article-body-text" dangerouslySetInnerHTML={{__html: this.props.article.text}}/>
                    <footer>
                        <span>Теги: </span>
                        {this.props.article.tags.map((item, index) =>
                            <li className="addedTag" key={item.id} onClick={this.tagOnClick.bind(this, item.value)}>
                                <span>{item.value}</span></li>
                        )}
                    </footer>
                    <footer className="article-info author">
                        <div className="author-content" onClick={this.authorOnClick}>
                            <figure className="avatar" style={avatarImgStyle}/>
                            <span>{this.getUserName()}</span>
                        </div>
                        <span className="comments">{this.getDate()}</span>
                    </footer>
                    {this.getAdminMenu()}
                </div>
            </div>
        );
    }
}
