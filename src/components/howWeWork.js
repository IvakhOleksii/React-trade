
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Container, Row, Col } from "react-bootstrap"; 
import Step1 from "../assets/imgs/png/howWeWorkSteps/1.png";
import Step2 from "../assets/imgs/png/howWeWorkSteps/2.png";
import Step3 from "../assets/imgs/png/howWeWorkSteps/3.png";
import Step4 from "../assets/imgs/png/howWeWorkSteps/4.png";
class HowWeWork extends Component {
    render() {
        return (
            <div className="how-we-work-section">
                <Container>
                    <Row>
                        <Col className="how-we-work-text-area" lg={12} md={12} sm={12}>
                            <h6>Helps you to find perfect car</h6>
                            <h1>How We <span className="d-inline trader-sell-text">Work  </span>   </h1>
                        </Col>
                        <Col className="how-we-work-cards-area" lg={12} md={12} sm={12}>
                            <Row>
                                <Col className="how-we-work-card" lg={3} md={6} sm={12}>
                                    <img src={Step1} alt="how-itwork" />
                                    <h1>Search In the Acution</h1>
                                    <p>Search In the acution section. which is in the dashboard area you can access by siging up</p>
                                </Col>
                                <Col className="how-we-work-card" lg={3} md={6} sm={12}>
                                    <img src={Step2} alt="how-itwork" />
                                    <h1>Choose The Car You Like    </h1>
                                    <p>In the Acution section,go to live auction, and choose your vechile what you want to buy</p>
                                </Col>
                                <Col className="how-we-work-card" lg={3} md={6} sm={12}>
                                    <img src={Step3} alt="how-itwork" />
                                    <h1>Bid in Auction   </h1>
                                    <p>Bid for vechile.Bid result will be announce after 24 hours of acution ended , </p>
                                </Col>
                                <Col className="how-we-work-card" lg={3} md={6} sm={12}>
                                    <img src={Step4} alt="how-itwork" />
                                    <h1>Get Approved & Drive    </h1>
                                    <p>Vechile owner and admin approval you can win the auction and enjoy drive </p>
                                </Col>
                            </Row>
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
export default connect(mapStateToProps, mapDispatchToProps)(HowWeWork);