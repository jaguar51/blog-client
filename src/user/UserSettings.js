import React from "react";
import {Link} from "react-router";
import {Row, Col, Grid, Form, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

export default class UserSettingsextends extends React.Component {
    render() {
        return (
            <div className="wrap">
                <Grid className="main">
                    <Row>
                        <Col lg={12} md={12} sm={12} xs={12}>
                            <div className="profile">
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <h3>Профиль</h3>
                                </Col>
                                <Col lg={4} md={4} sm={12} xs={12}>
                                    <img className="img-thumbnail profile-avatar" src={'/assets/img/default-avatars/avatar-01.png'} alt=""/>
                                </Col>
                                <Col lg={8} md={8} sm={12} xs={12}>
                                    <div className="col-md-9 personal-info">
                                        <Form horizontal>
                                            <Row>
                                                <FormGroup>
                                                    <Col componentClass={ControlLabel} lg={4}>
                                                        Логин:
                                                    </Col>
                                                    <Col lg={8}>
                                                        <FormControl type="text"/>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Col componentClass={ControlLabel} lg={4}>
                                                        Имя:
                                                    </Col>
                                                    <Col lg={8}>
                                                        <FormControl type="text"/>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Col componentClass={ControlLabel} lg={4}>
                                                        Фамилия:
                                                    </Col>
                                                    <Col lg={8}>
                                                        <FormControl type="text"/>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Col componentClass={ControlLabel} lg={4}>
                                                        Email:
                                                    </Col>
                                                    <Col lg={8}>
                                                        <FormControl type="email" disabled/>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Col componentClass={ControlLabel} lg={4}>
                                                        Новый пароль:
                                                    </Col>
                                                    <Col lg={8}>
                                                        <FormControl type="password"/>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Col componentClass={ControlLabel} lg={4}>
                                                        Повторите пароль:
                                                    </Col>
                                                    <Col lg={8}>
                                                        <FormControl type="password"/>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Col componentClass={ControlLabel} md={9} />
                                                    <Col md={3}>
                                                        <Button type="submit" className="settings-btn custom-button">
                                                            Сохранить
                                                        </Button>
                                                    </Col>
                                                </FormGroup>
                                            </Row>
                                        </Form>
                                    </div>
                                </Col>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
