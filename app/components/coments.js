import React from "react";
import {Link} from "react-router";

const Coments = React.createClass({
    render: function () {
        return (
            <div>
                <div className="article-form">
                    <div className="article-body">
                        <h3>
                            Комментарии
                        </h3>
                        <hr />
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu
                            pellentesque tortor vestibulum ut. Maecenas non massa sem.
                        </p>
                        <footer className="article-info author">
                            <a className="author-content" href="personal_page.html">
                                <img src="app/assets/img/default-avatars/avatar-01.png" width="40px" height="40px"
                                     alt=""/>
                                <span> By Joe Smith</span>
                            </a>
                            <span className="comments">1 Aug at 4:20 pm</span>
                        </footer>

                        <hr />
                        <p>
                            Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem.
                        </p>
                        <footer className="article-info author">
                            <a className="author-content" href="personal_page.html">
                                <img src="app/assets/img/default-avatars/avatar-01.png" width="40px" height="40px"
                                     alt=""/>
                                <span> By Joe Smith</span>
                            </a>
                            <span className="comments">1 Aug at 4:20 pm</span>
                        </footer>
                    </div>
                </div>

                <div className="article-form">
                    <div className="article-body">
                        <div className="form-group">
                            <label htmlFor="text">Оставить комментарий</label>
                            <textarea className="form-control vresize" name="text" id="text"
                                      placeholder="Введите текст"/>
                        </div>
                        <button type="submit" className="btn btn-default custom-button">Отправить</button>
                    </div>
                </div>
            </div>
        );
    }
});

export default Coments;