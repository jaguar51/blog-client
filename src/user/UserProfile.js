import React from "react";
import {browserHistory} from "react-router";
import {Row, Col, Grid, Button, ButtonGroup} from 'react-bootstrap';
import Api from "../api/Api";
import UserInfo from "./UserInfo";
import ArticlePreview from "../article/ArticlePreview";

export default class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.api = Api.getDefault();
        this.state = {
            author: null,
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

        this.createArticleClick = this.createArticleClick.bind(this);
        this.settingsClick = this.settingsClick.bind(this);
    }

    createArticleClick() {
        browserHistory.push('/article-creation');
    }

    settingsClick() {
        browserHistory.push('/settings');
    }

    // getUserAvatar() {
    //     let avatar = require('../../assets/img/default-avatars/avatar-01.png');
    //     if (this.state.author !== null) {
    //         if (this.state.author.avatar !== null) {
    //             return this.api.avatar.getUrl(this.state.author.avatar.originalPath);
    //         }
    //     }
    //     return avatar;
    // }
    //
    // getLogin() {
    //     if (this.state.author !== null) {
    //         return this.state.author.login;
    //     }
    // }
    //
    // getName(){
    //     if (this.state.author !== null) {
    //         return this.state.author.login;
    //     }
    // }

    render() {
        return (
            <div className="wrap">
                <Grid className="main">
                    <Row>
                        <Col lg={3} md={3} sm={12} xs={12}>
                            <div className="profile">
                                {this.state.author === null ? null : <UserInfo info={this.state.author} />}
                                <Button block bsSize="sm" className="custom-button custom-btn-group"
                                        onClick={this.createArticleClick}>
                                    Создать статью
                                </Button>

                                <ButtonGroup vertical block className="custom-btn-group">
                                    <Button bsSize="sm" className="custom-button" onClick={this.createArticleClick}>
                                        Все статьи
                                    </Button>
                                    <Button bsSize="sm" className="custom-button" onClick={this.createArticleClick}>
                                        Черновики
                                    </Button>
                                </ButtonGroup>

                                <Button block bsSize="sm" className="custom-button custom-changes-btn"
                                        onClick={this.settingsClick}>
                                    Настройки
                                </Button>
                            </div>
                        </Col>

                        <Col lg={9} md={9} sm={12} xs={12}>
                            <Row>
                                {/*<ArticlePreview size="max"/>*/}
                                {/*<ArticlePreview size="max"/>*/}
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
};