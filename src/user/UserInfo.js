import React from "react";
import Api from "../api/Api";

export default class UserInfo extends React.Component {

    constructor(props) {
        super(props);
        this.api = Api.getDefault();
    }

    getUserAvatar() {
        if (this.props.info.avatar !== null) {
            return this.api.avatar.getUrl(this.props.info.avatar.originalPath);
        } else {
            return '/assets/img/default-avatars/avatar-01.png';
        }
    }

    render() {
        return (
            <div>
                <img className="profile-avatar" src={this.getUserAvatar()} alt=""/>
                <div>
                    <h2 className="login">{this.props.info.login}</h2>
                    <span>Имя: {this.props.info.name}</span><br/>
                    <span>Фамилия: {this.props.info.surname}</span>
                </div>
            </div>
        );
    }
};