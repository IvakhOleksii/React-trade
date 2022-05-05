import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "../../views/_partials/navbar";
import ImageViewer360 from "../imageViewer360";
import car3 from "../../assets/imgs/360/car3.jpeg";
import car4 from "../../assets/imgs/360/car4.jpg";
import car5 from "../../assets/imgs/360/car8.jpg";
import car6 from "../../assets/imgs/360/car7.jpg";
import car7 from "../../assets/imgs/360/car6.jpg";
import APIConfig from "../../helpers/api/config";
import { toast } from "react-toastify";
import axios from "axios";
import { validateSingleField } from "../../helpers/validation";
class CarViewerHero extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      images: [
        { image: car4 },
        { image: car5 },
        { image: car6 },
        { image: car7 },
        { image: car3 },
      ],

      step: 1,
      // vin: "5UXKU2C54J0X48668",
      car_details_by_vin: null,

      vin: "",
      drivetrain: "",
      engine: "",
      year: Number,
      make: "",
      model: "",
      state: "",
      city: "",
      zip: "",
      phone: "",

      // Additional Information 2

      mileage: "",
      transmission: "",
      trim: "",
      fuel_type: "",
      body_type: "",
      condition: "",
      exterior_color: "",
      primary_photo: [],
      additional_photos: [],

      // Driveability 3

      vehicle_driving: "",
      transmission_issue: "",
      drivetrain_issue: "",
      steering_issue: "",
      brake_issue: "",
      suspension_issue: "",

      // Exterior 4
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

      // Interior 5

      seat_damage: "",
      carpet_damage: "",
      dashboard_damage: "",
      interior_trim_damage: "",
      sunroof: "",
      navigation: "",
      aftermarket_stereo_equipment: "",
      hvac_not_working: "",
      leather_Or_Leather_type_seats: "",

      // final info  6

      // make: '',
      // model: '', already define
      radius: "",

      loading: false,
      preview: [],
    };
  }
  handleNextStep = (e) => {
    e.preventDefault();

    if (this.props.user?.isLogin) {
      this.setState({ step: this.state.step + 1 });
    } else {
      toast.warning("Please login before proceed .", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1800,
      });
      this.props.history.push("/login");
    }
  };
  handlePreviousStep = (e) => {
    e.preventDefault();
    this.setState({ step: this.state.step - 1 });
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
    } else if (e.target.name === "primary_photo") {
      let files = Array.from(e.target.files);
      files.forEach((file) => {
        let reader = new FileReader();
        reader.onloadend = () => {
          const Preview = reader.result;
          var joined = this.state.primary_photo.concat({ file, Preview });
          this.setState({ primary_photo: joined });
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

    // additional_photos

    var temp_additional_photos = this.state.additional_photos.map((val) => {
      return val.file;
    });
    for (let i = 0; i < temp_additional_photos.length; i++) {
      data.append("additional_photos[" + i + "]", temp_additional_photos[i]);
    }

    // primary_photo

    var temp_primary_photo = this.state.primary_photo.map((val) => {
      return val.file;
    });
    for (let i = 0; i < temp_primary_photo.length; i++) {
      if (this.state.primary_photo.length - 1 === i) {
        data.append("primary_photo[" + i + "]", temp_primary_photo[i]);
      }
    }

    data.append("vin", this.state.vin);
    data.append("mileage", this.state.mileage);
    data.append("transmission", this.state.transmission);
    data.append("trim", this.state.trim);
    data.append("drivetrain", this.state.drivetrain);
    data.append("engine", this.state.engine);
    data.append("fuel_type", this.state.fuel_type);
    data.append("year", this.state.year);
    data.append("make", this.state.make);
    data.append("model", this.state.model);
    data.append("color", this.state.color);
    data.append("user_id", this.props.user.id);
    data.append("body_type", this.state.body_type);
    data.append("condition", this.state.condition);
    data.append("exterior_color", this.state.exterior_color);
    data.append("state", this.state.state);
    data.append("city", this.state.city);
    data.append("zip", this.state.zip);
    data.append("phone", this.state.phone);
    data.append("vehicle_driving", this.state.vehicle_driving);
    data.append("transmission_issue", this.state.transmission_issue);
    data.append("drivetrain_issue", this.state.drivetrain_issue);
    data.append("steering_issue", this.state.steering_issue);
    data.append("brake_issue", this.state.brake_issue);
    data.append("suspension_issue", this.state.suspension_issue);
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
    data.append("seat_damage", this.state.seat_damage);
    data.append("carpet_damage", this.state.carpet_damage);
    data.append("dashboard_damage", this.state.dashboard_damage);
    data.append("interior_trim_damage", this.state.interior_trim_damage);
    data.append("sunroof", this.state.sunroof);
    data.append("navigation", this.state.navigation);
    data.append(
      "aftermarket_stereo_equipment",
      this.state.aftermarket_stereo_equipment
    );
    data.append("hvac_not_working", this.state.hvac_not_working);
    data.append(
      "leather_Or_Leather_type_seats",
      this.state.leather_Or_Leather_type_seats
    );
    data.append("shoping_make", this.state.shoping_make);
    data.append("shoping_model", this.state.shoping_model);
    data.append("radius", this.state.radius);
    try {
      const response = await axios(APIConfig("post", "/trade_your_car", data));
      if (response.status === 200) {
        toast.success("Data submited successFully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        this.setState({ loading: false });
        this.props.history.push("/");
        // this.resetForm()
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
    if (this.props.user?.isLogin) {
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
          this.setState({ loading: false });
        }
      } else {
        toast.warning("Please fill VIN number before proceed.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1800,
        });
      }
    } else {
      toast.warning("Please login before proceed .", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2400,
      });
      this.props.history.push("/login");
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="contact-hero-section ">
        <NavBar {...this.props} />
        <Container className="section-padding">
          <Row>
            <Col lg={12}>
              <ImageViewer360 images={this.state.images} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.app.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(CarViewerHero);
