import React from "react";
import {Nav, Dropdown, MenuItem} from 'react-bootstrap';
import {browserHistory, Link} from "react-router";
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
                        <MenuItem eventKey="1" href={'/article-creation'}>Создать</MenuItem>
                        <MenuItem eventKey="2" href={'/profile/' + this.tokenService.getId() + "/PUBLISHED"}>Все
                            статьи</MenuItem>
                        <MenuItem eventKey="3"
                                  href={'/profile/' + this.tokenService.getId() + "/DRAFT"}>Черновики</MenuItem>
                        <MenuItem eventKey="4"
                                  href={'/profile/' + this.tokenService.getId() + "/LOCKED"}>Заблокированные
                            статьи</MenuItem>
                        <MenuItem eventKey="5" href={'/settings'}>Настройки</MenuItem>
                        <MenuItem divider/>
                        <MenuItem eventKey="6" onClick={this.props.quit}>Выход</MenuItem>
                    </Dropdown.Menu>
                </Dropdown>
            </Nav>
        );
    }
};
