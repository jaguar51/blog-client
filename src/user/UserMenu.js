import React from "react";
import {Nav, Dropdown, MenuItem} from 'react-bootstrap';
import {browserHistory} from "react-router";
import Api from "../api/Api";
import TokenService from "../api/TokenService";

export default class UserMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profileImg: "/assets/img/default-avatars/avatar-01.png",
        };
        this.api = Api.getDefault();
        this.tokenService = new TokenService();
        this.api.account.getById(this.tokenService.getId()).execute({
            success: ((body) => {
                console.log('success');
                console.log(body);
                if (body.data.result.avatar !== null) {
                    this.setState({
                        profileImg: this.api.avatar.getUrl(body.data.result.avatar.thumbnailPath)
                    })
                }
            }),
            error: ((body) => {
                console.log('error');
                console.log(body);
            })
        });

        this.createArticleClick = this.createArticleClick.bind(this);
        this.settingsClick = this.settingsClick.bind(this);
        this.allArticlesClick = this.allArticlesClick.bind(this);
        this.draftedArticlesClick = this.draftedArticlesClick.bind(this);
    }

    createArticleClick() {
        browserHistory.push('/article-creation');
    }

    settingsClick() {
        browserHistory.push('/settings');
    }

    allArticlesClick() {
        browserHistory.push('/profile/' + this.tokenService.getId() + "/PUBLISHED");
    }

    draftedArticlesClick() {
        browserHistory.push('/profile/' + this.tokenService.getId() + "/DRAFT");
    }

    render() {
        return (
            <Nav className="right-profile">
                <Dropdown id="dropdown-custom-1" noCaret className="right-profile">
                    <Dropdown.Toggle noCaret className="user-menu">
                        <img className="img-circle profile-img" src={this.state.profileImg} alt=""/>
                        <div className="profile-name">
                            Профиль
                            <span className="caret"></span>
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="user-menu-list right-profile">
                        <MenuItem eventKey="1" onClick={this.createArticleClick}>Создать</MenuItem>
                        <MenuItem eventKey="2" onClick={this.allArticlesClick}>Все статьи</MenuItem>
                        <MenuItem eventKey="3" onClick={this.draftedArticlesClick}>Черновики</MenuItem>
                        <MenuItem eventKey="4" onClick={this.settingsClick}>Настройки</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="5" onClick={this.props.quit}>Выход</MenuItem>
                    </Dropdown.Menu>
                </Dropdown>
            </Nav>
        );
    }
};
