import React, { Component } from "react";
import { connect } from "react-redux";

import NavBar from "../views/_partials/navbar";
class Hero extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
    };
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="login-hero-section">
        <NavBar />
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
    hanleShowAlert: (value) => dispatch({ type: "SHOW_ALERT", value: value }),
    handleAlertMessage: (value) =>
      dispatch({ type: "ALERT_MESSAGE", value: value }),
    handleAlertType: (value) => dispatch({ type: "ALERT_TYPE", value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Hero);
