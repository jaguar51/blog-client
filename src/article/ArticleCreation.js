import React from "react";
import ReactSummernote from "react-summernote";
import TagContainer from "./TagContainer";
import Api from "../api/Api";
import "react-summernote/dist/react-summernote.css";
import "react-summernote/lang/summernote-ru-RU";

export default class ArticleCreation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imagesId: [],
            tagList: [],
        };

        this.uploadImage = this.uploadImage.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onChangeTagList = this.onChangeTagList.bind(this);
    }

    uploadImage(files) {
        let api = Api.getDefault();
        api.image.upload(files[0]).execute({
            success: ((body) => {
                ReactSummernote.insertImage(api.image.getUrl(body.data.result.originalPath), $image => {
                    $image.attr("id", body.data.result.id);});

                this.setState({
                    imagesId: this.state.imagesId.concat([body.data.result.id])
                });
            }),
            error: ((body) => {
                console.log('error');
                console.log(body);
            })
        });
    }

    onChangeText(text) {
        let api = Api.getDefault();
        this.state.imagesId.map((id, index) => {
            if (document.getElementById(id) == null) {
                api.image.remove(id).execute({
                    success: (() => {
                        let newImagesId = this.state.imagesId;
                        newImagesId.splice(index, 1);
                        this.setState({
                            imagesId: newImagesId
                        });
                    }),
                    error: ((body) => {
                        console.log('error');
                        console.log(body);
                    })
                });
            }
        });
    }

    onChangeTagList(tagList) {
        this.setState({
            tagList: tagList
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
                                        onChange={this.onChangeText}
                                    />
                                </div>
                                <TagContainer onChange={this.onChangeTagList}/>
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
