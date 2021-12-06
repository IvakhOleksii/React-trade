
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Container, Row, Col } from "react-bootstrap";
import NavBar from '../../views/_partials/navbar';
import { Link } from "react-router-dom"

class Hero extends Component {
    render() {
        return (
            <div className="hero-section">
                <NavBar {...this.props} />
                <Container>
                    <Row>
                        <Col className="hero-text-container" lg={5} md={7} sm={12}>
                            <h1>TELL US WHAT    YOU WANT TO DO</h1>
                            <p>Whether your trading-in or selling let us help you
                                    get the most value from your current vehicle.</p>
                            <div className="hero-btns-container">
                                <Link className="btn-trade" to="/trade-your-car">Trade your car</Link>
                                <Link className="btn-sell" to="/sell-your-car">Sell your car    </Link>
                            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Hero);