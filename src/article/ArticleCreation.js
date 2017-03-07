import React from "react";
import ReactSummernote from "react-summernote";
import ReactDOM from "react-dom";
import TagContainer from "./TagContainer";
import {Grid, Row, Col, Button, FormGroup, ControlLabel, FormControl, Overlay, Popover} from 'react-bootstrap';
import Api from "../api/Api";
import "react-summernote/lang/summernote-ru-RU";

export default class ArticleCreation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            target: this.refs.title,
            message: "",
            show: false,
            title: "",
            text: "",
            images: [],
            tagList: [],
        };

        this.api = Api.getDefault();

        this.uploadImage = this.uploadImage.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onChangeTagList = this.onChangeTagList.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.sendClick = this.sendClick.bind(this);
        this.sendArticle = this.sendArticle.bind(this);
        this.draftClick = this.draftClick.bind(this);
        this.validateArticle = this.validateArticle.bind(this);
    }

    uploadImage(files) {
        this.api.image.upload(files[0]).execute({
            success: ((body) => {
                ReactSummernote.insertImage(this.api.image.getUrl(body.data.result.originalPath), $image => {
                    $image.attr("id", body.data.result.id);
                });

                this.setState({
                    images: this.state.images.concat([body.data.result])
                });
            }),
            error: ((body) => {
                console.log('error');
                console.log(body);
            })
        });
    }

    onChangeText(text) {
        this.setState({
            text: text,
        });
        this.state.images.map((image, index) => {
            if (document.getElementById(image.id) == null) {
                this.api.image.remove(image.id).execute({
                    success: (() => {
                        let newImages = this.state.images;
                        newImages.splice(index, 1);
                        this.setState({
                            images: newImages
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

    sendClick() {
        this.sendArticle("PUBLISHED");
    }

    draftClick() {
        this.sendArticle("DRAFT");
    }

    isTitleValid() {
        return this.state.title !== "" && this.state.title.length > 3 && this.state.title.length < 256
    }

    validateArticle() {
        if (!this.isTitleValid()) {
            return {
                show: true,
                message: "Заголовок должен быть от 4 до 255 символов.",
                target: this.refs.title
            }
        }

        if (this.state.text === "") {
            return {
                show: true,
                message: "Текст статьи не может быть пустым.",
                target: this.refs.text
            }
        }

        return null;
    }

    sendArticle(status) {
        let validationRes = this.validateArticle();
        if (validationRes) {
            this.setState(validationRes);
        } else {
            let data = {
                title: this.state.title,
                text: this.state.text,
                status: status,
                tags: this.state.tagList,
                images: this.state.images,
            };
            this.api.article.create(data).execute({
                success: ((body) => {
                    console.log('success');
                    console.log(body);
                }),
                error: ((body) => {
                    console.log('error');
                    console.log(body);
                })
            });
        }
    }

    onChangeTitle(element) {
        this.setState({
            title: element.target.value,
        });
    }

    render() {
        return (
            <div className="wrap">
                <Grid className="main">
                    <Row>
                        <Col lg={12} md={12} sm={12} xs={12}>
                            <div className="profile">
                                <h3>Создание статьи</h3>
                                <FormGroup>
                                    <ControlLabel>Заголовок</ControlLabel>
                                    <FormControl placeholder="Введите заголовок" onChange={this.onChangeTitle}
                                                 value={this.state.title} ref="title"/>
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="text" ref="text">Текст</label>
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
                                </FormGroup>
                                <TagContainer onChange={this.onChangeTagList}/>
                                <Button className="custom-button" onClick={this.sendClick}>Отправить</Button>
                                <Button className="custom-changes-btn" onClick={this.draftClick}>Сохранить</Button>

                                <Overlay
                                    show={this.state.show}
                                    onHide={() => this.setState({show: false})}
                                    placement="top"
                                    container={this}
                                    target={() => ReactDOM.findDOMNode(this.state.target)}
                                >
                                    <Popover id="popover-positioned-scrolling-top">
                                        {this.state.message}
                                    </Popover>
                                </Overlay>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
