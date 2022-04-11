import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import NavBar from "../../views/_partials/navbar";
import car3 from "../../assets/imgs/360/car3.jpeg";
import car4 from "../../assets/imgs/360/car4.jpg";
import car5 from "../../assets/imgs/360/car8.jpg";
import car6 from "../../assets/imgs/360/car7.jpg";
import car7 from "../../assets/imgs/360/car6.jpg";
import { Eye } from "react-feather";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ImageViewer360 from "../imageViewer360";
import "react-image-gallery/styles/css/image-gallery.css";
import axios from "axios";
import APIConfig from "../../helpers/api/config";
import { toast } from "react-toastify";
import ChatModal from "../chatModal";

class AuctionDetailHero extends Component {
  _isMounted = false;
  s;
  constructor(props) {
    super(props);
    this.state = {
      acution_detail: null || this.props?.acution_detail,
      images: [
        {
          original: car3,
          thumbnail: car3,
        },
        {
          original: car4,
          thumbnail: car4,
        },
        {
          original: car5,
          thumbnail: car5,
        },
      ],

      images360: [
        { image: car7 },
        { image: car3 },
        { image: car4 },
        { image: car5 },
        { image: car6 },
      ],
      loading: false,
      displayImage: "",
      showModal: false,
      openModal: false,
      bid_amount: Number,

      showChatModal: false,
    };
  }
  handleShow = () => {
    this.setState({ openModal: true });
  };

