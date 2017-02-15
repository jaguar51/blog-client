import React from "react";
import {Nav, Dropdown, MenuItem} from 'react-bootstrap';
import Api from "../api/Api";

export default class UserMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profileImg: require("../../assets/img/default-avatars/avatar-01.png"),
        };
        this.api = Api.getDefault();
        this.api.account.getById(localStorage.getItem('account_id')).execute({
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
                        <MenuItem eventKey="1">Создать</MenuItem>
                        <MenuItem eventKey="2">Все статьи</MenuItem>
                        <MenuItem eventKey="3">Черновики</MenuItem>
                        <MenuItem eventKey="4">Настройки</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="5" onClick={this.props.quit}>Выход</MenuItem>
                    </Dropdown.Menu>
                </Dropdown>
                {/*<li className="dropdown">*/}
                    {/*<a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"*/}
                       {/*aria-expanded="false">*/}
                        {/*<img className="img-circle profile-img" src={this.state.profileImg}*/}
                             {/*alt=""/>*/}
                        {/*<div className="profile-name">Профиль</div>*/}
                        {/*<span className="caret"></span>*/}
                    {/*</a>*/}
                    {/*<ul className="dropdown-menu">*/}
                        {/*<li><a href="article_creation.html">Создать</a></li>*/}
                        {/*<li><a href="#">Все статьи</a></li>*/}
                        {/*<li><a href="#">Черновики</a></li>*/}
                        {/*<li><a href="personal_changes.html">Настройки</a></li>*/}
                        {/*<li role="separator" className="divider"></li>*/}
                        {/*<li onClick={this.props.quit}><a href="#">Выход</a></li>*/}
                    {/*</ul>*/}
                {/*</li>*/}
            </Nav>
        );
    }
};
