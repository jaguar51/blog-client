import React from "react";
import {Button, ButtonGroup} from 'react-bootstrap';
import {browserHistory} from "react-router";
import TokenService from "../api/TokenService";

export default class UserProfileMenu extends React.Component {

    constructor(props) {
        super(props);
        this.tokenService = new TokenService();

        this.allArticlesClick = this.allArticlesClick.bind(this);
        this.draftedArticlesClick = this.draftedArticlesClick.bind(this);
    }

    allArticlesClick() {
        this.props.settings("PUBLISHED");
    }

    draftedArticlesClick() {
        this.props.settings("DRAFT");
    }

    render() {
        return (
            <div>
                <Button block bsSize="sm" className="custom-button custom-btn-group" href="/article-creation">
                    Создать статью
                </Button>

                <ButtonGroup vertical block className="custom-btn-group">
                    <Button bsSize="sm" className="custom-button" onClick={this.allArticlesClick}>
                        Все статьи
                    </Button>
                    <Button bsSize="sm" className="custom-button" onClick={this.draftedArticlesClick}>
                        Черновики
                    </Button>
                </ButtonGroup>

                <Button block bsSize="sm" className="custom-button custom-changes-btn" href="/settings">
                    Настройки
                </Button>
            </div>
        );
    }
};
