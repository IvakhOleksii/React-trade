import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import NavBar from "../../views/_partials/navbar";
import { Link } from "react-router-dom";
import Logo from "../../assets/imgs/png/nav/logo.png";
import axios from "axios";
import APIConfig from "../../helpers/api/config";
import { toast } from "react-toastify";
import ForgetPassword from "../forgetPassword";
import { ArrowLeft } from "react-feather";
class LoginHero extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
      showLoginForm: true,
      showNavBar: true,
    };
  }

  resetForm = () => {
    this.setState({ email: "", password: "", loading: false });
  };
  handleLogin = async () => {
    this._isMounted = false;
    var FormData = require("form-data");
    var data = new FormData();
    data.append("email", this.state.email);
    data.append("password", this.state.password);
    try {
      const response = await axios(APIConfig("post", "/login", data));
      if (response.status === 200) {
        var { token, data: reduxData } = response.data;
        reduxData["isLogin"] = true;
        this.props.UserHandler(reduxData);
        this.props.TokenHandler(token);
        toast.success("Login SuccessFully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        this.setState({ loading: false });
        if (this.state?.showNavBar || reduxData?.user_type === "Car Dealer") {
          this.props.history.push("/dashboard");
        }
      }
    } catch (error) {
      const { status } = error.response;
      const errorString =
        status === 320
          ? "Your User Name and password do not match. Please try again."
          : status === 400
          ? "Your account has not been activated. Please check the email account you registered with."
          : "Failed, please try again.";

      toast.error(errorString, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      this.resetForm();
    }
  };
  handleResetPassword = (status) => {
    if (status) {
      this.setState({ showLoginForm: true });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    this.handleLogin();
    this.resetForm();
  };
  componentDidMount() {
    if (!this.props?.isNavBar) {
      this.setState({ showNavBar: this.props?.isNavBar });
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className={this.state?.showNavBar ? "login-hero-section" : ""}>
        {this.state?.showNavBar ? (
          <NavBar {...this.props} showSvg={true} />
        ) : (
          ""
        )}
        <Container>
          <Row
            className={
              this.state?.showNavBar
                ? "d-flex justify-content-center align-items-center section-t-b-padding"
                : "d-flex justify-content-center align-items-center "
            }
          >
            {this.state.showLoginForm ? (
              <Col lg={this.state?.showNavBar ? "5" : "12"} md={12} sm={12}>
                <Form
                  onSubmit={(e) => {
                    this.handleSubmit(e);
                  }}
                  className={
                    this.state?.showNavBar ? "login-hero-container" : ""
                  }
                >
                  {this.state?.showNavBar ? (
                    <React.Fragment>
                      <div className="d-flex justify-content-center login-header-container algin-center mb-4">
                        <Link to="/">
                          {" "}
                          <img className=" " src={Logo} alt="social1" />
                        </Link>
                      </div>
                      <div className="d-flex justify-content-center algin-center mb-2">
                        <h3 className="car-info"> Login </h3>
                      </div>
                    </React.Fragment>
                  ) : (
                    ""
                  )}

                  <Form.Group className="mb-3" controlId="email">
                    <Form.Control
                      value={this.state.email || ""}
                      onChange={(e) => this.setState({ email: e.target.value })}
                      name="email"
                      className="ts-input"
                      required
                      type="email"
                      placeholder="User Name"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Control
                      value={this.state.password || ""}
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                      name="password"
                      className="ts-input"
                      required
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 d-flex justify-content-between"
                    controlId="formBasicCheckbox"
                  >
                    <span
                      className="ts-bbg-text-color"
                      onClick={() => this.setState({ showLoginForm: false })}
                      style={{ cursor: "pointer" }}
                    >
                      Forgot your password ?
                    </span>
                    {this.state?.showNavBar ? (
                      <Link className="ts-bbg-text-color" to="/register">
                        Register
                      </Link>
                    ) : (
                      ""
                    )}
                  </Form.Group>
                  <div className="  justify-content-center algin-center mt-4 ">
                    {!this.state.loading ? (
                      <Button
                        className="ts-btn"
                        variant="primary"
                        type="submit"
                      >
                        Login
                      </Button>
                    ) : (
                      <Button
                        disabled
                        className="ts-btn"
                        variant="primary"
                        type="submit"
                      >
                        <Spinner animation="grow" variant="dark" size="md" />
                      </Button>
                    )}
                  </div>
                </Form>
              </Col>
            ) : (
              <Col lg={this.state?.showNavBar ? "5" : "12"} md={12} sm={12}>
                <div
                  className={
                    this.state?.showNavBar ? "login-hero-container" : ""
                  }
                >
                  {this.state?.showNavBar ? (
                    <React.Fragment>
                      <div className="d-flex justify-content-center login-header-container algin-center mb-4">
                        <Link to="/">
                          {" "}
                          <img className=" " src={Logo} alt="social1" />
                        </Link>
                      </div>
                    </React.Fragment>
                  ) : (
                    ""
                  )}

                  <Col lg={12} md={12} sm={12}>
                    <span
                      onClick={() => this.setState({ showLoginForm: true })}
                      className="btn--back"
                    >
                      <ArrowLeft
                        className="primary p mb-2"
                        size={20}
                        data-tour="toggle-icon"
                      />
                    </span>
                  </Col>
                  <div className="d-flex justify-content-center algin-center mb-2">
                    <h3 className="car-info"> Forget Passowrd </h3>
                  </div>
                  <ForgetPassword
                    afterResetPassword={this.handleResetPassword}
                  />
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
    showAlert: state.app.showAlert,
    alertMessage: state.app.alertMessage,
    alertType: state.app.alertType,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    UserHandler: (value) => dispatch({ type: "USER", value: value }),
    TokenHandler: (value) => dispatch({ type: "TOKEN", value: value }),
    hanleShowAlert: (value) => dispatch({ type: "SHOW_ALERT", value: value }),
    handleAlertMessage: (value) =>
      dispatch({ type: "ALERT_MESSAGE", value: value }),
    handleAlertType: (value) => dispatch({ type: "ALERT_TYPE", value: value }),

    handleSideBarItem: (value) =>
      dispatch({ type: "SHOWSIDEBARITEM", value: value }),
    handleAppliedAuctionTabKey: (value) =>
      dispatch({ type: "APPLIED_AUCTION_KEY", value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginHero);
