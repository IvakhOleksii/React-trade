import React, { Component } from "react";
import { connect } from "react-redux";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/imgs/svgs/nav/1615889129-78426.svg";
import { toast } from "react-toastify";
import DottedSVG1 from "../../assets/imgs/png/bg/1.jpg";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: "",
      showAlert: true,
      message: "testing phase",
      showSvg: "",
    };
  }
  handleNotify = () => {
    if (this.props.alert?.alertType === "Error") {
      toast.error(this.props.alert?.alertMessage, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else if (this.props.alert?.alertType === "Success") {
      toast.success(this.props.alert?.alertMessage, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else if (this.props.alert?.alertType === "Warning") {
      toast.warn(this.props.alert?.alertMessage, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };
  handleLogout = () => {
    try {
      this.props.UserHandler([]);
      this.props.handeChangeSidebarItem("viewAuction");
      this.props.history.push("/");
    } catch (error) {}
  };
  render() {
    return (
      <>
        {this.props?.showSvg ? (
          <img src={DottedSVG1} className="page-top-dottedSvg-trade" alt="" />
        ) : (
          ""
        )}
        <Navbar
          collapseOnSelect
          expand="lg"
          style={{ backgroundColor: "black" }}
        >
          <Container>
            <Link className="navbar-brand" to="/">
              <Logo className="logo" />
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>

              <Nav className="main-nav-items">
                {this.props.user?.isLogin ? (
                  <React.Fragment>
                    <Link className="nav-link" to="/dashboard">
                      {" "}
                      Dashboard
                    </Link>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Link className="nav-link" to="/">
                      {" "}
                      Home
                    </Link>
                  </React.Fragment>
                )}

                {this.props.user?.user_type === "Car Owner" ||
                !this.props.user?.user_type ? (
                  <React.Fragment>
                    <Link className="nav-link" to="/trade-your-car">
                      Trade Your Car{" "}
                    </Link>
                    <Link className="nav-link" to="/sell-your-car">
                      {" "}
                      Sell Your Car
                    </Link>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Link className="nav-link" to="/aboutus">
                      {" "}
                      About us
                    </Link>
                    <Link className="nav-link" to="/contactus">
                      {" "}
                      Contact us
                    </Link>
                  </React.Fragment>
                )}
                {this.props.user?.isLogin ? (
                  <React.Fragment>
                    {/* TODO: Don't use anchor with onClick and no href.
                      Change this anchor to a button styled as an anchor.
                      Accessibility issue.
                    */}
                    <a
                      className="nav-link main-nav-items-span"
                      onClick={this.handleLogout}
                      href="/"
                    >
                      {" "}
                      Logout
                    </a>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Link className="nav-link" to="/login">
                      {" "}
                      Login
                    </Link>
                  </React.Fragment>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    alert: state.app.alert,
    user: state.app.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    AlertHandler: (value) => dispatch({ type: "ALERT", value: value }),
    UserHandler: (value) => dispatch({ type: "USER", value: value }),
    handeChangeSidebarItem: (value) =>
      dispatch({ type: "SHOWSIDEBARITEM", value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
