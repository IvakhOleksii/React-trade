import React, { Component } from "react";
import { connect } from "react-redux";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import SettingsIcon from "@material-ui/icons/Settings";
import GavelIcon from "@material-ui/icons/Gavel";
import { Settings } from "react-feather";
import classNames from "classnames";
import CommuteIcon from "@material-ui/icons/Commute";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: "",
      showAlert: true,
      message: "testing phase",
    };
  }
  getNavItemStyle = (item) => {
    if (item !== this.props.showSidebarItem) {
      return {};
    }

    return {
      background: "#fff",
    };
  };
  handleLogout = () => {
    this.props.UserHandler([]);
    this.props.handeChangeSidebarItem("accountSetting");
    this.props.history.push("/");
  };
  render() {
    return (
      <>
        <div className={classNames("sidebar", { "is-open": true })}>
          <div className="sidebar-header">
            <span color="info" style={{ color: "#fff" }}>
              &#9776;
            </span>
            <h4 className="dashboard-text">Settings</h4>
            <h6 className="dashboard-text-mobile">
              <p className="transparent" style={{ color: "transparent" }}>
                {" "}
                L{" "}
              </p>
            </h6>
          </div>
          <div className="side-menu">
            <Nav className="list-unstyled pb-3 d-flex">
              <NavItem
                className="nav-items"
                style={this.getNavItemStyle("accountSetting")}
              >
                <NavLink
                  onClick={() =>
                    this.props.handeChangeSidebarItem("accountSetting")
                  }
                  className="nav-items"
                >
                  {/* <FontAwesomeIcon   className="mr-2" /> */}
                  <h6 className="dashboard-text">
                    Account Settings
                    <Settings className={"dashboard-text-mobile"} size={20} />
                  </h6>
                  <h6 className="dashboard-text-mobile">
                    <SettingsIcon
                      className={"dashboard-text-mobile"}
                      size={20}
                    />
                  </h6>
                </NavLink>
              </NavItem>

              {/* <NavItem className="nav-items">
                <NavLink className="nav-items">
                  <Link to="/auction-detail" className="nav-items" 
                  style={{ textDecoration: "none" }}>
                    <h6 className="dashboard-text">
                    Auction Detail
                      <Settings className={"dashboard-text-mobile"} size={20} />
                    </h6>
                    <h6 className="dashboard-text-mobile">
                      <SettingsIcon
                        className={"dashboard-text-mobile"}
                        size={20}
                      />
                    </h6>
                  </Link>
                </NavLink>
              </NavItem> */}
              {this.props?.user?.user_type === "Car Owner" ? (
                <React.Fragment>
                  <NavItem className="nav-items">
                    <NavLink
                      onClick={() => this.props.history.push("/trade-your-car")}
                      className="nav-items"
                    >
                      <h6 className="dashboard-text">Trade You Car </h6>
                      <h6 className="dashboard-text-mobile">
                        <CommuteIcon fontSize="medium" />
                      </h6>
                    </NavLink>
                  </NavItem>
                  <NavItem className="nav-items">
                    <NavLink
                      onClick={() => this.props.history.push("/sell-your-car")}
                      className="nav-items"
                    >
                      <h6 className="dashboard-text">Sell You Car </h6>
                      <h6 className="dashboard-text-mobile">
                        <CommuteIcon fontSize="medium" />
                      </h6>
                    </NavLink>
                  </NavItem>

                  <NavItem
                    className="nav-items"
                    style={this.getNavItemStyle("viewAuction")}
                  >
                    <NavLink
                      onClick={() =>
                        this.props.handeChangeSidebarItem("viewAuction")
                      }
                      className="nav-items"
                    >
                      <h6 className="dashboard-text">View Auctions </h6>
                      <h6 className="dashboard-text-mobile">
                        <CommuteIcon fontSize="medium" />
                      </h6>
                    </NavLink>
                  </NavItem>
                  <NavItem
                    className="nav-items"
                    style={this.getNavItemStyle("auctionEnd")}
                  >
                    <NavLink
                      onClick={() =>
                        this.props.handeChangeSidebarItem("auctionEnd")
                      }
                      className="nav-items"
                    >
                      <h6 className="dashboard-text"> Auction End </h6>
                      <h6 className="dashboard-text-mobile">
                        <CommuteIcon fontSize="medium" />
                      </h6>
                    </NavLink>
                  </NavItem>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <NavItem
                    className="nav-items"
                    style={this.getNavItemStyle("liveAuction")}
                  >
                    <NavLink
                      onClick={() =>
                        this.props.handeChangeSidebarItem("liveAuction")
                      }
                      className="nav-items"
                    >
                      <h6 className="dashboard-text"> Live Auctions </h6>
                      <h6 className="dashboard-text-mobile">
                        <GavelIcon size={20} />
                      </h6>
                    </NavLink>
                  </NavItem>
                  <NavItem
                    className="nav-items"
                    style={this.getNavItemStyle("auction")}
                  >
                    <NavLink
                      onClick={() =>
                        this.props.handeChangeSidebarItem("auction")
                      }
                      className="nav-items"
                    >
                      <h6 className="dashboard-text">Applied Auctions </h6>
                      <h6 className="dashboard-text-mobile">
                        <CommuteIcon fontSize="medium" />
                      </h6>
                    </NavLink>
                  </NavItem>
                </React.Fragment>
              )}
              <NavItem
                className="nav-items"
                style={this.getNavItemStyle("messaging")}
              >
                <NavLink
                  onClick={() => this.props.handeChangeSidebarItem("messaging")}
                  className="nav-items"
                >
                  <h6 className="dashboard-text">Messaging</h6>
                  <h6 className="dashboard-text-mobile">
                    {" "}
                    <ExitToAppIcon />{" "}
                  </h6>
                </NavLink>
              </NavItem>
              <NavItem className="nav-items">
                <NavLink
                  tag={Link}
                  to={"/pages"}
                  onClick={() => this.handleLogout()}
                  className="nav-items"
                >
                  <h6 className="dashboard-text">Log Out</h6>
                  <h6 className="dashboard-text-mobile">
                    {" "}
                    <ExitToAppIcon />{" "}
                  </h6>
                </NavLink>
              </NavItem>
            </Nav>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    alert: state.app.alert,
    user: state.app.user,
    showSidebarItem: state.app.showSidebarItem,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    UserHandler: (value) => dispatch({ type: "USER", value: value }),
    handeChangeSidebarItem: (value) =>
      dispatch({ type: "SHOWSIDEBARITEM", value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
