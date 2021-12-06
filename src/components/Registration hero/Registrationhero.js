import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Tab,
  Image,
} from "react-bootstrap";
import Tabs from "react-bootstrap/Tabs";
import NavBar from "../../views/_partials/navbar";
import { Link } from "react-router-dom";
import Logo from "../../assets/imgs/png/nav/logo.png";
import axios from "axios";
import APIConfig from "../../helpers/api/config";
import { toast } from "react-toastify";
import { CarMake } from "../../helpers/contraints";
import { validateMaxLength } from "../../helpers/validation";
class RegistrationHero extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      user_type: "",
      phone: "",
      address: "",

      state: "",
      city: "",

      dealerName: "",
      car_make: "",
      companywebsite: "",
      primary_photo: [],

      loading: false,
      showNavBar: true,
      latitude: null,
      longitude: null,
      key: "Car Owner",
    };
  }
  resetForm = () => {
    this.setState({
      email: "",
      password: "",
      user_type: "",
      confirmPassword: "",
      name: "",
      loading: false,
    });
  };

  GetLocationCoordinates = () => {
 
    var that = this;
    const showPosition = (position) => {
      that.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  handleRegistration = async () => {
    var FormData = require("form-data");
    var data = new FormData();
    data.append("name", this.state.name);
    data.append("email", this.state.email);
    data.append("password", this.state.password);
    data.append("user_type", this.state.key);
    data.append("address", this.state.address);
    data.append("phone", this.state.phone);
    data.append("latitude", this.state?.latitude);
    data.append("longitude", this.state?.longitude);

    var temp_primary_photo = this.state.primary_photo.map((val) => {
      return val;
    });
    for (let i = 0; i < temp_primary_photo.length; i++) {
      if (temp_primary_photo[i].fileName === "license") {
        data.append("license[" + 0 + "]", temp_primary_photo[i].file);
      } else if (temp_primary_photo[i].fileName === "dealer_image") {
        data.append("dealer_image[" + 0 + "]", temp_primary_photo[i].file);
      }
    }



    if (this.state.key === "Car Owner") {
      data.append("state", this.state.state);
      data.append("city", this.state.city);
    } else {
      data.append("dealername", this.state.dealerName);
      data.append("companywebsite", this.state.companywebsite);
      data.append("car_make", this.state.car_make);
    
    }

    try {
      const response = await axios(APIConfig("post", "/register", data));
      if (response.status === 200) {
        var reduxData = response.data.data;
        reduxData["isLogin"] = true;
        this.props.UserHandler(reduxData);
        toast.success("Successfully Registered", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
        if (this.state?.showNavBar || reduxData?.user_type==="Car Dealer") {
          this.props.history.push("/dashboard");
        }
        this.resetForm();
      } else if (response.status === 300) {
        toast.warn("Email already Exist", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
      }
    } catch (error) {  
        toast.warn("Email already Exist ", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
     
     
      console.log(error);
      this.resetForm();
    }
  };
  handleImageChange(e) {
    e.preventDefault();
    // this.GetLocationCoordinates();
    // del if exist previous
    this.state.primary_photo?.map((item, index) => {
      if (item.fileName === e.target.name) {
        return this.handleDeletePhoto(item, "primary_photo");
      }
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
  handleDeletePhoto = (item, fileName) => {
    this.setState({
      primary_photo: this.state.primary_photo.filter(function (val) {
        return val.file !== item.file;
      }),
    });
  };
  validatePassword = () => {
    if (this.state.password !== this.state.confirmPassword) {
      toast.warn("Confirm Password does not match with Password", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
      return false;
    } else {
   return true
    }
  };

  validatePicture = () => {
    if (!this.state.primary_photo.length > 0   ) {
      toast.warn("Please Upload Image", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
      return false;
    } else {
   return true
    }
  };

  
  handleSubmit = async (e) => {
    this._isMounted = true;
    e.preventDefault();
    // this.GetLocationCoordinates();
    // const testData={
    //   name   :this.state.name,
    //   email   :this.state.email,
    //   password  :this.state.password,
    //   state  : this.state.state,
    //   city  : this.state.city,
    //   address:this.state.address,
    //   phone:this.state.phone,
    //   user_type:this.state.key
    // }
    // const testData={
    //   name   :this.state.name,
    //   email   :this.state.email,
    //   password  :this.state.password,
    //   dealerName  : this.state.dealerName,
    //   companywebsite : this.state.companywebsite,
    //   car_make  : this.state.car_make,
    //   address:this.state.address,
    //   phone:this.state.phone,
    //   user_type:this.state.key,
    //   license:this.state.primary_photo[0].file
    // }

    // alert(JSON.stringify(testData))
    if (this.validatePassword() && this.validatePicture()) {
      this.setState({ loading: true });
      this.handleRegistration();
    }
  };
  componentDidMount() {
    if (!this.props?.isNavBar) {
      this.setState({ showNavBar: this.props?.isNavBar });
    }
    // this.GetLocationCoordinates();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div
        className={this.state?.showNavBar ? "registration-hero-section" : ""}
      >
        <React.Fragment>
          {this.state?.showNavBar ? (
            <NavBar {...this.props} showSvg={true} />
          ) : (
            ""
          )}
          <Container>
            <Row className="d-flex justify-content-center align-items-center section-registration-t-b-padding">
              <Col
                lg={this.state?.showNavBar ? "7" : "12"}
                md={12}
                sm={12}
                className="registration-scroll"
              >
                {this.state?.showNavBar ? (
                  <div className="d-flex justify-content-center login-header-container algin-center ">
                    <Link to="/">
                      {" "}
                      <img className=" " src={Logo} alt="social1" />
                    </Link>
                  </div>
                ) : (
                  ""
                )}
                <Tabs
                  id="controlled-tab-example"
                  activeKey={this.state.key}
                  onSelect={(k) => this.setState({ key: k })}
                  className="tab-bg"
                >
                  <Tab eventKey="Car Owner" title="Owner" className="tab-color">




                  {/* <Formik
                    onSubmit={this.nextHandler}
                    initialValues={{
                      appliance: this.state.appliance,
                    }}
                    validationSchema={formSchema}
                  >
                    {({ errors, touched }) => (

                    <Form
                      onSubmit={(e) => {
                        this.handleSubmit(e);
                      }}
                      className={
                        this.state?.showNavBar ? "login-hero-container" : ""
                      }
                    >
        </Form>
                    )}
                  </Formik> */}

                    <Form
                      onSubmit={(e) => {
                        this.handleSubmit(e);
                      }}
                      className={
                        this.state?.showNavBar ? "login-hero-container" : ""
                      }
                    >
                      <Row>
                        <Col lg={6} sm={12} md={12}>
                          <Form.Group className="mb-3" controlId="name">
                            <Form.Control
                              value={this.state.name || ""}
                              onChange={(e) =>
                                this.setState({ name: e.target.value })
                              }
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
                              onChange={(e) =>
                                this.setState({ email: e.target.value })
                              }
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
                              value={"" || this.state.state}
                              onChange={(e) =>
                                this.setState({ state: e.target.value })
                              }
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
                              value={"" || this.state.city}
                              onChange={(e) =>
                                this.setState({ city: e.target.value })
                              }
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
                              value={"" || this.state.phone}
                              onChange={(e) =>
                                validateMaxLength(e.target.value,7)? this.setState({ phone:e.target.value  }):""
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

                      <Row>
                        <Col lg={6} sm={12} md={12}>
                          <Form.Group className="mb-3" controlId="password">
                            <Form.Control
                              value={this.state.password || ""}
                               pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
                                onChange={(e) =>
                                this.setState({ password: e.target.value })
                              }
                              required
                              name="password"
                              className="ts-input"
                              type="password"
                              placeholder="Password"
                            />
                          </Form.Group>
                          <small style={{color:"black",fontSize:"10px"}}>Password must contain uppercase,special character, lower case and number</small>
                        </Col>
                        <Col lg={6} sm={12} md={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="confirmPassword"
                          >
                            <Form.Control
                              value={this.state.confirmPassword || ""}
                              onChange={(e) =>
                                this.setState({
                                  confirmPassword: e.target.value,
                                })
                              }
                              required
                              onBlur={() => this.validatePassword()}
                              name="confirmPassword"
                              className="ts-input"
                              type="password"
                              placeholder="Confirm Password"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={6} md={12} sm={12}>
                          <Form.Label style={{color:"black"}} className="sell-form-label">
                            Owner Image
                          </Form.Label>
                          <Form.Group className="mb-3" controlId="dealer_image1">
                            <Form.Control
                              name="dealer_image"
                              onChange={(e) => this.handleImageChange(e)}
                              className="ts-input"
                              type="file"
                              accept=".png, .jpg, .jpeg"
                            />
                          </Form.Group>
                        </Col>
                        <Col
                          lg={6}
                          md={12}
                          sm={12}
                          className="preview-images-list"
                          style={{ paddingTop: "unset" }}
                        >
                          {this.state.primary_photo?.map((item, index) => {
                            if (item.fileName === "dealer_image") {
                              return (
                                <span
                                  key={index}
                                  className="image-container d-flex justify-content-center"
                                >
                                  <Image src={item.Preview} thumbnail />
                                </span>
                              );
                            }
                          })}
                        </Col>
                      </Row>






















                      {/* <Form.Group className="mb-3  " controlId="cardOwner">
                        <Form.Check
                          value={
                            this.state.user_type === "owner" ? true : false
                          }
                          onChange={(e) =>
                            this.setState({
                              user_type: e.target.checked ? "Car Owner" : "",
                            })
                          }
                          name="user_type"
                          type="radio"
                          className="ts-bbg-text-color"
                          required
                          label="Car Owner"
                        />

                        <Form.Check
                          value={
                            this.state.user_type === "dealer" ? true : false
                          }
                          onChange={(e) =>
                            this.setState({
                              user_type: e.target.checked ? "Car Dealer" : "",
                            })
                          }
                          name="user_type"
                          type="radio"
                          className="ts-bbg-text-color"
                          required
                          label="Car Dealer"
                        />
                      </Form.Group> */}
                      <div className="d-flex justify-content-flex-start">
                        <Link className="ts-bbg-text-color" to="/login">
                          {" "}
                          Already a member ?
                        </Link>
                      </div>
                      <div className="  justify-content-center algin-center mt-4 ">
                        {!this.state.loading ? (
                          <Button
                            className="ts-btn-register-btn"
                            variant="primary"
                            type="submit"
                          >
                            Register
                          </Button>
                        ) : (
                          <Button
                            disabled
                            className="ts-btn"
                            variant="primary"
                            type="submit"
                          >
                            <Spinner
                              animation="grow"
                              variant="dark"
                              size="md"
                            />
                          </Button>
                        )}
                      </div>
                    </Form>
                  </Tab>

                  <Tab eventKey="Car Dealer" title="Dealer">
                    <Form
                      onSubmit={(e) => {
                        this.handleSubmit(e);
                      }}
                      className={
                        this.state?.showNavBar ? "login-hero-container" : ""
                      }
                    >
                      <Row>
                        <Col lg={6} sm={12} md={12}>
                          <Form.Group className="mb-3" controlId="name">
                            <Form.Control
                              value={this.state.name || ""}
                              onChange={(e) =>
                                this.setState({ name: e.target.value })
                              }
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
                              onChange={(e) =>
                                this.setState({ email: e.target.value })
                              }
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
                               
                              value={"" || this.state.phone}
                              onChange={(e) =>
                                validateMaxLength(e.target.value,7)? this.setState({ phone:e.target.value  }):""
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
                          <Form.Group className="mb-3" controlId="dealerName">
                            <Form.Control
                              className="ts-input"
                              name="dealerName"
                              value={"" || this.state.dealerName}
                              onChange={(e) =>
                                this.setState({ dealerName: e.target.value })
                              }
                              type="text"
                              placeholder="Dealer Name"
                            />
                          </Form.Group>
                        </Col>
                        <Col lg={6} sm={12} md={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="companywebsite"
                          >
                            <Form.Control
                              className="ts-input"
                              name="companywebsite"
                              value={"" || this.state.companywebsite}
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
                              value={"" || this.state.car_make}
                              onChange={(e) =>
                                this.setState({ car_make: e.target.value })
                              }
                              className="ts-input mb-3"
                              defaultValue="  Car Make"
                            >
                              <option>Car Make </option>
                              {CarMake?.map((item, index) => (
                                <option value={item}>{item}</option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col lg={6} sm={12} md={12}>
                          <Form.Group className="mb-3" controlId="password">
                            <Form.Control
                              value={this.state.password || ""}
                              pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$" 
                              onChange={(e) =>
                                this.setState({ password: e.target.value })
                              }
                              required
                              name="password"
                              className="ts-input"
                              type="password"
                              placeholder="Password"
                            />
                          </Form.Group>
                          <small style={{color:"black",fontSize:"10px"}}>Password must contain uppercase,special character, lower case and number</small>
                          
                        </Col>
                        <Col lg={6} sm={12} md={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="confirmPassword"
                          >
                            <Form.Control
                              value={this.state.confirmPassword || ""}
                              onChange={(e) =>
                                this.setState({
                                  confirmPassword: e.target.value,
                                })
                              }
                              required
                              onBlur={() => this.validatePassword()}
                              name="confirmPassword"
                              className="ts-input"
                              type="password"
                              placeholder="Confirm Password"
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col lg={6} md={12} sm={12}>
                          <Form.Label className="sell-form-label">
                            Copy of State mandated dealers license
                          </Form.Label>
                          <Form.Group className="mb-3" controlId="license">
                            <Form.Control
                              name="license"
                              onChange={(e) => this.handleImageChange(e)}
                              className="ts-input"
                              type="file"
                            />
                          </Form.Group>
                        </Col>
                        <Col
                          lg={6}
                          md={12}
                          sm={12}
                          className="preview-images-list"
                          style={{ paddingTop: "unset" }}
                        >
                          {this.state.primary_photo?.map((item, index) => {
                            if (item.fileName === "license") {
                              return (
                                <span
                                  key={index}
                                  className="image-container d-flex justify-content-center"
                                >
                                  <Image src={item.Preview} thumbnail />
                                </span>
                              );
                            }
                          })}
                        </Col>
                      </Row>

                      <Row>
                        <Col lg={6} md={12} sm={12}>
                          <Form.Label className="sell-form-label">
                            Dealer Image
                          </Form.Label>
                          <Form.Group className="mb-3" controlId="license">
                            <Form.Control
                              name="dealer_image"
                              onChange={(e) => this.handleImageChange(e)}
                              className="ts-input"
                              type="file"
                            />
                          </Form.Group>
                        </Col>
                        <Col
                          lg={6}
                          md={12}
                          sm={12}
                          className="preview-images-list"
                          style={{ paddingTop: "unset" }}
                        >
                          {this.state.primary_photo?.map((item, index) => {
                            if (item.fileName === "dealer_image") {
                              return (
                                <span
                                  key={index}
                                  className="image-container d-flex justify-content-center"
                                >
                                  <Image src={item.Preview} thumbnail />
                                </span>
                              );
                            }
                          })}
                        </Col>
                      </Row>

                      {/* <Form.Group className="mb-3  " controlId="cardOwner">
                        <Form.Check
                          value={
                            this.state.user_type === "owner" ? true : false
                          }
                          onChange={(e) =>
                            this.setState({
                              user_type: e.target.checked ? "Car Owner" : "",
                            })
                          }
                          name="user_type"
                          type="radio"
                          className="ts-bbg-text-color"
                          required
                          label="Car Owner"
                        />

                        <Form.Check
                          value={
                            this.state.user_type === "dealer" ? true : false
                          }
                          onChange={(e) =>
                            this.setState({
                              user_type: e.target.checked ? "Car Dealer" : "",
                            })
                          }
                          name="user_type"
                          type="radio"
                          className="ts-bbg-text-color"
                          required
                          label="Car Dealer"
                        />
                      </Form.Group> */}
                      <div className="d-flex justify-content-flex-start">
                        <Link className="ts-bbg-text-color" to="/register">
                          {" "}
                          Already a member ?
                        </Link>
                      </div>
                      <div className="  justify-content-center algin-center mt-4 ">
                        {!this.state.loading ? (
                          <Button
                            className="ts-btn-register-btn"
                            variant="primary"
                            type="submit"
                          >
                            Register
                          </Button>
                        ) : (
                          <Button
                            disabled
                            className="ts-btn"
                            variant="primary"
                            type="submit"
                          >
                            <Spinner
                              animation="grow"
                              variant="dark"
                              size="md"
                            />
                          </Button>
                        )}
                      </div>
                    </Form>
                  </Tab>
                </Tabs>
              </Col>
            </Row>
          </Container>
        </React.Fragment>
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
  return {
    UserHandler: (value) => dispatch({ type: "USER", value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationHero);













































































// import React, { Component } from "react";
// import { connect } from "react-redux";
// import {
//   Container,
//   Row,
//   Col,
//   Form,
//   Button,
//   Spinner,
//   Tab,
//   Image,
// } from "react-bootstrap";
// import * as Yup from "yup";
// import { Formik, Field } from "formik";
// import Tabs from "react-bootstrap/Tabs";
// import NavBar from "../../views/_partials/navbar";
// import { Link } from "react-router-dom";
// import Logo from "../../assets/imgs/png/nav/logo.png";
// import axios from "axios";
// import APIConfig from "../../helpers/api/config";
// import { toast } from "react-toastify";
// import { CarMake } from "../../helpers/contraints";

// const formSchema = Yup.object().shape({
//   name: Yup.string().required("Required"),
//   email: Yup.string().email().required("Required"),
// });
// class RegistrationHero extends Component {
//   _isMounted = false;
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       user_type: "",
//       phone: "",
//       address: "",

//       state: "",
//       city: "",

//       dealerName: "",
//       car_make: "",
//       companywebsite: "",
//       primary_photo: [],

//       loading: false,
//       showNavBar: true,
//       latitude: null,
//       longitude: null,
//       key: "Car Owner",
//     };
//   }
//   resetForm = () => {
//     this.setState({
//       email: "",
//       password: "",
//       user_type: "",
//       confirmPassword: "",
//       name: "",
//       loading: false,
//     });
//   };

//   GetLocationCoordinates = () => {
 
//     var that = this;
//     const showPosition = (position) => {
//       that.setState({
//         latitude: position.coords.latitude,
//         longitude: position.coords.longitude,
//       });
//     };
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(showPosition);
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   };

//   handleRegistration = async () => {
//     var FormData = require("form-data");
//     var data = new FormData();
//     data.append("name", this.state.name);
//     data.append("email", this.state.email);
//     data.append("password", this.state.password);
//     data.append("user_type", this.state.key);
//     data.append("address", this.state.address);
//     data.append("phone", this.state.phone);
//     data.append("latitude", this.state?.latitude);
//     data.append("longitude", this.state?.longitude);

//     var temp_primary_photo = this.state.primary_photo.map((val) => {
//       return val;
//     });
//     for (let i = 0; i < temp_primary_photo.length; i++) {
//       if (temp_primary_photo[i].fileName === "license") {
//         data.append("license[" + 0 + "]", temp_primary_photo[i].file);
//       } else if (temp_primary_photo[i].fileName === "dealer_image") {
//         data.append("dealer_image[" + 0 + "]", temp_primary_photo[i].file);
//       }
//     }



//     if (this.state.key === "Car Owner") {
//       data.append("state", this.state.state);
//       data.append("city", this.state.city);
//     } else {
//       data.append("dealername", this.state.dealerName);
//       data.append("companywebsite", this.state.companywebsite);
//       data.append("car_make", this.state.car_make);
    
//     }

//     try {
//       const response = await axios(APIConfig("post", "/register", data));
//       if (response.status === 200) {
//         var reduxData = response.data.data;
//         reduxData["isLogin"] = true;
//         this.props.UserHandler(reduxData);
//         toast.success("Successfully Registered", {
//           position: toast.POSITION.TOP_RIGHT,
//           autoClose: 1500,
//         });
//         if (this.state?.showNavBar || reduxData?.user_type==="Car Dealer") {
//           this.props.history.push("/dashboard");
//         }
//         this.resetForm();
//       } else if (response.status === 300) {
//         toast.warn("Email already Exist", {
//           position: toast.POSITION.TOP_RIGHT,
//           autoClose: 1500,
//         });
//       }
//     } catch (error) {
//       toast.warn("Failed to create new user  ", {
//         position: toast.POSITION.TOP_RIGHT,
//         autoClose: 1500,
//       });
//       console.log(error);
//       this.resetForm();
//     }
//   };
//   handleImageChange(e) {
//     e.preventDefault();
//     // this.GetLocationCoordinates();
//     // del if exist previous
//     this.state.primary_photo?.map((item, index) => {
//       if (item.fileName === e.target.name) {
//         return this.handleDeletePhoto(item, "primary_photo");
//       }
//     });
//     let files = Array.from(e.target.files);
//     files.forEach((file) => {
//       let reader = new FileReader();
//       reader.onloadend = () => {
//         const Preview = reader.result;
//         const fileName = e.target.name;
//         var joined = this.state.primary_photo.concat({
//           file,
//           Preview,
//           fileName,
//         });
//         this.setState({ primary_photo: joined });
//         console.log(joined);
//       };
//       reader.readAsDataURL(file);
//     });
//   }
//   handleDeletePhoto = (item, fileName) => {
//     this.setState({
//       primary_photo: this.state.primary_photo.filter(function (val) {
//         return val.file !== item.file;
//       }),
//     });
//   };
//   validatePassword = () => {
//     if (this.state.password !== this.state.confirmPassword) {
//       toast.warn("Confirm Password does not match with Password", {
//         position: toast.POSITION.TOP_RIGHT,
//         autoClose: 1500,
//       });
//       return false;
//     } else {
//       return true;
//     }
//   };
//   handleSubmit = async (e) => {
//     this._isMounted = true;
//     e.preventDefault();
//     // this.GetLocationCoordinates();
//     // const testData={
//     //   name   :this.state.name,
//     //   email   :this.state.email,
//     //   password  :this.state.password,
//     //   state  : this.state.state,
//     //   city  : this.state.city,
//     //   address:this.state.address,
//     //   phone:this.state.phone,
//     //   user_type:this.state.key
//     // }
//     // const testData={
//     //   name   :this.state.name,
//     //   email   :this.state.email,
//     //   password  :this.state.password,
//     //   dealerName  : this.state.dealerName,
//     //   companywebsite : this.state.companywebsite,
//     //   car_make  : this.state.car_make,
//     //   address:this.state.address,
//     //   phone:this.state.phone,
//     //   user_type:this.state.key,
//     //   license:this.state.primary_photo[0].file
//     // }

//     // alert(JSON.stringify(testData))
//     if (this.validatePassword()) {
//       this.setState({ loading: true });
//       this.handleRegistration();
//     }
//   };
//   componentDidMount() {
//     if (!this.props?.isNavBar) {
//       this.setState({ showNavBar: this.props?.isNavBar });
//     }
//     // this.GetLocationCoordinates();
//   }
//   componentWillUnmount() {
//     this._isMounted = false;
//   }

//   render() {
//     return (
//       <div
//         className={this.state?.showNavBar ? "registration-hero-section" : ""}
//       >
//         <React.Fragment>
//           {this.state?.showNavBar ? (
//             <NavBar {...this.props} showSvg={true} />
//           ) : (
//             ""
//           )}
//           <Container>
//             <Row className="d-flex justify-content-center align-items-center section-registration-t-b-padding">
//               <Col
//                 lg={this.state?.showNavBar ? "7" : "12"}
//                 md={12}
//                 sm={12}
//                 className="registration-scroll"
//               >
//                 {this.state?.showNavBar ? (
//                   <div className="d-flex justify-content-center login-header-container algin-center ">
//                     <Link to="/">
//                       {" "}
//                       <img className=" " src={Logo} alt="social1" />
//                     </Link>
//                   </div>
//                 ) : (
//                   ""
//                 )}
//                 <Tabs
//                   id="controlled-tab-example"
//                   activeKey={this.state.key}
//                   onSelect={(k) => this.setState({ key: k })}
//                   className="tab-bg"
//                 >
//                   <Tab eventKey="Car Owner" title="Owner" className="tab-color">
     
//                   <Formik
//                     onSubmit={this.handleSubmit}
//                     initialValues={{
//                       name: this.state.name,
//                       email: this.state.email,
//                       password: this.state.password,
//                       confirmPassword:this.state.confirmPassword, 
//                       phone: this.state.phone,
//                       address: this.state.address, 
//                       state: this.state.state,
//                       city:this.state.city,
//                     }}
//                     validationSchema={formSchema}
//                   >
//                     {({ errors, touched }) => (
//                     //   <Form className="w-100 text-center"> 
//                     //    <FormGroup onChange={(e) => this.setState({ name: e.target.value })}>
//                     //       <Field name="name" type="text" placeholder="Name" id="name" className={`form-control ${errors.name && touched.name && "is-invalid"}`} />
//                     //       {errors.name && touched.name ? <div className="text-danger">{errors.name && touched.name}</div> : null}
//                     //     </FormGroup>
                        
//                     //       <Button type="submit" className="mt-2   polar-btn-bg" size="lg">
//                     //         Next
//                     //  </Button>
                       
//                     //  </Form>



//                     <Form
//                     // onSubmit={(e) => {
//                     //   this.handleSubmit(e);
//                     // }}
//                     className={
//                       this.state?.showNavBar ? "login-hero-container" : ""
//                     }
//                   >
//                     <Row>
//                       <Col lg={6} sm={12} md={12}>
//                         <Form.Group  onChange={(e) =>
//                               this.setState({ name: e.target.value })
//                             } className="mb-3" controlId="name">
//                           <Field
//                             // value={this.state.name || ""} 
//                             className={`ts-input ${errors.name && touched.name && "is-invalid"}`}
//                             name="name" 
//                             type="text"
//                             placeholder="Name"
//                           />
//                            {errors.name && touched.name ? <div className="text-danger">{errors.name && touched.name}</div> : null}
//                         </Form.Group>
//                       </Col>
//                       <Col lg={6} sm={12} md={12}>
//                         <Form.Group   onChange={(e) =>
//                               this.setState({ email: e.target.value })
//                             } className="mb-3" controlId="email">
//                           <Field
//                             // value={this.state.email || ""}
//                           name="email" 
//                             className={`ts-input ${errors.name && touched.name && "is-invalid"}`}
//                             // className="ts-input"
//                             type="email"
//                             placeholder="User Name"
//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>
// {/* 
//                     <Row>
//                       <Col lg={6} sm={12} md={12}>
//                         <Form.Group className="mb-3" controlId="State">
//                           <Form.Control
//                             className="ts-input"
//                             name="state"
//                             required
//                             value={"" || this.state.state}
//                             onChange={(e) =>
//                               this.setState({ state: e.target.value })
//                             }
//                             type="text"
//                             placeholder="State*"
//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col lg={6} sm={12} md={12}>
//                         <Form.Group className="mb-3" controlId="City">
//                           <Form.Control
//                             className="ts-input"
//                             name="city"
//                             required
//                             value={"" || this.state.city}
//                             onChange={(e) =>
//                               this.setState({ city: e.target.value })
//                             }
//                             type="text"
//                             placeholder="City*  "
//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>
//                     <Row>
//                       <Col lg={6} sm={12} md={12}>
//                         <Form.Group className="mb-3" controlId="Phone">
//                           <Form.Control
//                             className="ts-input"
//                             type="text"
//                             required
//                             value={"" || this.state.phone}
//                             onChange={(e) =>
//                               this.setState({ phone: e.target.value })
//                             }
//                             name="phone"
//                             placeholder="Phone*"
//                           />
//                         </Form.Group>
//                       </Col>

//                       <Col lg={6} sm={12} md={12}>
//                         <Form.Group className="mb-3" controlId="address">
//                           <Form.Control
//                             value={this.state.address || ""}
//                             onChange={(e) =>
//                               this.setState({ address: e.target.value })
//                             }
//                             required
//                             name="address"
//                             className="ts-input"
//                             type="textarea"
//                             placeholder="  Address"
//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>

//                     <Row>
//                       <Col lg={6} sm={12} md={12}>
//                         <Form.Group className="mb-3" controlId="password">
//                           <Form.Control
//                             value={this.state.password || ""}
//                             //  pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
//                             onChange={(e) =>
//                               this.setState({ password: e.target.value })
//                             }
//                             required
//                             name="password"
//                             className="ts-input"
//                             type="password"
//                             placeholder="Password"
//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col lg={6} sm={12} md={12}>
//                         <Form.Group
//                           className="mb-3"
//                           controlId="confirmPassword"
//                         >
//                           <Form.Control
//                             value={this.state.confirmPassword || ""}
//                             onChange={(e) =>
//                               this.setState({
//                                 confirmPassword: e.target.value,
//                               })
//                             }
//                             required
//                             onBlur={() => this.validatePassword()}
//                             name="confirmPassword"
//                             className="ts-input"
//                             type="password"
//                             placeholder="Confirm Password"
//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>
//                     <Row>
//                       <Col lg={6} md={12} sm={12}>
//                         <Form.Label style={{color:"black"}} className="sell-form-label">
//                           Owner Image
//                         </Form.Label>
//                         <Form.Group className="mb-3" controlId="dealer_image1">
//                           <Form.Control
//                             name="dealer_image"
//                             onChange={(e) => this.handleImageChange(e)}
//                             className="ts-input"
//                             type="file"
//                             accept=".png, .jpg, .jpeg"
//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col
//                         lg={6}
//                         md={12}
//                         sm={12}
//                         className="preview-images-list"
//                         style={{ paddingTop: "unset" }}
//                       >
//                         {this.state.primary_photo?.map((item, index) => {
//                           if (item.fileName === "dealer_image") {
//                             return (
//                               <span
//                                 key={index}
//                                 className="image-container d-flex justify-content-center"
//                               >
//                                 <Image src={item.Preview} thumbnail />
//                               </span>
//                             );
//                           }
//                         })}
//                       </Col>
//                     </Row> */}






















//                     {/* <Form.Group className="mb-3  " controlId="cardOwner">
//                       <Form.Check
//                         value={
//                           this.state.user_type === "owner" ? true : false
//                         }
//                         onChange={(e) =>
//                           this.setState({
//                             user_type: e.target.checked ? "Car Owner" : "",
//                           })
//                         }
//                         name="user_type"
//                         type="radio"
//                         className="ts-bbg-text-color"
//                         required
//                         label="Car Owner"
//                       />

//                       <Form.Check
//                         value={
//                           this.state.user_type === "dealer" ? true : false
//                         }
//                         onChange={(e) =>
//                           this.setState({
//                             user_type: e.target.checked ? "Car Dealer" : "",
//                           })
//                         }
//                         name="user_type"
//                         type="radio"
//                         className="ts-bbg-text-color"
//                         required
//                         label="Car Dealer"
//                       />
//                     </Form.Group> */}
//                     <div className="d-flex justify-content-flex-start">
//                       <Link className="ts-bbg-text-color" to="/login">
//                         {" "}
//                         Already a member ?
//                       </Link>
//                     </div>
//                     <div className="  justify-content-center algin-center mt-4 ">
//                       {!this.state.loading ? (
//                         <Button
//                           className="ts-btn-register-btn"
//                           variant="primary"
//                           type="submit"
//                         >
//                           Register
//                         </Button>
//                       ) : (
//                         <Button
//                           disabled
//                           className="ts-btn"
//                           variant="primary"
//                           type="submit"
//                         >
//                           <Spinner
//                             animation="grow"
//                             variant="dark"
//                             size="md"
//                           />
//                         </Button>
//                       )}
//                     </div>
//                   </Form>



// // test 
                    
//                     )}
//                   </Formik>
 

                
//                   </Tab>

//                   <Tab eventKey="Car Dealer" title="Dealer">
//                     <Form
//                       onSubmit={(e) => {
//                         this.handleSubmit(e);
//                       }}
//                       className={
//                         this.state?.showNavBar ? "login-hero-container" : ""
//                       }
//                     >
//                       <Row>
//                         <Col lg={6} sm={12} md={12}>
//                           <Form.Group className="mb-3" controlId="name">
//                             <Form.Control
//                               value={this.state.name || ""}
//                               onChange={(e) =>
//                                 this.setState({ name: e.target.value })
//                               }
//                               required
//                               name="name"
//                               className="ts-input"
//                               type="text"
//                               placeholder="Name"
//                             />
//                           </Form.Group>
//                         </Col>
//                         <Col lg={6} sm={12} md={12}>
//                           <Form.Group className="mb-3" controlId="email">
//                             <Form.Control
//                               value={this.state.email || ""}
//                               onChange={(e) =>
//                                 this.setState({ email: e.target.value })
//                               }
//                               required
//                               name="email"
//                               className="ts-input"
//                               type="email"
//                               placeholder="User Name"
//                             />
//                           </Form.Group>
//                         </Col>
//                       </Row>
//                       <Row>
//                         <Col lg={6} sm={12} md={12}>
//                           <Form.Group className="mb-3" controlId="Phone">
//                             <Form.Control
//                               className="ts-input"
//                               type="text"
//                               required
//                               value={"" || this.state.phone}
//                               onChange={(e) =>
//                                 this.setState({ phone: e.target.value })
//                               }
//                               name="phone"
//                               placeholder="Phone*"
//                             />
//                           </Form.Group>
//                         </Col>

//                         <Col lg={6} sm={12} md={12}>
//                           <Form.Group className="mb-3" controlId="address">
//                             <Form.Control
//                               value={this.state.address || ""}
//                               onChange={(e) =>
//                                 this.setState({ address: e.target.value })
//                               }
//                               required
//                               name="address"
//                               className="ts-input"
//                               type="textarea"
//                               placeholder=" Address"
//                             />
//                           </Form.Group>
//                         </Col>
//                       </Row>
//                       <Row>
//                         <Col lg={6} sm={12} md={12}>
//                           <Form.Group className="mb-3" controlId="dealerName">
//                             <Form.Control
//                               className="ts-input"
//                               name="dealerName"
//                               value={"" || this.state.dealerName}
//                               onChange={(e) =>
//                                 this.setState({ dealerName: e.target.value })
//                               }
//                               type="text"
//                               placeholder="Dealer Name"
//                             />
//                           </Form.Group>
//                         </Col>
//                         <Col lg={6} sm={12} md={12}>
//                           <Form.Group
//                             className="mb-3"
//                             controlId="companywebsite"
//                           >
//                             <Form.Control
//                               className="ts-input"
//                               name="companywebsite"
//                               value={"" || this.state.companywebsite}
//                               onChange={(e) =>
//                                 this.setState({
//                                   companywebsite: e.target.value,
//                                 })
//                               }
//                               type="text"
//                               placeholder="Company Website*  "
//                             />
//                           </Form.Group>
//                         </Col>
//                       </Row>

//                       <Row>
//                         <Col lg={12} sm={12} md={12}>
//                           <Form.Group controlId="car_make">
//                             <Form.Select
//                               name="car_make"
//                               required
//                               value={"" || this.state.car_make}
//                               onChange={(e) =>
//                                 this.setState({ car_make: e.target.value })
//                               }
//                               className="ts-input mb-3"
//                               defaultValue="  Car Make"
//                             >
//                               <option>Car Make </option>
//                               {CarMake?.map((item, index) => (
//                                 <option value={item}>{item}</option>
//                               ))}
//                             </Form.Select>
//                           </Form.Group>
//                         </Col>
//                       </Row>

//                       <Row>
//                         <Col lg={6} sm={12} md={12}>
//                           <Form.Group className="mb-3" controlId="password">
//                             <Form.Control
//                               value={this.state.password || ""}
//                               //  pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
//                               onChange={(e) =>
//                                 this.setState({ password: e.target.value })
//                               }
//                               required
//                               name="password"
//                               className="ts-input"
//                               type="password"
//                               placeholder="Password"
//                             />
//                           </Form.Group>
//                         </Col>
//                         <Col lg={6} sm={12} md={12}>
//                           <Form.Group
//                             className="mb-3"
//                             controlId="confirmPassword"
//                           >
//                             <Form.Control
//                               value={this.state.confirmPassword || ""}
//                               onChange={(e) =>
//                                 this.setState({
//                                   confirmPassword: e.target.value,
//                                 })
//                               }
//                               required
//                               onBlur={() => this.validatePassword()}
//                               name="confirmPassword"
//                               className="ts-input"
//                               type="password"
//                               placeholder="Confirm Password"
//                             />
//                           </Form.Group>
//                         </Col>
//                       </Row>

//                       <Row>
//                         <Col lg={6} md={12} sm={12}>
//                           <Form.Label className="sell-form-label">
//                             Copy of State mandated dealers license
//                           </Form.Label>
//                           <Form.Group className="mb-3" controlId="license">
//                             <Form.Control
//                               name="license"
//                               onChange={(e) => this.handleImageChange(e)}
//                               className="ts-input"
//                               type="file"
//                             />
//                           </Form.Group>
//                         </Col>
//                         <Col
//                           lg={6}
//                           md={12}
//                           sm={12}
//                           className="preview-images-list"
//                           style={{ paddingTop: "unset" }}
//                         >
//                           {this.state.primary_photo?.map((item, index) => {
//                             if (item.fileName === "license") {
//                               return (
//                                 <span
//                                   key={index}
//                                   className="image-container d-flex justify-content-center"
//                                 >
//                                   <Image src={item.Preview} thumbnail />
//                                 </span>
//                               );
//                             }
//                           })}
//                         </Col>
//                       </Row>

//                       <Row>
//                         <Col lg={6} md={12} sm={12}>
//                           <Form.Label className="sell-form-label">
//                             Dealer Image
//                           </Form.Label>
//                           <Form.Group className="mb-3" controlId="license">
//                             <Form.Control
//                               name="dealer_image"
//                               onChange={(e) => this.handleImageChange(e)}
//                               className="ts-input"
//                               type="file"
//                             />
//                           </Form.Group>
//                         </Col>
//                         <Col
//                           lg={6}
//                           md={12}
//                           sm={12}
//                           className="preview-images-list"
//                           style={{ paddingTop: "unset" }}
//                         >
//                           {this.state.primary_photo?.map((item, index) => {
//                             if (item.fileName === "dealer_image") {
//                               return (
//                                 <span
//                                   key={index}
//                                   className="image-container d-flex justify-content-center"
//                                 >
//                                   <Image src={item.Preview} thumbnail />
//                                 </span>
//                               );
//                             }
//                           })}
//                         </Col>
//                       </Row>

//                       {/* <Form.Group className="mb-3  " controlId="cardOwner">
//                         <Form.Check
//                           value={
//                             this.state.user_type === "owner" ? true : false
//                           }
//                           onChange={(e) =>
//                             this.setState({
//                               user_type: e.target.checked ? "Car Owner" : "",
//                             })
//                           }
//                           name="user_type"
//                           type="radio"
//                           className="ts-bbg-text-color"
//                           required
//                           label="Car Owner"
//                         />

//                         <Form.Check
//                           value={
//                             this.state.user_type === "dealer" ? true : false
//                           }
//                           onChange={(e) =>
//                             this.setState({
//                               user_type: e.target.checked ? "Car Dealer" : "",
//                             })
//                           }
//                           name="user_type"
//                           type="radio"
//                           className="ts-bbg-text-color"
//                           required
//                           label="Car Dealer"
//                         />
//                       </Form.Group> */}
//                       <div className="d-flex justify-content-flex-start">
//                         <Link className="ts-bbg-text-color" to="/register">
//                           {" "}
//                           Already a member ?
//                         </Link>
//                       </div>
//                       <div className="  justify-content-center algin-center mt-4 ">
//                         {!this.state.loading ? (
//                           <Button
//                             className="ts-btn-register-btn"
//                             variant="primary"
//                             type="submit"
//                           >
//                             Register
//                           </Button>
//                         ) : (
//                           <Button
//                             disabled
//                             className="ts-btn"
//                             variant="primary"
//                             type="submit"
//                           >
//                             <Spinner
//                               animation="grow"
//                               variant="dark"
//                               size="md"
//                             />
//                           </Button>
//                         )}
//                       </div>
//                     </Form>
//                   </Tab>
//                 </Tabs>
//               </Col>
//             </Row>
//           </Container>
//         </React.Fragment>
//       </div>
//     );
//   }
// }
// const mapStateToProps = (state) => {
//   return {
//     user: state.app.user,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     UserHandler: (value) => dispatch({ type: "USER", value: value }),
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(RegistrationHero);
