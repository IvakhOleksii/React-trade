
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Container, Row, Col } from "react-bootstrap"; 
import backGroundImage2 from "../assets/imgs/png/newcars/2.jpg";
import backGroundImage3 from "../assets/imgs/png/newcars/3.jpg";
class NewCars extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newCars: [
                {
                    image: backGroundImage3,
                    title: "Lincoln Nautilus",
                    model: "2020",
                    manual: "Manual",
                    petorl: "Petrol",
                    power: "300 hp"
                },
                {
                    image: backGroundImage2,
                    title: "Ford Rapter ",
                    model: "2020",
                    manual: "Manual",
                    petorl: "Petrol",
                    power: "400 hp"
                },
                {
                    image: backGroundImage3,
                    title: "Dodge Chellenger",
                    model: "2020",
                    manual: "Manual",
                    petorl: "Petrol",
                    power: "600 hp"
                }
            ],
            isMobile: null,
        }
    }
    // componentDidMount() {
    //     window.addEventListener('resize', () => {
    //         this.setState({
    //             isMobile: window.innerWidth < 1200
    //         });
    //     }, false);
    // }
    // componentWillUnmount() {
    //     window.addEventListener('resize', () => {
    //         this.setState({
    //             isMobile: window.innerWidth < 768
    //         });
    //     }, false);

    // }
    render() {
        return (
            <div className="new-cars-section">
                <Container fluid>
                    {/* <div className={this.state.isMobile ? "container" : "container-fluid"}   > */}
                    <Row className=" default-margin new-cars-container ">
                        {this.state.newCars.map((item, index) =>
                            <Col key={index} style={{ background: `linear-gradient(rgb(0 0 0 / 19%), rgb(0 0 0 / 48%)), url(${item.image})` }} className="new-car-card-full" lg={4} md={12} sm={12}>
                                <span className="new-badge">New</span>
                                <h1>{item.title}</h1>
                                <span className="new-card-ul">
                                    <span className="new-card-list-item border-first">{item.model}</span>
                                    <span className="new-card-list-item border-right">{item.manual}</span>
                                    <span className="new-card-list-item border-right">{item.petorl}</span>
                                    <span className="new-card-list-item pl-2">{item.power}</span>
                                </span>
                            </Col>
                        )}
                    </Row>
                </Container>
                {/* </div> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(NewCars);