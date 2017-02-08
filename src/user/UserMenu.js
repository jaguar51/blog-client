import React from "react";
import {Nav} from 'react-bootstrap';
import Api from "../api/Api";

export default class UserMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profileImg: null,
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
                } else {
                    this.setState({
                        profileImg: "../../assets/img/default-avatars/avatar-01.png"
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
                <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                       aria-expanded="false">
                        <img className="img-circle profile-img" src={this.state.profileImg}
                             alt=""/>
                        <div className="profile-name">Профиль</div>
                        <span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu">
                        <li><a href="article_creation.html">Создать</a></li>
                        <li><a href="#">Все статьи</a></li>
                        <li><a href="#">Черновики</a></li>
                        <li><a href="personal_changes.html">Настройки</a></li>
                        <li role="separator" className="divider"></li>
                        <li onClick={this.props.quit}><a href="#">Выход</a></li>
                    </ul>
                </li>
            </Nav>
        );
    }
};
