import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Container, Row, Col, Form, Button , Spinner } from "react-bootstrap"; 
import axios from "axios"
import APIConfig from '../../helpers/api/config';
import NavBar from "../../views/_partials/navbar"
import { toast } from 'react-toastify';
import { ReactVideo } from "reactjs-media";
// import { YoutubePlayer } from "reactjs-media";
import poster from "../../assets/imgs/png/newcars/3.jpg"

class AboutUsHero extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="contact-hero-section">
                <NavBar {...this.props}  showSvg={true} />
                <Container>
                    <Row className="d-flex justify-content-center align-items-center section-contact-t-b-padding">
                        <Col className="text-area p-3 mb-2" lg={12} md={12} sm={12}>
                            <h2>About us </h2>
                            <p>Whether your trading-in or selling let us help you
                                get the most value from your current vehicle. </p>
                                <p>Whether your trading-in or selling let us help you
                                get the most value from your current vehicle. </p>

                        </Col>
                        <Col lg={8} md={12} sm={12} className="pt-5">
                                <div>
                                   <h2>Trade Your Car</h2>
                                   <p>
                                       Whether your trading-in or selling let us help you get the most 
                                       value from your current vehicle. Our unique process puts you in 
                                       control and allows you to get competitive quotes from a variety 
                                       of dealers. You select the geographical location that you want to 
                                       do business in. Receive the best quote without even going to the showroom. 
                                       You get the best trade-in value or the best offer selling your vehicle and 
                                       dealer you want to do business with.
                                   </p>
                                   <h2 className="pt-5">I Want To Trade My Car</h2>
                                   <p>
                                       There are many ways on the Internet to value your trade-in but let us face it,
                                        regardless of how much research you do those numbers change when in the 
                                        showroom and usually not in your favor. Our unique process makes dealers 
                                        compete which means your current vehicle is worth more. In a few easy steps 
                                        TraderSell will put you in the driver’s seat to higher values.
                                    </p>
                                    <h2 className="pt-5">I Want To Sell My Car</h2>
                                    <p>Skip the hassle of selling to the public and sell to the dealer. 
                                        Let TraderSell show you how to get top dollar for your current vehicle. 
                                        In a few easy steps you will have dealers competing for your highly desirable vehicle
                                    </p>
                                        
                                </div>
                        </Col>
                    </Row>
                </Container>
            </div >

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
export default connect(mapStateToProps, mapDispatchToProps)(AboutUsHero);