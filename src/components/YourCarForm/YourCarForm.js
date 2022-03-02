import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  FormControl,
  Spinner,
} from "react-bootstrap";
import { ArrowLeft } from "react-feather";
import { toast } from "react-toastify";
import Switch from "react-switch";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import NavBar from "../../views/_partials/navbar";
import APIConfig from "../../helpers/api/config";
import {
  validateMaxLength,
  validateSingleField,
} from "../../helpers/validation";
import Registrationhero from "../Registration hero/Registrationhero";
import Login from "../login hero/loginHero";
import Card from "./Card";

export const FORM_MODES = {
  SELL: "sell",
  TRADE: "trade",
};

const FORM_STEPS = {
  [FORM_MODES.SELL]: [0, 1, 2, 6],
  [FORM_MODES.TRADE]: [0, 1, 2, 6],
};

class YourCarForm extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      seletedValue: "",
      images: [],
      images360: [],
      step: 0,
      btnType: "",
      car_details_by_vin: null,

      id: null,
      vin: "",
      drivetrain: "",
      engine: "",
      year: Number,
      make: "",
      model: "",
      state: "",
      city: "",
      phone: "",
      trim: "",
      zip_code: "",

      // Additional Information 2

      odometer: "",
      transmission: "",
      fuel_type: "",
      body_type: "",
      condition: "",
      exterior_color: "",
      loan_or_lease_on_car: "",
      car_keys: "",

      //  Additional Information Driveability 3

      vehicle_driving: "",
      transmission_issue: "",
      drivetrain_issue: "",
      steering_issue: "",
      brake_issue: "",
      suspension_issue: "",

      //  Exterior 4
      minor_body_damage: "",
      moderate_body_damage: "",
      major_body_damage: "",
      scratches: "",
      glass_damaged_cracked: "",
      lights_damaged_cracked: "",
      minor_body_rust: "",
      moderate_body_rust: "",
      major_body_rust: "",
      aftermarket_parts_exterior: "",
      mismatched_paint_colors: "",
      previous_paint_work: "",

      //  Interior 5

      seat_damage: "",
      carpet_damage: "",
      dashboard_damage: "",
      interior_trim_damage: "",
      sunroof: "",
      navigation: "",
      aftermarket_stereo_equipment: "",
      hvac_not_working: "",
      leather_Or_Leather_type_seats: "",

      //  final info  6

      radius: "",
      latitude: "",
      longitude: "",
      primary_photo: [],
      additional_photos: [],

      alredyHaveAccount: false,
      loading: false,
      isVINValid: false,
      preview: [],
    };
  }
  handleNextStep = (e) => {
    e.preventDefault();
    if (!this.state.isVINValid) {
      toast.error("Vin is incorrect, please try again", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });

      return;
    }

    const nextStep = FORM_STEPS[this.props.mode][this.state.step + 1];
    this.setState({ step: nextStep });
    window.scroll(100, 100);
  };
  handlePreviousStep = (e) => {
    e.preventDefault();

    const nextStep = FORM_STEPS[this.props.mode][this.state.step - 1];
    this.setState({ step: nextStep });
    window.scroll(100, 100);
  };
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
      this.state.additional_photos?.map((item) => {
        if (item.fileName !== e.target.name) {
          return undefined;
        }
        return this.handleDeletePhoto(item, "additional_photos");
      });

      let files = Array.from(e.target.files);
      files.forEach((file) => {
        let reader = new FileReader();
        reader.onloadend = () => {
          const Preview = reader.result;
          const fileName = e.target.name;
          var joined = this.state.additional_photos.concat({
            file,
            Preview,
            fileName,
          });
          this.setState({ additional_photos: joined });
          console.log(joined);
        };
        reader.readAsDataURL(file);
      });
    } else {
      // del if exist previous
      this.state.primary_photo?.map((item) => {
        if (item.fileName !== e.target.name) {
          return undefined;
        }
        return this.handleDeletePhoto(item, "primary_photo");
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
          console.log(joined);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  handleFinalSubmit = async (e) => {
    e.preventDefault();
    this._isMounted = true;
    var FormData = require("form-data");
    var data = new FormData();
    this.setState({ loading: true });

    // 3rd step

    // 6th step

    // additional_photos

    var temp_additional_photos = this.state.additional_photos.map((val) => {
      return val.file;
    });
    for (let i = 0; i < temp_additional_photos.length; i++) {
      data.append("additional_photos[" + i + "]", temp_additional_photos[i]);
    }

    // primary_photo
    var temp_primary_photo = this.state.primary_photo.map((val) => {
      return val;
    });
    for (let i = 0; i < temp_primary_photo.length; i++) {
      if (temp_primary_photo[i].fileName === "front_Seats") {
        data.append("front_Seats[" + 0 + "]", temp_primary_photo[i].file);
      } else if (temp_primary_photo[i].fileName === "dash") {
        data.append("dash[" + 0 + "]", temp_primary_photo[i].file);
      } else if (temp_primary_photo[i].fileName === "navigation") {
        data.append("navigation[" + 0 + "]", temp_primary_photo[i].file);
      } else if (temp_primary_photo[i].fileName === "front") {
        data.append("front[" + 0 + "]", temp_primary_photo[i].file);
      } else if (temp_primary_photo[i].fileName === "rear") {
        data.append("rear[" + 0 + "]", temp_primary_photo[i].file);
      } else if (temp_primary_photo[i].fileName === "driver_s_side") {
        data.append("driver_s_side[" + 0 + "]", temp_primary_photo[i].file);
      } else if (temp_primary_photo[i].fileName === "passenger_s_side") {
        data.append("passenger_s_side[" + 0 + "]", temp_primary_photo[i].file);
      }
    }
    data.append("radius", this.state.radius);

    // ist step

    if (this.state.id !== null) {
      data.append("id", this.state.id);
    }

    data.append("publish_status", this.state?.btnType);
    data.append("type", this.props.mode);
    data.append("user_id", this.props.user.id);
    data.append("vin", this.state.vin);
    data.append("drivetrain", this.state.drivetrain);
    data.append("engine", this.state.engine);
    data.append("trim", this.state.trim);
    data.append("year", this.state.year);
    data.append("make", this.state.make);
    data.append("model", this.state.model);
    data.append("zip", this.state.zip_code);
    data.append("state", this.state.state);
    data.append("city", this.props?.user?.city);
    data.append("phone", this.state.phone);

    // 2nd step
    data.append("odometer", this.state.odometer);
    data.append("transmission", this.state.transmission);
    data.append("fuel_type", this.state.fuel_type);
    data.append("body_type", this.state.body_type);
    data.append("condition", this.state.condition);
    data.append("exterior_color", this.state.exterior_color);
    data.append("loan_or_lease_on_car", this.state.loan_or_lease_on_car);
    data.append("car_keys", this.state.car_keys);

    data.append("vehicle_driving", this.state.vehicle_driving);
    data.append("transmission_issue", this.state.transmission_issue);
    data.append("drivetrain_issue", this.state.drivetrain_issue);
    data.append("steering_issue", this.state.steering_issue);
    data.append("brake_issue", this.state.brake_issue);
    data.append("suspension_issue", this.state.suspension_issue);

    // 4th step
    data.append("minor_body_damage", this.state.minor_body_damage);
    data.append("moderate_body_damage", this.state.moderate_body_damage);
    data.append("major_body_damage", this.state.major_body_damage);
    data.append("scratches", this.state.scratches);
    data.append("glass_damaged_cracked", this.state.glass_damaged_cracked);
    data.append("lights_damaged_cracked", this.state.lights_damaged_cracked);
    data.append("minor_body_rust", this.state.minor_body_rust);
    data.append("moderate_body_rust", this.state.moderate_body_rust);
    data.append("major_body_rust", this.state.major_body_rust);
    data.append(
      "aftermarket_parts_exterior",
      this.state.aftermarket_parts_exterior
    );
    data.append("mismatched_paint_colors", this.state.mismatched_paint_colors);
    data.append("previous_paint_work", this.state.previous_paint_work);

    // 5th step
    data.append("seat_damage", this.state.seat_damage);
    data.append("carpet_damage", this.state.carpet_damage);
    data.append("dashboard_damage", this.state.dashboard_damage);
    data.append("interior_trim_damage", this.state.interior_trim_damage);
    data.append("sunroof", this.state.sunroof);
    data.append("navigation", this.state.navigation);
    data.append("latitude", this.state.latitude);
    data.append("longitude", this.state.longitude);
    data.append(
      "aftermarket_stereo_equipment",
      this.state.aftermarket_stereo_equipment
    );
    data.append("hvac_not_working", this.state.hvac_not_working);
    data.append(
      "leather_Or_Leather_type_seats",
      this.state.leather_Or_Leather_type_seats
    );

    try {
      const response = await axios(APIConfig("post", "/trade_your_car", data));
      if (response.status === 200) {
        toast.success("Data submited successFully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        this.setState({ loading: false });
        this.props.history.push("/");
      }
    } catch (error) {
      toast.error("Network Error ", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    }

    this.setState({ step: 1 });
  };
  getVINData = async () => {
    this._isMounted = true;
    if (validateSingleField(this.state.vin)) {
      this.setState({ loading: true });
      var FormData = require("form-data");
      var data = new FormData();
      data.append("vin", this.state.vin);
      try {
        const response = await axios(APIConfig("post", "/check_vin", data));
        if (response.status === 200) {
          this.setState({
            loading: false,
            isVINValid: true,

            car_details_by_vin: response.data.data,
            drivetrain: response.data.data.attributes.drivetrain,
            engine: response.data.data.attributes.engine,
            year: parseInt(response.data.data.attributes.year),
            make: response.data.data.attributes.make,
            model: response.data.data.attributes.model,
          });

          toast.success("Data has been fetched successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        }
      } catch (error) {
        toast.error("Vin is incorrect please try again ", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1800,
        });
        this.setState({ loading: false, isVINValid: false });
      }
    } else {
      toast.warning("Please fill VIN number before proceed.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1800,
      });
    }
  };
  componentDidMount() {
    let { state } = this.props.history.location;
    if (state) {
      this.setState(state.auctionDetail);
      this.setState({
        step: 1,
        images360: state.auctionDetail.images360,
        images: state.auctionDetail.images,
      });

      console.log("Auction Detials" + JSON.stringify(state.auctionDetail));
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleOptions = (value) => {
    this.setState({ step: 1, seletedValue: value });
  };
  handleDeletePhotoOnServer(id, name, is_primary) {
    if (is_primary === 0) {
      const index = this.state?.images360.findIndex(
        (find) => find.is_primary === is_primary
      );
      const tempImages = this.state.images360;
      tempImages.splice(index, 1);
      this.setState({ images360: tempImages });
    } else {
      const index = this.state?.images.findIndex(
        (find) => find.is_primary === is_primary
      );
      const tempImages = this.state.images;
      tempImages.splice(index, 1);
      this.setState({ images: tempImages });
    }
  }
  render() {
    return (
      <div className="contact-hero-section">
        <NavBar {...this.props} showSvg={true} />
        <Container>
          <Row className="d-flex justify-content-center align-items-center section-contact-t-b-padding">
            {this.state.step === 0 ? (
              <Col lg={12} md={12} sm={12}>
                <Card
                  handleOptionSelect={this.handleOptions}
                  cardsData={this.props.cardsData}
                />
              </Col>
            ) : (
              <Col lg={9} md={12} sm={12}>
                <div className="login-hero-container margin-top-medium">
                  <div className="d-flex justify-content-center flex-column text-center algin-center mb-2">
                    {this.state.step === 1 ? (
                      <span
                        onClick={() =>
                          this.setState({
                            step: this.state.step - 1,
                            seletedValue: "",
                          })
                        }
                        className="btn--back"
                      >
                        <ArrowLeft
                          className="primary p"
                          size={20}
                          data-tour="toggle-icon"
                        />
                      </span>
                    ) : (
                      ""
                    )}
                    <h3 className="car-info">Car Information </h3>
                    <h6 className="car-info">
                      {this.state.step === 1
                        ? " "
                        : this.state.step === 2
                        ? " Additional Information"
                        : this.state.step === 3
                        ? " Driveability"
                        : this.state.step === 4
                        ? " Exterior"
                        : this.state.step === 5
                        ? "Interior "
                        : this.state.step === 6
                        ? " Final info "
                        : ""}
                    </h6>
                  </div>
                  {/* step 1  Main Info started */}
                  {this.state.step === 1 ? (
                    <Form
                      onSubmit={(e) => {
                        this.handleNextStep(e);
                      }}
                    >
                      <Row className="   ">
                        <Col lg={6} md={12} sm={12}>
                          <InputGroup className="mb-3">
                            <FormControl
                              type="text"
                              id={"vin"}
                              required
                              value={"" || this.state.vin}
                              onChange={(e) =>
                                this.setState({ vin: e.target.value })
                              }
                              onBlur={() => this.getVINData()}
                              name="vin"
                              placeholder="  Vehicle VIN *  "
                              className="ts-input"
                            />
                            {!this.state.loading ? (
                              <Button
                                onClick={() => this.getVINData()}
                                variant=" btn-start outline-secondary"
                                id="loaing-btn "
                              >
                                Start
                              </Button>
                            ) : (
                              <Button
                                disabled
                                className="btn-start"
                                variant="primary"
                                id={"btn-loader"}
                                type="submit"
                              >
                                <Spinner
                                  animation="grow"
                                  variant="dark"
                                  size="sm"
                                />
                              </Button>
                            )}
                          </InputGroup>
                        </Col>
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group className="mb-3" controlId="Drivetrain">
                            <Form.Control
                              required
                              className="ts-input"
                              type="text"
                              value={"" || this.state.drivetrain}
                              onChange={(e) =>
                                this.setState({ drivetrain: e.target.value })
                              }
                              name="drivetrain"
                              placeholder=" Drivetrain*  "
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="  ">
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group className="mb-3" controlId="Engine">
                            <Form.Control
                              required
                              className="ts-input"
                              name="engine"
                              value={"" || this.state.engine}
                              onChange={(e) =>
                                this.setState({ engine: e.target.value })
                              }
                              type="text"
                              placeholder="   Engine*"
                            />
                          </Form.Group>
                        </Col>
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group className="mb-3" controlId="year">
                            <Form.Control
                              required
                              className="ts-input"
                              name={"year"}
                              value={"" || this.state.year}
                              onChange={(e) =>
                                this.setState({ year: e.target.value })
                              }
                              type="number"
                              placeholder="    Year*  "
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className=" ">
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group className="mb-3" controlId="Make">
                            <Form.Control
                              required
                              className="ts-input"
                              name="make"
                              value={"" || this.state.make}
                              onChange={(e) =>
                                this.setState({ make: e.target.value })
                              }
                              type="text"
                              placeholder="   Make*"
                            />
                          </Form.Group>
                        </Col>
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group className="mb-3" controlId="Model">
                            <Form.Control
                              required
                              className="ts-input"
                              name="model"
                              value={"" || this.state.model}
                              onChange={(e) =>
                                this.setState({ model: e.target.value })
                              }
                              type="text"
                              placeholder="    Model*  "
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="  ">
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group className="mb-3" controlId="Body Type">
                            <Form.Control
                              name="body_type"
                              value={"" || this.state.body_type}
                              onChange={(e) =>
                                this.setState({ body_type: e.target.value })
                              }
                              className="ts-input"
                              type="text"
                              placeholder=" Body Type *"
                            />
                          </Form.Group>
                        </Col>
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="zip_code Code"
                          >
                            <Form.Control
                              required
                              className="ts-input"
                              name="zip_code"
                              value={"" || this.state.zip_code}
                              onChange={(e) =>
                                validateMaxLength(e.target.value, 5)
                                  ? this.setState({ zip_code: e.target.value })
                                  : ""
                              }
                              type="number"
                              placeholder="   Zip Code *"
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="  "></Row>

                      <div className="d-flex  justify-content-center algin-items-center mt-4 ">
                        {!this.state.loading ? (
                          <Button
                            type="submit"
                            variant=" btn-next"
                            id="button-addon2a"
                          >
                            Start
                          </Button>
                        ) : (
                          <Button
                            disabled
                            className="btn-next"
                            variant="primary"
                          >
                            <Spinner
                              animation="grow"
                              variant="dark"
                              size="sm"
                            />
                          </Button>
                        )}
                      </div>
                      {/* step 1 Main Info  started ended */}
                    </Form>
                  ) : (
                    ""
                  )}
                  {/* step 1  Main Info ended */}

                  {/* step 2 Additional Info started */}
                  {this.state.step === 2 ? (
                    <Form onSubmit={this.handleNextStep}>
                      <Row className="   ">
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group className="mb-3" controlId="Odometer2">
                            <Form.Control
                              className="ts-input"
                              type="text"
                              name="odometer"
                              value={"" || this.state.odometer}
                              onChange={(e) =>
                                this.setState({ odometer: e.target.value })
                              }
                              placeholder="Odometer  "
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="  ">
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group className="mb-3" controlId="Transmission">
                            <Form.Control
                              name="transmission"
                              value={"" || this.state.transmission}
                              onChange={(e) =>
                                this.setState({ transmission: e.target.value })
                              }
                              className="ts-input"
                              type="text"
                              placeholder=" Transmission "
                            />
                          </Form.Group>
                        </Col>
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group
                            className="mb-1 "
                            controlId="Exterior Color"
                          >
                            <Form.Control
                              name="exterior_color"
                              value={"" || this.state.exterior_color}
                              onChange={(e) =>
                                this.setState({
                                  exterior_color: e.target.value,
                                })
                              }
                              className="ts-input"
                              type="text"
                              placeholder="Exterior Color"
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="  ">
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group className="mb-3" controlId="Fuel Type">
                            <Form.Select
                              name="fuel_type"
                              value={"" || this.state.fuel_type}
                              onChange={(e) =>
                                this.setState({ condition: e.target.value })
                              }
                              className="ts-input"
                              defaultValue="  Condition"
                            >
                              <option>Fuel Type </option>
                              <option value="Gas">Gas</option>
                              <option value="Diesel">Diesel</option>
                              <option value="Electric">Electric</option>
                              <option value="Natural Gas">Natural Gas</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group controlId="formGridState">
                            <Form.Select
                              name="condition"
                              value={"" || this.state.condition}
                              onChange={(e) =>
                                this.setState({ condition: e.target.value })
                              }
                              className="ts-input"
                              defaultValue="  Condition"
                            >
                              <option>Condition </option>
                              <option value="Excellent">Excellent</option>
                              <option value="Good">Good</option>
                              <option value="Fair">Fair</option>
                              <option value="Poor">Poor</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="  ">
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="Loan or Lease"
                          >
                            <Form.Select
                              name="loan_or_lease_on_car"
                              value={"" || this.state.loan_or_lease_on_car}
                              onChange={(e) =>
                                this.setState({
                                  loan_or_lease_on_car: e.target.value,
                                })
                              }
                              className="ts-input"
                              defaultValue="loan or lease"
                            >
                              <option>Loan or lease on car </option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group controlId="formGridState">
                            <Form.Select
                              name="car_keys"
                              value={"" || this.state.car_keys}
                              onChange={(e) =>
                                this.setState({ car_keys: e.target.value })
                              }
                              className="ts-input"
                              defaultValue="Keys"
                            >
                              <option>Keys </option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <div className="d-flex  justify-content-center algin-items-center mt-4 ">
                        <Button
                          onClick={(e) => this.handlePreviousStep(e)}
                          className="btn-next"
                          variant="primary"
                        >
                          Back
                        </Button>
                        <Button
                          className="btn-next btn-margin-left"
                          variant="primary"
                          type="submit"
                        >
                          Next
                        </Button>
                      </div>
                    </Form>
                  ) : (
                    ""
                  )}

                  {/* step 2  Additional Info   ended */}

                  {/* step 3  Driveability started */}
                  {this.state.step === 3 ? (
                    <Form onSubmit={this.handleNextStep}>
                      <Row className="   ">
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="vehicle_driving"
                          >
                            <Form.Select
                              name="vehicle_driving"
                              value={"" || this.state.vehicle_driving}
                              onChange={(e) =>
                                this.setState({
                                  vehicle_driving: e.target.value,
                                })
                              }
                              className="ts-input"
                            >
                              <option> Vehicle Driving</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="transmission_issue"
                          >
                            <Form.Select
                              name="transmission_issue"
                              value={"" || this.state.transmission_issue}
                              onChange={(e) =>
                                this.setState({
                                  transmission_issue: e.target.value,
                                })
                              }
                              className="ts-input"
                            >
                              <option>Transmission Issue </option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="  ">
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="drivetrain_issue"
                          >
                            <Form.Select
                              name="drivetrain_issue"
                              value={"" || this.state.drivetrain_issue}
                              onChange={(e) =>
                                this.setState({
                                  drivetrain_issue: e.target.value,
                                })
                              }
                              className="ts-input"
                            >
                              <option> Drivetrain Issue</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="steering_issue"
                          >
                            <Form.Select
                              name="steering_issue"
                              value={"" || this.state.steering_issue}
                              onChange={(e) =>
                                this.setState({
                                  steering_issue: e.target.value,
                                })
                              }
                              className="ts-input"
                            >
                              <option>Steering Issue</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="  ">
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group className="mb-3" controlId="brake_issue">
                            <Form.Select
                              name="brake_issue"
                              value={"" || this.state.brake_issue}
                              onChange={(e) =>
                                this.setState({ brake_issue: e.target.value })
                              }
                              className="ts-input"
                            >
                              <option> Brake Issue</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="suspension_issue"
                          >
                            <Form.Select
                              name="suspension_issue"
                              value={"" || this.state.suspension_issue}
                              onChange={(e) =>
                                this.setState({
                                  suspension_issue: e.target.value,
                                })
                              }
                              className="ts-input"
                            >
                              <option> Suspension Issue </option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <div className="d-flex  justify-content-center algin-items-center mt-4 ">
                        <Button
                          onClick={(e) => this.handlePreviousStep(e)}
                          className="btn-next"
                          variant="primary"
                        >
                          Back
                        </Button>
                        <Button
                          className="btn-next btn-margin-left"
                          variant="primary"
                          type="submit"
                        >
                          Next
                        </Button>
                      </div>
                    </Form>
                  ) : (
                    ""
                  )}
                  {/* step 3 Driveability   started ended */}

                  {/* step 4  Exterior started */}
                  {this.state.step === 4 ? (
                    <Form onSubmit={this.handleNextStep}>
                      <Row className="   ">
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="minor_body_damage"
                          >
                            <Form.Select
                              name="minor_body_damage"
                              value={"" || this.state.minor_body_damage}
                              onChange={(e) =>
                                this.setState({
                                  minor_body_damage: e.target.value,
                                })
                              }
                              className="ts-input"
                            >
                              <option> Minor Body Damage </option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="moderate_body_damage"
                          >
                            <Form.Select
                              name="moderate_body_damage"
                              value={"" || this.state.moderate_body_damage}
                              onChange={(e) =>
                                this.setState({
                                  moderate_body_damage: e.target.value,
                                })
                              }
                              className="ts-input"
                            >
                              <option>Moderate Body Damage </option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="  ">
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="major_body_damage"
                          >
                            <Form.Select
                              name="major_body_damage"
                              value={"" || this.state.major_body_damage}
                              onChange={(e) =>
                                this.setState({
                                  major_body_damage: e.target.value,
                                })
                              }
                              className="ts-input"
                            >
                              <option> Major Body Damage </option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group className="mb-3" controlId="scratches">
                            <Form.Select
                              name="scratches"
                              value={"" || this.state.scratches}
                              onChange={(e) =>
                                this.setState({ scratches: e.target.value })
                              }
                              className="ts-input"
                            >
                              <option>Scratches </option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="  ">
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="glass_damaged_cracked"
                          >
                            <Form.Select
                              name="glass_damaged_cracked"
                              value={"" || this.state.glass_damaged_cracked}
                              onChange={(e) =>
                                this.setState({
                                  glass_damaged_cracked: e.target.value,
                                })
                              }
                              className="ts-input"
                            >
                              <option> Glass Damaged Cracked </option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="lights_damaged_cracked"
                          >
                            <Form.Select
                              name="lights_damaged_cracked"
                              value={"" || this.state.lights_damaged_cracked}
                              onChange={(e) =>
                                this.setState({
                                  lights_damaged_cracked: e.target.value,
                                })
                              }
                              className="ts-input"
                            >
                              <option> Lights Damaged Cracked </option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="  ">
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="minor_body_rust"
                          >
                            <Form.Select
                              name="minor_body_rust"
                              value={"" || this.state.minor_body_rust}
                              onChange={(e) =>
                                this.setState({
                                  minor_body_rust: e.target.value,
                                })
                              }
                              className="ts-input"
                            >
                              <option> Minor Body Rust </option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="moderate_body_rust"
                          >
                            <Form.Select
                              name="moderate_body_rust"
                              value={"" || this.state.moderate_body_rust}
                              onChange={(e) =>
                                this.setState({
                                  moderate_body_rust: e.target.value,
                                })
                              }
                              className="ts-input"
                            >
                              <option> Moderate Body Rust </option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="  ">
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="major_body_rust"
                          >
                            <Form.Select
                              name="major_body_rust"
                              value={"" || this.state.major_body_rust}
                              onChange={(e) =>
                                this.setState({
                                  major_body_rust: e.target.value,
                                })
                              }
                              className="ts-input"
                            >
                              <option> Major Body Rust </option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="aftermarket_parts_exterior"
                          >
                            <Form.Select
                              name="aftermarket_parts_exterior"
                              value={
                                "" || this.state.aftermarket_parts_exterior
                              }
                              onChange={(e) =>
                                this.setState({
                                  aftermarket_parts_exterior: e.target.value,
                                })
                              }
                              className="ts-input"
                            >
                              <option> Aftermarket Parts Exterior </option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="  ">
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="mismatched_paint_colors"
                          >
                            <Form.Select
                              name="mismatched_paint_colors"
                              value={"" || this.state.mismatched_paint_colors}
                              onChange={(e) =>
                                this.setState({
                                  mismatched_paint_colors: e.target.value,
                                })
                              }
                              className="ts-input"
                            >
                              <option>Mismatched Paint Colors</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="previous_paint_work"
                          >
                            <Form.Select
                              name="previous_paint_work"
                              value={"" || this.state.previous_paint_work}
                              onChange={(e) =>
                                this.setState({
                                  previous_paint_work: e.target.value,
                                })
                              }
                              className="ts-input"
                            >
                              <option>Previous Paint Work </option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <div className="d-flex  justify-content-center algin-items-center mt-4 ">
                        <Button
                          onClick={(e) => this.handlePreviousStep(e)}
                          className="btn-next"
                          variant="primary"
                        >
                          Back
                        </Button>
                        <Button
                          className="btn-next btn-margin-left"
                          variant="primary"
                          type="submit"
                        >
                          Next
                        </Button>
                      </div>
                    </Form>
                  ) : (
                    ""
                  )}
                  {/* step 4 Exterior   started ended */}

                  {/* step 5  Interior started */}
                  {this.state.step === 5 ? (
                    <Form onSubmit={this.handleNextStep}>
                      <Row className="">
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group className="mb-3" controlId="seat_damage">
                            <Form.Select
                              name="seat_damage"
                              value={"" || this.state.seat_damage}
                              onChange={(e) =>
                                this.setState({ seat_damage: e.target.value })
                              }
                              className="ts-input"
                            >
                              <option>Seat Damage </option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="carpet_damage"
                          >
                            <Form.Select
                              name="carpet_damage"
                              value={"" || this.state.carpet_damage}
                              onChange={(e) =>
                                this.setState({ carpet_damage: e.target.value })
                              }
                              className="ts-input"
                            >
                              <option>Carpet Damage </option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="  ">
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="dashboard_damage"
                          >
                            <Form.Select
                              name="dashboard_damage"
                              value={"" || this.state.dashboard_damage}
                              onChange={(e) =>
                                this.setState({
                                  dashboard_damage: e.target.value,
                                })
                              }
                              className="ts-input"
                            >
                              <option> Dashboard Damage </option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="interior_trim_damage"
                          >
                            <Form.Select
                              name="interior_trim_damage"
                              value={"" || this.state.interior_trim_damage}
                              onChange={(e) =>
                                this.setState({
                                  interior_trim_damage: e.target.value,
                                })
                              }
                              className="ts-input"
                            >
                              <option>Interior Trim Damage </option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="  ">
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group className="mb-3" controlId="sunroof">
                            <Form.Select
                              name="sunroof"
                              value={"" || this.state.sunroof}
                              onChange={(e) =>
                                this.setState({ sunroof: e.target.value })
                              }
                              className="ts-input"
                            >
                              <option>Sunroof </option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group className="mb-3" controlId="navigation">
                            <Form.Select
                              name="navigation"
                              value={"" || this.state.navigation}
                              onChange={(e) =>
                                this.setState({ navigation: e.target.value })
                              }
                              className="ts-input"
                            >
                              <option> Navigation </option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="  ">
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="aftermarket_stereo_equipment"
                          >
                            <Form.Select
                              name="aftermarket_stereo_equipment"
                              value={
                                "" || this.state.aftermarket_stereo_equipment
                              }
                              onChange={(e) =>
                                this.setState({
                                  aftermarket_stereo_equipment: e.target.value,
                                })
                              }
                              className="ts-input"
                            >
                              <option> Aftermarket Stereo Equipment </option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="hvac_not_working"
                          >
                            <Form.Select
                              name="hvac_not_working"
                              value={"" || this.state.hvac_not_working}
                              onChange={(e) =>
                                this.setState({
                                  hvac_not_working: e.target.value,
                                })
                              }
                              className="ts-input"
                            >
                              <option> Hvac Not Working </option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="  ">
                        <Col lg={12} md={12} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="leather_Or_Leather_type_seats"
                          >
                            <Form.Select
                              name="leather_Or_Leather_type_seats"
                              value={
                                "" || this.state.leather_Or_Leather_type_seats
                              }
                              onChange={(e) =>
                                this.setState({
                                  leather_Or_Leather_type_seats: e.target.value,
                                })
                              }
                              className="ts-input"
                            >
                              <option>Leather Or Leather Type Seats </option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <div className="d-flex  justify-content-center algin-items-center mt-4 ">
                        <Button
                          onClick={(e) => this.handlePreviousStep(e)}
                          className="btn-next"
                          variant="primary"
                        >
                          Back
                        </Button>
                        <Button
                          className="btn-next btn-margin-left"
                          variant="primary"
                          type="submit"
                        >
                          Next
                        </Button>
                      </div>
                    </Form>
                  ) : (
                    ""
                  )}
                  {/* step 5 Interior   started ended */}
                  {/* step 6   Final Details started */}
                  {this.state.step === 6 ? (
                    <React.Fragment>
                      <Form onSubmit={this.handleFinalSubmit}>
                        <Row className="   "></Row>
                        <Row className="   ">
                          <Col lg={12} md={12} sm={12}>
                            <h6 className="form-subheading">
                              Are you shopping for another car?
                            </h6>
                            <p className="form-small-text">
                              If so, tell us about the car you're considering.
                              This helps us match you with the best dealer for a
                              trade-in.
                            </p>
                          </Col>
                        </Row>
                        <Row className="   ">
                          <Col lg={6} md={12} sm={12}>
                            <Form.Group className="mb-3" controlId="Vehicle">
                              <Form.Control
                                className="ts-input"
                                type="text"
                                value={"" || this.state.make}
                                onChange={(e) =>
                                  this.setState({ make: e.target.value })
                                }
                                name="make"
                                placeholder=" Make   "
                              />
                            </Form.Group>
                          </Col>
                          <Col lg={6} md={12} sm={12}>
                            <Form.Group className="mb-3" controlId="Modal">
                              <Form.Control
                                className="ts-input"
                                type="text"
                                value={"" || this.state.model}
                                onChange={(e) =>
                                  this.setState({ model: e.target.value })
                                }
                                name="model"
                                placeholder=" Modal   "
                              />
                            </Form.Group>
                          </Col>
                          <Col lg={6} md={12} sm={12}>
                            <Form.Group className="mb-3" controlId="latitude">
                              <Form.Control
                                className="ts-input"
                                type="text"
                                value={"" || this.state.latitude}
                                onChange={(e) =>
                                  this.setState({ latitude: e.target.value })
                                }
                                name="latitude"
                                placeholder="Latitude"
                              />
                            </Form.Group>
                          </Col>
                          <Col lg={6} md={12} sm={12}>
                            <Form.Group className="mb-3" controlId="longitude">
                              <Form.Control
                                className="ts-input"
                                type="text"
                                value={"" || this.state.longitude}
                                onChange={(e) =>
                                  this.setState({ longitude: e.target.value })
                                }
                                name="longitude"
                                placeholder="Longitude"
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row className="   ">
                          <Col lg={12} md={12} sm={12}>
                            <h6>
                              What distance are you willing to sell your car in?
                            </h6>
                          </Col>
                          <Col lg={12} md={12} sm={12}>
                            <Form.Group
                              className="mb-3"
                              controlId="formGridState"
                            >
                              <Form.Select
                                name="radius"
                                value={"" || this.state.radius}
                                onChange={(e) =>
                                  this.setState({ radius: e.target.value })
                                }
                                className="ts-input"
                              >
                                <option> Radius</option>
                                <option value="5">5 Miles</option>
                                <option value="10">10 Miles</option>
                                <option value="20">20 Miles</option>
                                <option value="30">30 Miles</option>
                                <option value="40">40 Miles</option>
                                <option value="50">50 Miles</option>
                                <option value="75">75 Miles</option>
                                <option value="100">100 Miles</option>
                                <option value="250">250 Miles</option>
                                <option value="500">500 Miles</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row className=" mt-2 ">
                          <Col lg={12} md={12} sm={12}>
                            <p>
                              Uploading images of your car is optional, however
                              we recommend that you do take and upload pictures
                              for greater accuracy in determining your car’s
                              value.
                            </p>
                            <p>
                              Whether you chose to upload photos or not you will
                              have the ability to “Mark Up” which gives you the
                              opportunity to click the image and describe any
                              damage that might be present.
                            </p>
                            <p>
                              If you don’t have time to take photos right now,
                              you can still describe the condition of your car
                              on stock photos.
                            </p>
                          </Col>
                        </Row>

                        <Row className=" mt-2 ">
                          <Col lg={12} md={12} sm={12}>
                            <h5 className="car-list-title-simple">
                              Interior Images
                            </h5>
                          </Col>
                          <Col lg={4} md={12} sm={12}>
                            <Form.Label className="sell-form-label">
                              {" "}
                              Front Seats
                            </Form.Label>
                            <Form.Group
                              className="mb-1"
                              controlId="     Front Seats "
                            >
                              <Form.Control
                                name="front_Seats"
                                value={"" || this.state?.primary_photo?.front}
                                onChange={(e) => this.handleImageChange(e)}
                                className="ts-input"
                                type="file"
                                placeholder=" Front Seats "
                                accept=".png, .jpg, .jpeg"
                              />
                            </Form.Group>
                          </Col>

                          <Col lg={4} md={12} sm={12}>
                            <Form.Label className="sell-form-label">
                              {" "}
                              Dash
                            </Form.Label>
                            <Form.Group className="mb-1" controlId="Dash  ">
                              <Form.Control
                                name="dash"
                                onChange={(e) => this.handleImageChange(e)}
                                className="ts-input"
                                type="file"
                                placeholder="   Dash "
                                accept=".png, .jpg, .jpeg"
                              />
                            </Form.Group>
                          </Col>
                          <Col lg={4} md={12} sm={12}>
                            <Form.Label className="sell-form-label">
                              {" "}
                              Navigation
                            </Form.Label>
                            <Form.Group
                              className="mb-1"
                              controlId="Navigation  "
                            >
                              <Form.Control
                                name="navigation"
                                onChange={(e) => this.handleImageChange(e)}
                                className="ts-input"
                                type="file"
                                placeholder=" Navigation   "
                                accept=".png, .jpg, .jpeg"
                              />
                            </Form.Group>
                          </Col>

                          <Col
                            className="   preview-images-list"
                            lg={4}
                            md={12}
                            sm={12}
                          >
                            {this.state?.primary_photo?.some(
                              (fitler) => fitler.fileName === "front_Seats"
                            )
                              ? this.state.primary_photo
                                  ?.filter(
                                    (fitler) =>
                                      fitler.fileName === "front_Seats"
                                  )
                                  .map((item, index) => {
                                    return (
                                      <span
                                        key={index}
                                        className="image-container d-flex justify-content-center"
                                      >
                                        <span
                                          onClick={() =>
                                            this.handleDeletePhoto(
                                              item,
                                              "primary_photo"
                                            )
                                          }
                                          className="image-btn-close"
                                        >
                                          X
                                        </span>

                                        <Image src={item.Preview} thumbnail />
                                      </span>
                                    );
                                  })
                              : this.state?.images
                                  ?.filter((fitler) => fitler.is_primary === 2)
                                  ?.map((item, index) => {
                                    return (
                                      <span
                                        key={index}
                                        className="image-container d-flex justify-content-center"
                                      >
                                        <span
                                          onClick={() =>
                                            this.handleDeletePhotoOnServer(
                                              item.id,
                                              "front_Seats",
                                              item.is_primary
                                            )
                                          }
                                          className="image-btn-close"
                                        >
                                          X
                                        </span>

                                        <Image src={item.thumbnail} thumbnail />
                                      </span>
                                    );
                                  })}
                          </Col>
                          <Col
                            className="   preview-images-list"
                            lg={4}
                            md={12}
                            sm={12}
                          >
                            {this.state?.primary_photo?.some(
                              (fitler) => fitler.fileName === "dash"
                            )
                              ? this.state.primary_photo
                                  ?.filter(
                                    (fitler) => fitler.fileName === "dash"
                                  )
                                  .map((item, index) => {
                                    return (
                                      <span
                                        key={index}
                                        className="image-container d-flex justify-content-center"
                                      >
                                        <span
                                          onClick={() =>
                                            this.handleDeletePhoto(
                                              item,
                                              "primary_photo"
                                            )
                                          }
                                          className="image-btn-close"
                                        >
                                          X
                                        </span>
                                        <Image src={item.Preview} thumbnail />
                                      </span>
                                    );
                                  })
                              : this.state?.images
                                  ?.filter((fitler) => fitler.is_primary === 3)
                                  ?.map((item, index) => {
                                    return (
                                      <span
                                        key={index}
                                        className="image-container d-flex justify-content-center"
                                      >
                                        <span
                                          onClick={() =>
                                            this.handleDeletePhotoOnServer(
                                              item.id,
                                              "dash",
                                              item.is_primary
                                            )
                                          }
                                          className="image-btn-close"
                                        >
                                          X
                                        </span>
                                        <Image src={item.thumbnail} thumbnail />
                                      </span>
                                    );
                                  })}
                          </Col>
                          <Col
                            className="   preview-images-list"
                            lg={4}
                            md={12}
                            sm={12}
                          >
                            {this.state?.primary_photo?.some(
                              (fitler) => fitler.fileName === "navigation"
                            )
                              ? this.state.primary_photo
                                  ?.filter(
                                    (fitler) => fitler.fileName === "navigation"
                                  )
                                  .map((item, index) => {
                                    return (
                                      <span
                                        key={index}
                                        className="image-container d-flex justify-content-center"
                                      >
                                        <span
                                          onClick={() =>
                                            this.handleDeletePhoto(
                                              item,
                                              "primary_photo"
                                            )
                                          }
                                          className="image-btn-close"
                                        >
                                          X
                                        </span>
                                        <Image src={item.Preview} thumbnail />
                                      </span>
                                    );
                                  })
                              : this.state?.images
                                  ?.filter((fitler) => fitler.is_primary === 4)
                                  ?.map((item, index) => {
                                    return (
                                      <span
                                        key={index}
                                        className="image-container d-flex justify-content-center"
                                      >
                                        <span
                                          onClick={() =>
                                            this.handleDeletePhotoOnServer(
                                              item.id,
                                              "navigation",
                                              item.is_primary
                                            )
                                          }
                                          className="image-btn-close"
                                        >
                                          X
                                        </span>
                                        <Image src={item.thumbnail} thumbnail />
                                      </span>
                                    );
                                  })}
                          </Col>
                        </Row>

                        <Row className="mt-2  ">
                          <Col lg={12} md={12} sm={12}>
                            <h5 className="car-list-title-simple">
                              Exterior Images
                            </h5>
                          </Col>
                          <Col lg={6} md={12} sm={12}>
                            <Form.Label className="sell-form-label">
                              {" "}
                              Front
                            </Form.Label>
                            <Form.Group
                              className="mb-1"
                              controlId="     Front   "
                            >
                              <Form.Control
                                name="front"
                                onChange={(e) => this.handleImageChange(e)}
                                className="ts-input"
                                type="file"
                                placeholder=" Front   "
                                accept=".png, .jpg, .jpeg"
                              />
                            </Form.Group>
                          </Col>
                          <Col lg={6} md={12} sm={12}>
                            <Form.Label className="sell-form-label">
                              {" "}
                              Rear
                            </Form.Label>
                            <Form.Group className="mb-1" controlId="Rear  ">
                              <Form.Control
                                name="rear"
                                onChange={(e) => this.handleImageChange(e)}
                                className="ts-input"
                                type="file"
                                placeholder="   Rear "
                                accept=".png, .jpg, .jpeg"
                              />
                            </Form.Group>
                          </Col>
                          <Col
                            className="   preview-images-list"
                            lg={6}
                            md={12}
                            sm={12}
                          >
                            {this.state?.primary_photo?.some(
                              (fitler) => fitler.fileName === "front"
                            )
                              ? this.state.primary_photo
                                  ?.filter(
                                    (fitler) => fitler.fileName === "front"
                                  )
                                  .map((item, index) => {
                                    return (
                                      <span
                                        key={index}
                                        className="image-container d-flex justify-content-center"
                                      >
                                        <span
                                          onClick={() =>
                                            this.handleDeletePhoto(
                                              item,
                                              "primary_photo"
                                            )
                                          }
                                          className="image-btn-close"
                                        >
                                          X
                                        </span>
                                        <Image src={item.Preview} thumbnail />
                                      </span>
                                    );
                                  })
                              : this.state?.images
                                  ?.filter((fitler) => fitler.is_primary === 5)
                                  ?.map((item, index) => {
                                    return (
                                      <span
                                        key={index}
                                        className="image-container d-flex justify-content-center"
                                      >
                                        <span
                                          onClick={() =>
                                            this.handleDeletePhotoOnServer(
                                              item.id,
                                              "front",
                                              item.is_primary
                                            )
                                          }
                                          className="image-btn-close"
                                        >
                                          X
                                        </span>
                                        <Image src={item.thumbnail} thumbnail />
                                      </span>
                                    );
                                  })}
                          </Col>

                          <Col
                            className="   preview-images-list"
                            lg={6}
                            md={12}
                            sm={12}
                          >
                            {this.state?.primary_photo?.some(
                              (fitler) => fitler.fileName === "rear"
                            )
                              ? this.state.primary_photo
                                  ?.filter(
                                    (fitler) => fitler.fileName === "rear"
                                  )
                                  .map((item, index) => {
                                    return (
                                      <span
                                        key={index}
                                        className="image-container d-flex justify-content-center"
                                      >
                                        <span
                                          onClick={() =>
                                            this.handleDeletePhoto(
                                              item,
                                              "primary_photo"
                                            )
                                          }
                                          className="image-btn-close"
                                        >
                                          X
                                        </span>
                                        <Image src={item.Preview} thumbnail />
                                      </span>
                                    );
                                  })
                              : this.state?.images
                                  ?.filter((fitler) => fitler.is_primary === 6)
                                  ?.map((item, index) => {
                                    return (
                                      <span
                                        key={index}
                                        className="image-container d-flex justify-content-center"
                                      >
                                        <span
                                          onClick={() =>
                                            this.handleDeletePhotoOnServer(
                                              item.id,
                                              "rear",
                                              item.is_primary
                                            )
                                          }
                                          className="image-btn-close"
                                        >
                                          X
                                        </span>
                                        <Image src={item.thumbnail} thumbnail />
                                      </span>
                                    );
                                  })}
                          </Col>

                          <Col lg={6} md={12} sm={12}>
                            <Form.Label className="sell-form-label">
                              {" "}
                              Driver's Side
                            </Form.Label>
                            <Form.Group
                              className="mb-1"
                              controlId="driver_s_side  "
                            >
                              <Form.Control
                                name="driver_s_side"
                                onChange={(e) => this.handleImageChange(e)}
                                className="ts-input"
                                type="file"
                                placeholder=" Driver's Side   "
                                accept=".png, .jpg, .jpeg"
                              />
                            </Form.Group>
                          </Col>
                          <Col lg={6} md={12} sm={12}>
                            <Form.Label className="sell-form-label">
                              {" "}
                              Passenger's Side
                            </Form.Label>
                            <Form.Group
                              className="mb-1"
                              controlId="  Passenger's Side  "
                            >
                              <Form.Control
                                name="passenger_s_side"
                                onChange={(e) => this.handleImageChange(e)}
                                className="ts-input"
                                type="file"
                                placeholder="   Passenger's Side  "
                                accept=".png, .jpg, .jpeg"
                              />
                            </Form.Group>
                          </Col>

                          <Col
                            className="   preview-images-list"
                            lg={6}
                            md={12}
                            sm={12}
                          >
                            {this.state?.primary_photo?.some(
                              (fitler) => fitler.fileName === "driver_s_side"
                            )
                              ? this.state.primary_photo
                                  ?.filter(
                                    (fitler) =>
                                      fitler.fileName === "driver_s_side"
                                  )
                                  .map((item, index) => {
                                    return (
                                      <span
                                        key={index}
                                        className="image-container d-flex justify-content-center"
                                      >
                                        <span
                                          onClick={() =>
                                            this.handleDeletePhoto(
                                              item,
                                              "primary_photo"
                                            )
                                          }
                                          className="image-btn-close"
                                        >
                                          X
                                        </span>
                                        <Image src={item.Preview} thumbnail />
                                      </span>
                                    );
                                  })
                              : this.state?.images
                                  ?.filter((fitler) => fitler.is_primary === 7)
                                  ?.map((item, index) => {
                                    return (
                                      <span
                                        key={index}
                                        className="image-container d-flex justify-content-center"
                                      >
                                        <span
                                          onClick={() =>
                                            this.handleDeletePhotoOnServer(
                                              item.id,
                                              "front",
                                              item.is_primary
                                            )
                                          }
                                          className="image-btn-close"
                                        >
                                          X
                                        </span>
                                        <Image src={item.thumbnail} thumbnail />
                                      </span>
                                    );
                                  })}
                          </Col>

                          <Col
                            className="   preview-images-list"
                            lg={6}
                            md={12}
                            sm={12}
                          >
                            {this.state?.primary_photo?.some(
                              (fitler) => fitler.fileName === "passenger_s_side"
                            )
                              ? this.state.primary_photo
                                  ?.filter(
                                    (fitler) =>
                                      fitler.fileName === "passenger_s_side"
                                  )
                                  .map((item, index) => {
                                    return (
                                      <span
                                        key={index}
                                        className="image-container d-flex justify-content-center"
                                      >
                                        <span
                                          onClick={() =>
                                            this.handleDeletePhoto(
                                              item,
                                              "primary_photo"
                                            )
                                          }
                                          className="image-btn-close"
                                        >
                                          X
                                        </span>
                                        <Image src={item.Preview} thumbnail />
                                      </span>
                                    );
                                  })
                              : this.state?.images
                                  ?.filter((fitler) => fitler.is_primary === 8)
                                  ?.map((item, index) => {
                                    return (
                                      <span
                                        key={index}
                                        className="image-container d-flex justify-content-center"
                                      >
                                        <span
                                          onClick={() =>
                                            this.handleDeletePhotoOnServer(
                                              item.id,
                                              "rear",
                                              item.is_primary
                                            )
                                          }
                                          className="image-btn-close"
                                        >
                                          X
                                        </span>
                                        <Image src={item.thumbnail} thumbnail />
                                      </span>
                                    );
                                  })}
                          </Col>
                        </Row>

                        <Row className=" mt-2 ">
                          <Col lg={12} md={12} sm={12}>
                            <h5 className="car-list-title-simple mt-3">
                              360° Images
                            </h5>
                          </Col>
                          <Col lg={6} md={12} sm={12}>
                            <Form.Label className="sell-form-label">
                              {" "}
                              Upload 360° Images
                            </Form.Label>
                            <Form.Group
                              className="mb-1"
                              controlId=" Additional Photos"
                            >
                              <Form.Control
                                name="additional_photos"
                                onChange={(e) => this.handleImageChange(e)}
                                className="ts-input"
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                placeholder="   Additional Photos*"
                              />
                            </Form.Group>
                          </Col>
                          <Col
                            className="   preview-images-list"
                            lg={6}
                            md={12}
                            sm={12}
                          >
                            {this.state?.additional_photos?.length > 0
                              ? this.state.additional_photos?.map(
                                  (item, index) => {
                                    return (
                                      <span
                                        key={index}
                                        className="image-container"
                                      >
                                        <span
                                          onClick={() =>
                                            this.handleDeletePhoto(
                                              item,
                                              "additional_photos"
                                            )
                                          }
                                          className="image-btn-close"
                                        >
                                          X
                                        </span>
                                        <Image src={item.Preview} thumbnail />
                                      </span>
                                    );
                                  }
                                )
                              : this.state?.images360
                                  ?.filter((fitler) => fitler.is_primary === 0)
                                  ?.map((item, index) => {
                                    return (
                                      <span
                                        key={index}
                                        className="image-container d-flex justify-content-center"
                                      >
                                        <span
                                          onClick={() =>
                                            this.handleDeletePhotoOnServer(
                                              item.id,
                                              "front",
                                              item.is_primary
                                            )
                                          }
                                          className="image-btn-close"
                                        >
                                          X
                                        </span>
                                        <Image src={item.image} thumbnail />
                                      </span>
                                    );
                                  })}
                          </Col>
                        </Row>

                        <div className="d-flex  justify-content-center algin-items-center mt-4 ">
                          <Button
                            onClick={(e) => this.handlePreviousStep(e)}
                            className="btn-next "
                            variant="primary"
                          >
                            Back
                          </Button>
                          {this.props.user?.isLogin ? (
                            <React.Fragment>
                              <Button
                                className="btn-next btn-margin-left"
                                variant="primary"
                                type="submit"
                                value="draft"
                                onClick={() =>
                                  this.setState({ btnType: "draft" })
                                }
                              >
                                Save As Draft
                              </Button>
                              <Button
                                className="btn-next btn-margin-left"
                                variant="primary"
                                type="submit"
                                value="publish"
                                onClick={() =>
                                  this.setState({ btnType: "publish" })
                                }
                              >
                                Submit
                              </Button>
                            </React.Fragment>
                          ) : (
                            ""
                          )}
                        </div>
                      </Form>
                      <Row>
                        {!this.props.user?.isLogin ? (
                          <Col lg={12} md={12} sm={12}>
                            <label className="d-flex mt-3">
                              <span className="mr-2  ">
                                {" "}
                                Already Have Account{" "}
                              </span>
                              <Switch
                                className=" "
                                onChange={() =>
                                  this.setState({
                                    alredyHaveAccount:
                                      !this.state.alredyHaveAccount,
                                  })
                                }
                                checked={this.state.alredyHaveAccount}
                              />
                            </label>
                            {this.state.alredyHaveAccount ? (
                              <React.Fragment>
                                <h5 className="car-list-title-simple mt-4 mb-4">
                                  Login Now
                                </h5>

                                <Login isNavBar={false} {...this.props} />
                              </React.Fragment>
                            ) : (
                              <React.Fragment>
                                <h5 className="car-list-title-simple mt-4 mb-4">
                                  Register Now
                                </h5>

                                <Registrationhero
                                  isNavBar={false}
                                  {...this.props}
                                />
                              </React.Fragment>
                            )}
                          </Col>
                        ) : (
                          ""
                        )}
                      </Row>
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                  {/* step 6 Final Details   started ended */}
                </div>
              </Col>
            )}
          </Row>
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
const mapDispatchToProps = () => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(YourCarForm);
