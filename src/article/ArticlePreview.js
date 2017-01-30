import React, {PropTypes} from "react";
import {browserHistory, Link} from "react-router";
import {Col} from 'react-bootstrap';
import TextTruncate from "react-text-truncate";

class ArticlePreview extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick() {
        browserHistory.push('/article');
    }

    testTitle() {
        return "Test title"
    }

    testText() {
        return "Lorem Ipsum - это текст-рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum" +
            "является стандартной  рыбой для текстов на латинице с начала XVI века. В то время некий" +
            "безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem" +
            "Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных" +
            "изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое" +
            "время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в" +
            "более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах" +
            "которых используется Lorem Ipsum."
    }

    get size() {
        if (this.props.size === "small") {
            return 3;
        } else if (this.props.size === "big") {
            return 6;
        } else if (this.props.size === "max") {
            return 12;
        } else {
            return 4;
        }
    }

    render() {
        return (
            <Col lg={this.size} md={this.size} sm={12} xs={12}>
                <div className="article">
                    <figure className="article-image is-3by2" onClick={this.handleClick}>
                        <img src={require('../../assets/img/default-article-img/default-img1.png')} alt=""/>
                    </figure>
                    <div className="article-body-preview" onClick={this.handleClick}>
                        <h2 className="article-title">
                            {this.testTitle()}
                        </h2>
                        <TextTruncate line={1} truncateText="…" text={this.testText()} className="article-content"/>
                    </div>
                    <footer className="article-info-preview author">
                        <Link to="/profile" className="author-content">
                            <img src={require('../../assets/img/default-avatars/avatar-01.png')} width="40px"
                                 height="40px" alt=""/>
                            <span> By Joe Smith</span>
                        </Link>
                        <span className="comments">42 comments</span>
                    </footer>
                </div>
            </Col>
        );
    }
}

ArticlePreview.propTypes = {
    size: PropTypes.string
};

export default ArticlePreview;
