import React from "react";
import {Button, ButtonGroup} from 'react-bootstrap';
import {browserHistory} from "react-router";

export default class UserProfileMenu extends React.Component {

    constructor(props) {
        super(props);

        this.createArticleClick = this.createArticleClick.bind(this);
        this.settingsClick = this.settingsClick.bind(this);
    }

    createArticleClick() {
        browserHistory.push('/article-creation');
    }

    settingsClick() {
        browserHistory.push('/settings');
    }

    render() {
        return (
            <div>
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
        );
    }
};
