import React from "react";
import ReactSummernote from "react-summernote";
import TagContainer from "./TagContainer";
import request from "superagent";
import "react-summernote/dist/react-summernote.css";
import "react-summernote/lang/summernote-ru-RU";

export default class ArticleCreation extends React.Component {

    constructor(props) {
        super(props);

        this.uploadImage = this.uploadImage.bind(this);
    }

    uploadImage(files) {
        let data = new FormData();
        data.append("image", files[0]);
        request
            .post('http://localhost:8080/api/images')
            .send(data)
            .set('Authorization', 'Bearer 5e7c8a58-ca70-4709-a10f-9bccca386527')
            .end(function(err, res){
                if (err || !res.ok) {
                    console.log(res.body)
                } else {
                    ReactSummernote.insertImage("http://localhost:8080/api/images/file/" + res.body.data.result.originalPath);
                }
            });
    }

    render() {
        return (
            <div className="wrap">
                <div className="container main">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="profile">
                                <h3>Создание статьи</h3>
                                <div className="form-group">
                                    <label htmlFor="header">Заголовок</label>
                                    <input type="text" className="form-control" id="header"
                                           placeholder="Введите заголовок"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="text">Текст</label>
                                    <ReactSummernote
                                        options={{
                                            toolbar: [
                                                ["style", ["style"]],
                                                ["font", ["bold", "italic", "underline", "clear"]],
                                                ["fontsize", ["fontsize"]],
                                                ["para", ["ul", "ol", "paragraph"]],
                                                ["insert", ["link", "picture", "video", "hr"]],
                                                ['view', ['fullscreen', 'codeview']],
                                            ],
                                            lang: 'ru-RU',
                                            height: 400,
                                            minHeight: 150,
                                            maxHeight: null,
                                        }}
                                        onImageUpload={this.uploadImage}
                                    />
                                </div>
                                <TagContainer />
                                <button type="submit" className="btn btn-default custom-button">Отправить</button>
                                <button type="submit" className="btn btn-default custom-changes-btn">Сохранить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
