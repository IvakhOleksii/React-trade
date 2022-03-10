import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Image } from "react-bootstrap";
import Customer1 from "../assets/imgs/png/customers/1.jpg";
import Customer2 from "../assets/imgs/png/customers/2.jpg";
import Customer3 from "../assets/imgs/png/customers/3.jpg";
import Customer4 from "../assets/imgs/png/customers/4.jpg";
import Customer5 from "../assets/imgs/png/customers/5.jpg";
import Customer6 from "../assets/imgs/png/customers/6.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

class CustomerReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [
        {
          image: Customer1,
          message:
            "Tenetur laborum enim in et id consectetur est ratione ratione do inventore consequatur ad",
          name: "Virginia Robertson",
          designation: "Customer",
        },
        {
          image: Customer2,
          message:
            "Consequatur aut quasi fuga Repellendus Minima culpa autem dolor voluptate sapiente vel placeat fugiat",
          name: "Destiny Anderson",
          designation: "Customer",
        },
        {
          image: Customer3,
          message:
            "Eiusmod voluptate magnam omnis eiusmod libero mollitia in Nam esse rerum non fugiat voluptatem exercitation sint est qui",
          name: "Walter Merrill",
          designation: "Customer",
        },
        {
          image: Customer4,
          message:
            "Quo labore dolore ratione quis dolorem recusandae Esse aliquip dolore perferendis corrupti sint aut",
          name: "Ronan Serrano",
          designation: "Customer",
        },
        {
          image: Customer5,
          message:
            "Aute ea sit facere eum reprehenderit quas dolores consectetur eos quasi laborum Vitae",
          name: "Yuli Kramer",
          designation: "Customer",
        },
        {
          image: Customer6,
          message:
            "Accusamus quia est nemo veniam voluptatem quam assumenda quis nostrud officiis vel eius dolorem aliqua",
          name: "Chelsea Stewart",
          designation: "Customer",
        },
      ],
    };
  }
  render() {
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 3, // optional, default to 1.
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2, // optional, default to 1.
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
      },
    };
    return (
      <div className="customer-review-section">
        <Container>
          <Row>
            <Col className="how-we-work-text-area" lg={12} md={12} sm={12}>
              <h1>
                {" "}
                Customer{" "}
                <span className="d-inline trader-sell-text">Review </span>{" "}
              </h1>
            </Col>
            <Col className="mt-5" lg={12} md={12} sm={12}>
              <Row>
                <Carousel
                  swipeable={true}
                  draggable={true}
                  showDots={false}
                  responsive={responsive}
                  ssr={true} // means to render carousel on server-side.
                  infinite={true}
                  // autoPlay={this.props.deviceType !== "mobile" ? true : false}
                  autoPlay={false}
                  autoPlaySpeed={1000}
                  keyBoardControl={true}
                  customTransition="all .5"
                  transitionDuration={500}
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  deviceType={this.props.deviceType}
                  dotListClass="custom-dot-list-style"
                  itemClass="carousel-item-padding-40-px"
                >
                  {this.state.reviews?.map((item, index) => (
                    <div
                      key={index}
                      className="customer-review-card customer-review-card-margin"
                    >
                      <div
                        className={
                          (index + 1) % 2 === 0
                            ? "customer-review-message-container customer-secondary-color-card"
                            : "customer-review-message-container customer-primary-color-card"
                        }
                      >
                        <p>{item.message}</p>
                      </div>
                      <div className=" d-flex justify-content-center ">
                        <span className="d-flex justify-content-center flex-column customer-review-name-container">
                          <h4>{item.name}</h4>
                          <h6>{item.designation}</h6>
                        </span>
                        <Image
                          src={item.image}
                          className="customer-avatar   "
                          alt="customer-"
                          roundedCircle
                        />
                      </div>
                    </div>
                  ))}
                </Carousel>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    vouched: state.app.vouched,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomerReview);
