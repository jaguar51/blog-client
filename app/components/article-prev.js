import React from "react";
import {Link} from "react-router";
import TextTruncate from "react-text-truncate";

const ArticlePrev = React.createClass({
    testTitle: function () {
        return "Test title"
    },

    testText: function () {
        return "Lorem Ipsum - это текст-рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum" +
            "является стандартной  рыбой для текстов на латинице с начала XVI века. В то время некий" +
            "безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem" +
            "Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных" +
            "изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое" +
            "время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в" +
            "более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах" +
            "которых используется Lorem Ipsum."
    },

    render: function () {
        return (
            <div>
                <Link to="/article">
                    <div className="article">
                        <figure className="article-image is-3by2">
                            <img src="app/assets/img/default-article-img/default-img1.png" alt=""/>
                        </figure>
                        <div className="article-body">
                            <h2 className="article-title">
                                {this.testTitle()}
                            </h2>
                            <TextTruncate line={2} truncateText="…" text={this.testText()} className="article-content"/>
                            <footer className="article-info author">
                                <Link to="/profile" className="author-content">
                                    <img src="app/assets/img/default-avatars/avatar-05.png" width="40px" height="40px"
                                         alt=""/>
                                    <span> By Joe Smith</span>
                                </Link>
                                <span className="comments">42 comments</span>
                            </footer>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
});

export default ArticlePrev;