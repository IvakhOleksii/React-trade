import React, { Component } from "react";
import { connect } from "react-redux";
import Footer from "../_partials/footer";
import "../../styles/sidebar.css";
import Navbar from "../_partials/navbar";
import Sidebar from "../_partials/sidebar";
import Acution from "./acution";
import AccountSetting from "./accountSetting";
import LiveAcution from "./liveAcution";
import { Container, Row, Col } from "react-bootstrap";
import ViewAuction from "./viewAuction";
import AuctionEnd from "./auctionEnd";
import Messaging from "./messaging";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  render() {
    return (
      <div className="login-hero-section">
        <Navbar {...this.props} />
        <Container className="dashboard-container">
          <Row>
            <Col
              className="d-flex dashboard-height pt-4"
              lg={12}
              md={12}
              sm={12}
            >
              <Sidebar {...this.props} />
              {this.props.showSidebarItem === "auction" ? (
                <Acution {...this.props} />
              ) : this.props.showSidebarItem === "accountSetting" ? (
                <AccountSetting {...this.props} />
              ) : this.props.showSidebarItem === "liveAuction" ? (
                <LiveAcution {...this.props} />
              ) : this.props.showSidebarItem === "viewAuction" ? (
                <ViewAuction {...this.props} />
              ) : this.props.showSidebarItem === "bids" ? (
                <ViewAuction {...this.props} bids />
              ) : this.props.showSidebarItem === "drafts" ? (
                <ViewAuction {...this.props} drafts />
              ) : this.props.showSidebarItem === "auctionEnd" ? (
                <AuctionEnd {...this.props} />
              ) : this.props.showSidebarItem === "messaging" ? (
                <Messaging {...this.props} />
              ) : (
                ""
              )}
            </Col>
          </Row>
        </Container>
        <Footer {...this.props} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    vouched: state.app.vouched,
    showSidebarItem: state.app.showSidebarItem,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
