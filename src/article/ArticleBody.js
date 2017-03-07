import React from "react";
import {Link} from "react-router";

export default class ArticleBody extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="article-form">
                <div className="article-body">
                    <h1>
                        {this.props.article.title}
                    </h1>
                    <hr/>
                    <div dangerouslySetInnerHTML={{__html: this.props.article.text}}/>
                    <footer>
                        <span>Теги: </span>
                        <li className="addedTag"><span>Peppa</span></li>
                        <li className="addedTag"><span>test</span></li>
                    </footer>
                    <footer className="article-info author">
                        <Link className="author-content" to="/profile">
                            <img src={'/assets/img/default-avatars/avatar-01.png'} width="40px" height="40px" alt=""/>
                            <span> By Joe Smith</span>
                        </Link>
                        <span className="comments">1 Aug at 4:20 pm</span>
                    </footer>
                </div>
            </div>
        );
    }
}
