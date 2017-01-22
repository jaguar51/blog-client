import React from "react";
import ReactSummernote from "react-summernote";
import request from "es6-request";
import TagContainer from "./TagContainer";
import {Api} from "../api/Api";

import 'react-summernote/dist/react-summernote.css';
import 'react-summernote/lang/summernote-ru-RU';

export default class ArticleCreation extends React.Component {

    constructor(props) {
        super(props);

        this.uploadImage = this.uploadImage.bind(this);
    }

    uploadImage(files) {
        // var data = new FormData();
        // data.append("image", files);
        // request.post("http://localhost:8080/api/images")
        //     .options(data)
        //     .header("Authorization", "Bearer 4e7e1b12-cd43-4ae7-bf3f-fa9c1ef30626")
        //     .then((body) => {
        //         ReactSummernote.insertImage("http://localhost:8080/api/images/file/" + body.data.result.originalPath, $image => {
        //             $image.attr("alt", image.name);
        //         });
        //     });
        console.log(files[0]);
        let data = new FormData();
        data.append("image", files[0]);
        console.log(data);
        $.ajax({
            data: data,
            type: "POST",
            url: "http://localhost:8080/api/images",
            headers: { 
                Authorization : "Bearer 4e7e1b12-cd43-4ae7-bf3f-fa9c1ef30626",
            },
            cache: false,
            contentType: false,
            processData: false,
            success: function(json) {
                // var img = $('<img>').attr('src', 'http://localhost:8080/api/images/file/' + json.data.result.originalPath);
                // $('#text').summernote("insertNode", img[0]);
                ReactSummernote.insertImage("http://localhost:8080/api/images/file/" + json.data.result.originalPath, $image => {
                    $image.attr("alt", image.name);
                });
            },
            error: function(data) {
                console.log(data);
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
                                                ["insert", ["link", "picture", "video" , "hr"]],
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
