import React from "react";
import {Row, Grid, Col} from 'react-bootstrap';

export default class Field extends React.Component {

    constructor(props) {
        super(props);
    }




    render() {
        return (
            <div className="wrap">
                <Grid className="main">
                    <Row>
                        <Col lg={12} md={12} sm={12} xs={12}>
                            <div className="profile text-center">
                                <h2>
                                    {this.props.text}
                                </h2>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}