
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom" 
class GetRegistered extends Component {
    render() {
        return (
            <div className="get-registered-section">
                <Container>
                    <Row>
                        <Col className="get-registered-container" lg={12} md={12} sm={12}>
                            <h1>Buy Sell Your Car Quickly & Easily with TraderSell      </h1>
                            <p>You get the best trade-in value or the best offer selling your vehicle and dealer you want to do business with.
                               </p>
                            <Link to="/register">Get Registered</Link>
                        </Col>
                    </Row>
                </Container>
            </div>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        vouched: state.app.vouched
    };
};
const mapDispatchToProps = (dispatch) => {
    return {

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(GetRegistered);