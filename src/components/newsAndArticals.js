
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Container, Row, Col } from "react-bootstrap";
import Artical1 from "../assets/imgs/png/newsAndArticale/sdsd.png";
import Artical2 from "../assets/imgs/png/newsAndArticale/wed.png";
import Artical3 from "../assets/imgs/png/newsAndArticale/asqq.png";
import Chat from "../assets/imgs/png/newsAndArticale/chat.png";
class NewsAndArticals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newArticales: [
                {
                    image: Artical1,
                    title: "Top 10 most fuel-efficient cars  on the road 2019",
                    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr,    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, ",
                    date: "25 Dec 2018",
                    postedBy: "By Admin"
                },
                {
                    image: Artical2,
                    title: "Top 10 most fuel-efficient cars  on the road 2019",
                    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr,    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, ",
                    date: "25 Dec 2018",
                    postedBy: "By Admin"
                },
                {
                    image: Artical3,
                    title: "Top 10 most fuel-efficient cars  on the road 2019",
                    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr,    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, ",
                    date: "25 Dec 2018",
                    postedBy: "By Admin"
                },
            ]
        }
    }
    render() {
        return (
            <>
            
            <div className="news-and-articals-section">
                <Container>
                    <Row>
                        <Col className="how-we-work-text-area" lg={12} md={12} sm={12}>
                            <h6>Helps you to find perfect car</h6>
                            <h1>
                                News &
                    <h1 className="d-inline trader-sell-text pl-2">Articles</h1>{" "}
                            </h1>
                        </Col>
                        <Col className="  news-and-articals-section-cards-container " lg={12} md={12} sm={12}>

                            <Row>
                                {this.state.newArticales?.map((item, index) =>
                                    <Col className="news-and-articals-section-card" lg={4} md={6} sm={12}>
                                        <div className=' d-flex flex-column '>
                                            <Image src={item.image} className="artical-image" alt="artical" thumbnail />
                                            <span className='mt-4'>
                                                <span className="date pr-2 ">{item.date}</span>
                                                <span className="posted-by pl-2 ">{item.postedBy}    </span>
                                            </span>
                                            <h3>{item.title}</h3>
                                            <p>{item.description}</p>
                                            <span className="d-flex justify-content-between  artical-card-footer  ">
                                                <span  >Read Articles</span>
                                                <span> <Image src={Chat} className="artical-image" alt="artical" thumbnail /> 32</span>
                                            </span>
                                        </div>
                                    </Col>
                                )}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
</>
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
export default connect(mapStateToProps, mapDispatchToProps)(NewsAndArticals);