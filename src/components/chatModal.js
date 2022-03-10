import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import APIConfig from "../helpers/api/config";
import { toast } from "react-toastify";
import axios from "axios";
import { Send } from "react-feather";
class ChatModal extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      bid_status: this.props?.data?.bid_status,
      message: "",
      chat: null || this.props?.chat,
    };
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    this._isMounted = true;
    var FormData = require("form-data");
    var data = new FormData();
    data.append("message", this.state?.message);
    data.append("sent_by", this.props?.user?.id);
    data.append("item_id", this.props?.chat?.id);
    data.append("dealer_id", this.props?.user?.id);
    data.append("owner_id", this.props?.chat?.user_id);
    try {
      const response = await axios(APIConfig("post", "/addmessaging", data));
      if (response.status === 200) {
        toast.success(" Status Successfully Change", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1400,
        });
        this.setState({
          loading: false,
        });
        this.props.handeChangeSidebarItem("messaging");
        this.props.history.push("/dashboard");
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
      "accept and react id  ad" + JSON.stringify(this.props?.chat.id)
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
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <Row className="p-2">
          <Col
            lg={12}
            md={12}
            sm={12}
            className="d-flex justify-content-center algin-center p-3 "
          >
            <input
              type="text"
              placeholder="Type a Message Here...."
              className="w-100 chatInput"
              required
              value={this.state?.message}
              name="message"
              onChange={(e) =>
                this.setState({ [e.target.name]: e.target.value })
              }
            />

            <Button className="svg-send-btn" type="submit">
              <Send
                className="primary p justify-content-center algin-center pt-1"
                size={28}
                data-tour="toggle-icon"
              />
            </Button>
          </Col>{" "}
        </Row>
      </form>
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
  return {
    handeChangeSidebarItem: (value) =>
      dispatch({ type: "SHOWSIDEBARITEM", value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatModal);
