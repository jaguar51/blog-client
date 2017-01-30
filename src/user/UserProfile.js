import React from "react";
import {browserHistory} from "react-router";
import {Row, Col, Grid, Button, ButtonGroup} from 'react-bootstrap';
import ArticlePreview from "../article/ArticlePreview";

export default class UserProfile extends React.Component {

    constructor(props) {
        super(props);
    }

    createArticleClick() {
        browserHistory.push('/article-creation');
    }

    settingsClick() {
        browserHistory.push('/settings');
    }

    render() {
        return (
            <div className="wrap">
                <Grid className="main">
                    <Row>
                        <Col lg={3} md={3} sm={12} xs={12}>
                            <div className="profile">
                                <img className="profile-avatar"
                                     src={require('../../assets/img/default-avatars/avatar-01.png')} alt=""/>
                                <div>
                                    <h2 className="login">Joe Smith</h2>
                                    <span>Имя: Joe</span><br/>
                                    <span>Фамилия: Smith</span>
                                </div>

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
                                <ArticlePreview size="max"/>
                                <ArticlePreview size="max"/>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
};