  onCloseModal = () => {
    this.setState({ openModal: false });
  };
  handlePopup = () => {
    this.setState({ showModal: !this.state.showModal });
  };
  handle360View = (images) => {
    this.setState({ images: images });
    this.handlePopup();
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    this._isMounted = true;
    this.setState({ loading: true });
    var FormData = require("form-data");
    var data = new FormData();
    try {
      data.append("bid_amount", this.state.bid_amount);
      data.append("dealer_id", this.props?.user?.id);
      data.append("item_id", this.props?.acution_detail?.id);
      data.append("owner_id", this.props?.acution_detail?.user_id);
      const response = await axios(APIConfig("post", "/addbid", data));
      if (response.status === 200) {
        this.setState({ loading: false });
        this.props.history.push("/dashboard");
        toast.success("Your Bid has been done", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1800,
        });
      } else if (response.status === 204) {
        this.setState({ loading: false });
        toast.success("Your have already bid on this auction", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1800,
        });
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      toast.error("Please try again ", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1800,
      });
      this.setState({ loading: false });
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }
  handleChange = (e) => {
    this.setState({ bid_amount: e.target.value });
  };
  handleRedirectMessage = () => {
    this.props.handeChangeSidebarItem("messaging");
    this.props.history.push("/dashboard");
  };
  handleBack = () => {
    this.props.history.push("/dashboard");
  };
  render() {
    return (
      <div className="contact-hero-section">
        <NavBar {...this.props} />
        <Container className="Auction-Detail-Hero-Container">
          <Row className="d-flex justify-content-center align-items-center section-contact-t-b-padding">
            <Col lg={11} md={12} sm={12}>
              <div className=" detail-car-container  ">
                <Row>
                  <Col className=" dim-dark-bg p-5" lg={9} md={12} sm={12}>
                    <ImageGallery items={this.state?.acution_detail?.images} />
                  </Col>
                  <Col lg={3} md={12} sm={12}>
                    <button
                      className="detail-car-price mt-20 btn-detail w-100"
                      onClick={() => {
                        this.setState({
                          showChatModal: !this.state.showChatModal,
                        });
                      }}
                    >
                      {" "}
                      Send Message
                    </button>
                    <button
                      className="detail-car-price mt-20 btn-detail w-100"
                      onClick={() =>
                        this.handle360View(
                          this.state?.acution_detail?.images360
                        )
                      }
                    >
                      {" "}
                      360° View
                      <Eye
                        className="primary"
                        size={20}
                        data-tour="toggle-icon"
                      />{" "}
                    </button>
                    <button
                      className="detail-car-price mt-20 btn-detail w-100"
                      onClick={this.handleShow}
                    >
                      {" "}
                      Bid Now{" "}
                    </button>
                    <button
                      className="detail-car-price mt-20 btn-detail w-100"
                      onClick={this.handleBack}
                    >
                      {" "}
                      Back{" "}
                    </button>
                  </Col>

                  <Col className=" dim-dark-bg p-5 mt-2" lg={9} md={12} sm={12}>
                    <Row>
                      <Col className="mb-4" lg={12} md={12} sm={12}>
                        <h5 className="car-list-title-simple">
                          Vehicle Specification
                        </h5>
                      </Col>
                      <Col className=" details-info-container  " lg={4}>
                        <span className="detail-list__title"> VIN: </span>
                        <span className="card-list__info_Auction">
                          {this.state?.acution_detail?.vin}
                        </span>
                      </Col>
                      <Col className=" details-info-container" lg={4}>
                        <span className="detail-list__title">Drivetrain: </span>
                        <span className="card-list__info_Auction">
                          {this.state?.acution_detail?.drivetrain}{" "}
                        </span>
                      </Col>
                      <Col className=" details-info-container" lg={4}>
                        <span className="detail-list__title">Engine: </span>
                        <span className="card-list__info_Auction">
                          {this.state?.acution_detail?.engine}{" "}
                        </span>
                      </Col>
                      <Col className=" details-info-container" lg={4}>
                        <span className="detail-list__title">Year: </span>
                        <span className="card-list__info_Auction">
                          {this.state?.acution_detail?.year}{" "}
                        </span>
                      </Col>
                      <Col className=" details-info-container" lg={4}>
                        <span className="detail-list__title">Make: </span>
                        <span className="card-list__info_Auction">
                          {this.state?.acution_detail?.make}{" "}
                        </span>
                      </Col>
                      <Col className=" details-info-container" lg={4}>
                        <span className="detail-list__title">Model: </span>
                        <span className="card-list__info_Auction">
                          {this.state?.acution_detail?.model}{" "}
                        </span>
                      </Col>

                      <Col className=" details-info-container" lg={4}>
                        <span className="detail-list__title">State: </span>
                        <span className="card-list__info_Auction">
                          {this.state?.acution_detail?.state}{" "}
                        </span>
                      </Col>
                      <Col className=" details-info-container" lg={4}>
                        <span className="detail-list__title">City: </span>
                        <span className="card-list__info_Auction">
                          {this.state?.acution_detail?.city}{" "}
                        </span>
                      </Col>
                      <Col className=" details-info-container" lg={4}>
                        <span className="detail-list__title">Zip Code: </span>
                        <span className="card-list__info_Auction">
                          {this.state?.acution_detail?.zip_code}{" "}
                        </span>
                      </Col>

                      <Col lg={12}>
                        <hr className="m-3"></hr>
                      </Col>
                      <Col className=" details-info-container" lg={4}>
                        <span className="detail-list__title">Phone: </span>
                        <span className="card-list__info_Auction">
                          {this.state?.acution_detail?.phone}{" "}
                        </span>
                      </Col>

                      <Col className=" details-info-container" lg={4}>
                        <span className="detail-list__title">Odometer: </span>
                        <span className="card-list__info_Auction">
                          {this.state?.acution_detail?.odometer}{" "}
                        </span>
                      </Col>
                      <Col className=" details-info-container" lg={4}>
                        <span className="detail-list__title">
                          Transmission:{" "}
                        </span>
                        <span className="card-list__info_Auction">
                          {this.state?.acution_detail?.transmission}{" "}
                        </span>
                      </Col>
                      <Col className=" details-info-container" lg={4}>
                        <span className="detail-list__title">Fuel-Type: </span>
                        <span className="card-list__info_Auction">
                          {this.state?.acution_detail?.fuel_type}{" "}
                        </span>
                      </Col>
                      <Col className=" details-info-container" lg={4}>
                        <span className="detail-list__title">Body-Type: </span>
                        <span className="card-list__info_Auction">
                          {this.state?.acution_detail?.body_type}{" "}
                        </span>
                      </Col>
                      <Col className=" details-info-container" lg={4}>
                        <span className="detail-list__title">Mileage: </span>
                        <span className="card-list__info_Auction">
                          {this.state?.acution_detail?.mileage}{" "}
                        </span>
                      </Col>

                      <Col lg={12}>
                        <hr className="m-3"></hr>
                      </Col>

                      <Col className=" details-info-container" lg={4}>
                        <span className="detail-list__title">Condition: </span>
                        <span className="card-list__info_Auction">
                          {this.state?.acution_detail?.condition}{" "}
                        </span>
                      </Col>
                      <Col className=" details-info-container" lg={4}>
                        <span className="detail-list__title">
                          Exterior Color:
                        </span>
                        <span className="card-list__info_Auction">
                          {this.state?.acution_detail?.exterior_color}
                        </span>
                      </Col>
                      <Col lg={12}>
                        <hr className="m-3"></hr>
                      </Col>

                      <Col className=" details-info-container" lg={4}>
                        <span className="detail-list__title">
                          Car Keys:{""}
                        </span>
                        <span className="card-list__info_Auction">
                          {" "}
                          {this.state?.acution_detail?.car_keys}{" "}
                        </span>
                      </Col>
                      <Col lg={12}>
                        <hr className="m-3"></hr>
                      </Col>

                      <Col className=" details-info-container" lg={4}>
                        <span className="detail-list__title">Make: </span>
                        <span className="card-list__info_Auction">
                          {this.state?.acution_detail?.make}{" "}
                        </span>
                      </Col>

                      <Col lg={12}>
                        <hr className="m-3"></hr>
                      </Col>

                      <Col className=" details-info-container" lg={4}>
                        <span className="detail-list__title">
                          Hvac Not Working:{""}
                        </span>
                        <span className="card-list__info_Auction">
                          {" "}
                          {this.state?.acution_detail?.hvac_not_working}{" "}
                        </span>
                      </Col>
                      <Col className=" details-info-container" lg={4}>
                        <span className="detail-list__title">
                          Leather Seats:{""}
                        </span>
                        <span className="card-list__info_Auction">
                          {" "}
                          {
                            this.state?.acution_detail
                              ?.leather_Or_Leather_type_seats
                          }{" "}
                        </span>
                      </Col>
                      <Col className=" details-info-container" lg={4}>
                        <span className="detail-list__title">Model:{""}</span>
                        <span className="card-list__info_Auction">
                          {" "}
                          {this.state?.acution_detail?.model}{" "}
                        </span>
                      </Col>
                      <Col className=" details-info-container" lg={4}>
                        <span className="detail-list__title">
                          Area/Radius:{""}
                        </span>
                        <span className="card-list__info_Auction">
                          {" "}
                          {this.state?.acution_detail?.radius}
                        </span>
                      </Col>

                      <Col className=" details-info-container" lg={4}>
                        <span className="detail-list__title">
                          Loan or Lease on Car:{""}
                        </span>
                        <span className="card-list__info_Auction">
                          {" "}
                          {this.state?.acution_detail?.loan_or_lease_on_car}
                        </span>
                      </Col>
                      <Col className=" details-info-container" lg={4}>
                        <span className="detail-list__title">
                          Aftermarket Stereo Equipment :{""}
                        </span>
                        <span className="card-list__info_Auction">
                          {" "}
                          {
                            this.state?.acution_detail
                              ?.aftermarket_stereo_equipment
                          }{" "}
                        </span>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          <Modal
            isOpen={this.state.openModal}
            toggle={this.onCloseModal}
            className="bid-modal"
          >
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <div
                className="bid-amount modal-bid-header"
                style={{ backgroundColor: "white" }}
              >
                <h3 style={{ color: "black" }}>Bid Amount</h3>
              </div>
              <ModalBody className="padding dim-dark">
                <label style={{ color: "black" }}>
                  <h4> Bid Amount </h4>
                </label>
                <input
                  value={this.state.bid_amount}
                  onChange={(e) => this.handleChange(e)}
                  required
                  type="number"
                  placeholder="$"
                  className="w-100 bid-input"
                />
              </ModalBody>
              <ModalFooter
                style={{ backgroundColor: "white" }}
                className="d-flex justify-content-between"
              >
                {!this.state.loading ? (
                  <React.Fragment>
                    <button type="submit" className="bid-btn">
                      {" "}
                      Bid{" "}
                    </button>
                    <button onClick={this.onCloseModal} className="bid-btn">
                      Cancel
                    </button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <button type="submit" className="bid-btn">
                      <Spinner
                        animation="grow"
                        variant="light"
                        role="status"
                      ></Spinner>
                    </button>
                    <button onClick={this.onCloseModal} className="bid-btn">
                      <Spinner
                        animation="grow"
                        variant="light"
                        role="status"
                      ></Spinner>
                    </button>
                  </React.Fragment>
                )}
              </ModalFooter>
            </form>
          </Modal>

          {/* pop for 360 */}
          <Modal
            isOpen={this.state.showModal}
            size={"lg"}
            toggle={this.handlePopup}
            className={"dark "}
          >
            <ModalHeader toggle={this.handlePopup}>
              TraderSell 360° view
            </ModalHeader>
            <ImageViewer360 images={this.state.images} />
          </Modal>

          <Modal
            isOpen={this.state?.showChatModal}
            size={"md"}
            toggle={() => {
              this.setState({ showChatModal: !this.state.showChatModal });
            }}
            className={"dark "}
          >
            <ModalHeader
              toggle={() => {
                this.setState({ showChatModal: !this.state.showChatModal });
              }}
            >
              Send direct message to owner
            </ModalHeader>
            <ChatModal {...this.props} chat={this.props?.acution_detail} />
          </Modal>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.app.user,
    acution_detail: state.app.acution_detail,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handeChangeSidebarItem: (value) =>
      dispatch({ type: "SHOWSIDEBARITEM", value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AuctionDetailHero);
