import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Button, Image, Spinner } from "react-bootstrap";

import APIConfig from "../helpers/api/config";
import { toast } from "react-toastify";
import axios from "axios";
import { validateMaxLength } from "../helpers/validation";
import { CarMake } from "../helpers/contraints";
class AccountSettingFrom extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      car_details_by_vin: null,
      radius: "",
      loading: false,
      preview: [],
      name: "",
      email: "",
      user_type: "",
      phone: "",
      address: "",
      id: null,
      state: "",
      city: "",
      Licence: "",
      dealer_image: "",
      dealername: "",
      car_make: "",
      companywebsite: "",
      primary_photo: [],
    };
  }

  handleDeletePhoto = (item, fileName) => {
    if (fileName === "additional_photos") {
      this.setState({
        additional_photos: this.state.additional_photos.filter(function (val) {
          return val.file !== item.file;
        }),
      });
    } else if (fileName === "primary_photo") {
      this.setState({
        primary_photo: this.state.primary_photo.filter(function (val) {
          return val.file !== item.file;
        }),
      });
    }
  };

  handleImageChange(e) {
    e.preventDefault();
    if (e.target.name === "additional_photos") {
      let files = Array.from(e.target.files);
      files.forEach((file) => {
        let reader = new FileReader();
        reader.onloadend = () => {
          const Preview = reader.result;
          var joined = this.state.additional_photos.concat({ file, Preview });
          this.setState({ additional_photos: joined });
        };
        reader.readAsDataURL(file);
      });
    } else if (
      e.target.name === "licence" ||
      e.target.name === "dealer_image"
    ) {
      // del if exist previous
      this.state.primary_photo?.map((item) => {
        if (item.fileName === e.target.name) {
          return this.handleDeletePhoto(item, "primary_photo");
        }
        return undefined;
      });
      let files = Array.from(e.target.files);
      files.forEach((file) => {
        let reader = new FileReader();
        reader.onloadend = () => {
          const Preview = reader.result;
          const fileName = e.target.name;
          var joined = this.state.primary_photo.concat({
            file,
            Preview,
            fileName,
          });
          this.setState({ primary_photo: joined });
        };
        reader.readAsDataURL(file);
      });
    }
  }

  handleFinalSubmit = async (e) => {
    e.preventDefault();

    this._isMounted = true;
    const FormData = require("form-data");
    const data = new FormData();
    this.setState({ loading: true });

    // primary_photo

    data.append("id", this.state.id);

    // TODO: Do the next set of loops in a single loop.
    const temp_primary_photo = this.state.primary_photo.map((val) => {
      return val.file;
    });
    for (let i = 0; i < temp_primary_photo.length; i++) {
      if (this.state.primary_photo.length - 1 === i) {
        data.append("primary_photo[" + i + "]", temp_primary_photo[i]);
      }
    }

    const temp_primary_photo2 = this.state.primary_photo.map((val) => {
      return val;
    });
    for (let i = 0; i < temp_primary_photo2.length; i++) {
      if (temp_primary_photo2[i].fileName === "licence") {
        data.append("dealer_licence[" + 0 + "]", temp_primary_photo2[i].file);
      } else if (temp_primary_photo2[i].fileName === "dealer_image") {
        data.append("dealer_image[" + 0 + "]", temp_primary_photo2[i].file);
      }
    }

    if (this.state.user_type === "Car Owner") {
      data.append("name", this.state.name);
      data.append("email", this.state.email);
      data.append("user_type", this.state.user_type);
      data.append("state", this.state.state);
      data.append("city", this.state.city);
      data.append("address", this.state.address);
      data.append("phone", this.state.phone);
    } else {
      data.append("name", this.state.name);
      data.append("email", this.state.email);
      data.append("user_type", this.state.user_type);
      data.append("dealername", this.state.dealername);
      data.append("companywebsite", this.state.companywebsite);
      data.append("address", this.state.address);
      data.append("phone", this.state.phone);
      data.append("car_make", this.state.car_make);
    }
    try {
      const response = await axios(APIConfig("post", "/update_user", data));
      if (response.status === 200) {
        var reduxData = response.data.data;
        reduxData["isLogin"] = true;
        this.props.UserHandler(reduxData);
        toast.success("Data submited successFully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        this.setState({ loading: false });
      }
    } catch (error) {
      alert(error);
      toast.error("Network   ", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    }

    this.setState({ step: 1 });
  };
  componentDidMount() {
    if (this.props?.user) {
      this.setState(this.props.user);
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <Row className=" ">
        <Col lg={12} md={12} sm={12}>
          {this.props?.user?.user_type === "Car Owner" ? (
            <Form
              className="pr-2 pt-4"
              onSubmit={(e) => {
                this.handleFinalSubmit(e);
              }}
            >
              <div className="d-flex justify-content-center algin-center mb-4">
                <h3 className="car-info"> Account Setting </h3>
              </div>

              <Row>
                <Col lg={6} sm={12} md={12}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Control
                      value={this.state.name || ""}
                      onChange={(e) => this.setState({ name: e.target.value })}
                      required
                      name="name"
                      className="ts-input"
                      type="text"
                      placeholder="Name"
                    />
                  </Form.Group>
                </Col>
                <Col lg={6} sm={12} md={12}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Control
                      value={this.state.email || ""}
                      onChange={(e) => this.setState({ email: e.target.value })}
                      required
                      name="email"
                      className="ts-input"
                      type="email"
                      placeholder="User Name"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={6} sm={12} md={12}>
                  <Form.Group className="mb-3" controlId="State">
                    <Form.Control
                      className="ts-input"
                      name="state"
                      required
                      value={this.state.state || ""}
                      onChange={(e) => this.setState({ state: e.target.value })}
                      type="text"
                      placeholder="State*"
                    />
                  </Form.Group>
                </Col>
                <Col lg={6} sm={12} md={12}>
                  <Form.Group className="mb-3" controlId="City">
                    <Form.Control
                      className="ts-input"
                      name="city"
                      required
                      value={this.state.city || ""}
                      onChange={(e) => this.setState({ city: e.target.value })}
                      type="text"
                      placeholder="City*  "
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={6} sm={12} md={12}>
                  <Form.Group className="mb-3" controlId="Phone">
                    <Form.Control
                      className="ts-input"
                      type="number"
                      required
                      value={this.state.phone || ""}
                      onChange={(e) =>
                        validateMaxLength(e.target.value, 7)
                          ? this.setState({ phone: e.target.value })
                          : ""
                      }
                      name="phone"
                      placeholder="Phone*"
                    />
                  </Form.Group>
                </Col>

                <Col lg={6} sm={12} md={12}>
                  <Form.Group className="mb-3" controlId="address">
                    <Form.Control
                      value={this.state.address || ""}
                      onChange={(e) =>
                        this.setState({ address: e.target.value })
                      }
                      required
                      name="address"
                      className="ts-input"
                      type="textarea"
                      placeholder="  Address"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="  ">
                <Col lg={6} md={12} sm={12}>
                  <Form.Label className="sell-form-label">
                    {" "}
                    Profile Picture
                  </Form.Label>
                  <Form.Group className="mb-1" controlId="Primary Photo">
                    <Form.Control
                      name="dealer_image"
                      onChange={(e) => this.handleImageChange(e)}
                      className="ts-input"
                      type="file"
                      placeholder="  Primary Photo "
                      accept=".png, .jpg, .jpeg"
                    />
                  </Form.Group>
                </Col>
                <Col className="   preview-images-list" lg={4} md={12} sm={12}>
                  {this.state?.primary_photo?.some(
                    (fitler) => fitler.fileName === "dealer_image"
                  ) ? (
                    this.state.primary_photo
                      ?.filter((fitler) => fitler.fileName === "dealer_image")
                      .map((item, index) => {
                        return (
                          <span
                            key={index}
                            className="image-container d-flex justify-content-center"
                          >
                            <span
                              onClick={() =>
                                this.handleDeletePhoto(item, "primary_photo")
                              }
                              className="image-btn-close"
                            >
                              X
                            </span>

                            <Image src={item.Preview} thumbnail />
                          </span>
                        );
                      })
                  ) : (
                    <span className="image-container d-flex justify-content-center">
                      <Image
                        src={`${process.env.React_App_BASE_URL_IMAGE}/storage/images${this.state?.dealer_image}`}
                        thumbnail
                      />
                    </span>
                  )}
                </Col>
              </Row>
              <div className="d-flex  justify-content-center algin-items-center mt-4 ">
                {!this.state.loading ? (
                  <Button type="submit" variant=" btn-next" id="button-addon2a">
                    Save
                  </Button>
                ) : (
                  <Button disabled className="btn-next" variant="primary">
                    <Spinner animation="grow" variant="dark" size="sm" />
                  </Button>
                )}
              </div>
              {/* step 1 Main Info  started ended */}
            </Form>
          ) : (
            <Form
              className="pr-2 pt-4"
              onSubmit={(e) => {
                this.handleFinalSubmit(e);
              }}
            >
              <div className="d-flex justify-content-center algin-center mb-4">
                <h3 className="car-info"> Account Setting </h3>
              </div>

              <Row>
                <Col lg={6} sm={12} md={12}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Control
                      value={this.state.name || ""}
                      onChange={(e) => this.setState({ name: e.target.value })}
                      required
                      name="name"
                      className="ts-input"
                      type="text"
                      placeholder="Name"
                    />
                  </Form.Group>
                </Col>
                <Col lg={6} sm={12} md={12}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Control
                      value={this.state.email || ""}
                      onChange={(e) => this.setState({ email: e.target.value })}
                      required
                      name="email"
                      className="ts-input"
                      type="email"
                      placeholder="User Name"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={6} sm={12} md={12}>
                  <Form.Group className="mb-3" controlId="Phone">
                    <Form.Control
                      className="ts-input"
                      type="number"
                      required
                      value={this.state.phone || ""}
                      onChange={(e) =>
                        validateMaxLength(e.target.value, 7)
                          ? this.setState({ phone: e.target.value })
                          : ""
                      }
                      name="phone"
                      placeholder="Phone*"
                    />
                  </Form.Group>
                </Col>

                <Col lg={6} sm={12} md={12}>
                  <Form.Group className="mb-3" controlId="address">
                    <Form.Control
                      value={this.state.address || ""}
                      onChange={(e) =>
                        this.setState({ address: e.target.value })
                      }
                      required
                      name="address"
                      className="ts-input"
                      type="textarea"
                      placeholder=" Address"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={6} sm={12} md={12}>
                  <Form.Group className="mb-3" controlId="dealername">
                    <Form.Control
                      className="ts-input"
                      name="dealername"
                      value={this.state.dealername || ""}
                      onChange={(e) =>
                        this.setState({ dealername: e.target.value })
                      }
                      type="text"
                      placeholder="Dealer Name"
                    />
                  </Form.Group>
                </Col>
                <Col lg={6} sm={12} md={12}>
                  <Form.Group className="mb-3" controlId="companywebsite">
                    <Form.Control
                      className="ts-input"
                      name="companywebsite"
                      value={this.state.companywebsite || ""}
                      onChange={(e) =>
                        this.setState({
                          companywebsite: e.target.value,
                        })
                      }
                      type="text"
                      placeholder="Company Website*  "
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col lg={12} sm={12} md={12}>
                  <Form.Group controlId="car_make">
                    <Form.Select
                      name="car_make"
                      required
                      value={this.state.car_make || ""}
                      onChange={(e) =>
                        this.setState({ car_make: e.target.value })
                      }
                      className="ts-input mb-3"
                    >
                      <option>Car Make </option>
                      {CarMake?.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="  ">
                <Col lg={6} md={12} sm={12}>
                  <Form.Label className="sell-form-label"> License</Form.Label>
                  <Form.Group className="mb-1" controlId="License Photo">
                    <Form.Control
                      name="licence"
                      onChange={(e) => this.handleImageChange(e)}
                      className="ts-input"
                      type="file"
                      placeholder=" License Photo "
                    />
                  </Form.Group>
                </Col>
                <Col className="   preview-images-list" lg={4} md={12} sm={12}>
                  {this.state?.primary_photo?.some(
                    (fitler) => fitler.fileName === "licence"
                  ) ? (
                    this.state.primary_photo
                      ?.filter((fitler) => fitler.fileName === "licence")
                      .map((item, index) => {
                        return (
                          <span
                            key={index}
                            className="image-container d-flex justify-content-center"
                          >
                            <span
                              onClick={() =>
                                this.handleDeletePhoto(item, "primary_photo")
                              }
                              className="image-btn-close"
                            >
                              X
                            </span>

                            <Image src={item.Preview} thumbnail />
                          </span>
                        );
                      })
                  ) : (
                    <span className="image-container d-flex justify-content-center">
                      <Image
                        src={`${process.env.React_App_BASE_URL_IMAGE}/storage/images${this.state.Licence}`}
                        thumbnail
                      />
                    </span>
                  )}
                </Col>
              </Row>

              <Row className="  ">
                <Col lg={6} md={12} sm={12}>
                  <Form.Label className="sell-form-label">
                    {" "}
                    Profile Picture
                  </Form.Label>
                  <Form.Group className="mb-1" controlId="Profile Photo">
                    <Form.Control
                      name="dealer_image"
                      onChange={(e) => this.handleImageChange(e)}
                      className="ts-input"
                      type="file"
                      placeholder="  Profile Photo "
                      accept=".png, .jpg, .jpeg"
                    />
                  </Form.Group>
                </Col>
                <Col className="   preview-images-list" lg={4} md={12} sm={12}>
                  {this.state?.primary_photo?.some(
                    (fitler) => fitler.fileName === "dealer_image"
                  ) ? (
                    this.state.primary_photo
                      ?.filter((fitler) => fitler.fileName === "dealer_image")
                      .map((item, index) => {
                        return (
                          <span
                            key={index}
                            className="image-container d-flex justify-content-center"
                          >
                            <span
                              onClick={() =>
                                this.handleDeletePhoto(item, "primary_photo")
                              }
                              className="image-btn-close"
                            >
                              X
                            </span>

                            <Image src={item.Preview} thumbnail />
                          </span>
                        );
                      })
                  ) : (
                    <span className="image-container d-flex justify-content-center">
                      <Image
                        src={`${process.env.React_App_BASE_URL_IMAGE}/storage/images${this.state?.dealer_image}`}
                        thumbnail
                      />
                    </span>
                  )}
                </Col>
              </Row>
              <div className="d-flex  justify-content-center algin-items-center mt-4 ">
                {!this.state.loading ? (
                  <Button type="submit" variant=" btn-next" id="button-addon2a">
                    Save
                  </Button>
                ) : (
                  <Button disabled className="btn-next" variant="primary">
                    <Spinner animation="grow" variant="dark" size="sm" />
                  </Button>
                )}
              </div>
              {/* step 1 Main Info  started ended */}
            </Form>
          )}
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.app.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    UserHandler: (value) => dispatch({ type: "USER", value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountSettingFrom);
