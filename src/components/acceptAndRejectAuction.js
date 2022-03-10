import React, { Component } from "react";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";
import APIConfig from "../helpers/api/config";
import { toast } from "react-toastify";
import axios from "axios";
class AcceptAndReject extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      bid_status: this.props?.data?.bid_status,
    };
  }
  handleSubmit = async (value) => {
    this.setState({
      loading: true,
    });
    this._isMounted = true;
    var FormData = require("form-data");
    var data = new FormData();
    // primary_photo
    data.append("bid_id", this?.props?.data.bid_id);
    data.append("status", value);
    // data.append("id", this.props?.user?.id);
    try {
      const response = await axios(APIConfig("post", "/bidstatus", data));
      if (response.status === 200) {
        toast.success(" Status Successfully Change", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1400,
        });
        this.setState({
          loading: false,
          bid_status: "Accepted",
        });
      }
    } catch (error) {
      toast.error("Some Network Error   ", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1600,
      });
      this.setState({
        loading: false,
      });
    }
  };
  componentDidMount() {
    console.log(
      "accept and react id " + JSON.stringify(this?.props?.data.bid_status)
    );
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  validatePassword = () => {
    if (this.state.newPassword !== this.state.confirmPassword) {
      toast.warn("Confirm Password does not match with Password", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
      return false;
    } else {
      return true;
    }
  };
  render() {
    return (
      <div className="d-flex accept-reject">
        {!this.state.loading ? (
          this.state.bid_status === "pending" ? (
            <React.Fragment>
              <div>
                <h5
                  onClick={() => this.handleSubmit("Accepted")}
                  className="btn  card-start-time-accept"
                >
                  Accept
                </h5>
              </div>
              <div>
                <h5
                  onClick={() => this.handleSubmit("Rejected")}
                  className="btn card-end-time-reject"
                >
                  Reject
                </h5>
              </div>
            </React.Fragment>
          ) : (
            <div>
              <h5 className="btn card-end-time-label">
                {this.state.bid_status}
              </h5>
            </div>
          )
        ) : (
          <React.Fragment>
            <div>
              <h5 className="btn  card-start-time-accept">
                <Spinner animation="grow" variant="dark" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </h5>
            </div>
            <div>
              <h5 className="btn card-end-time-reject">
                <Spinner animation="grow" variant="dark" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </h5>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.app.user,
    auctionEndTabKey: state.app.auctionEndTabKey,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(AcceptAndReject);
