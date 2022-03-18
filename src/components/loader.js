import React, { Component } from "react";
// import Logo from "../assets/imgs/png/nav/logo.png";
import { Spinner } from "react-bootstrap";
class Loader extends Component {
  render() {
    return (
      <div
        className="d-flex justify-content-center align-items-center loading-container"
        {...this.props}
      >
        <Spinner animation="grow" variant="light" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
}

export default Loader;

// <div className="d-flex justify-content-center align-items-center loading-container"  >
//             <img src={Logo} className="loading-logo" alt="loader" />
//           </div>
