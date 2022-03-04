import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Tab } from "react-bootstrap";
import Tabs from "react-bootstrap/Tabs";
import List from "../../components/list";
import HandleAPIData from "../../helpers/handleAPIData";
import axios from "axios";
import APIConfig from "../../helpers/api/config";
import Loader from "../../components/loader";
class AuctionEnd extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      key: this.props?.auctionEndTabKey,
      loading: false,
      tradeAuctionEnd: null,
      sellAuctionEnd: null,
    };
  }
  getData = async (tabValue) => {
    this._isMounted = true;
    this.setState({ loading: true });
    try {
      const { id } = this.props.user;
      const mode = !tabValue || tabValue === "tradecar" ? "trade" : "sell";

      const response = await axios(
        APIConfig(
          "get",
          `/list_auction_owner?type=${mode}&user_id=${id}&expired=1`,
          null
        )
      );

      if (response.status === 200) {
        this.state.key === "tradecar"
          ? this.setState({
              loading: false,
              tradeAuctionEnd: HandleAPIData(response?.data),
            })
          : this.setState({
              loading: false,
              sellAuctionEnd: HandleAPIData(response?.data),
            });
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };
  handleTabChange = (k) => {
    // this.setState({ key: k })
    this.props.handleAcutionEndTabKey(k);
    this.setState({ key: k }, () => {
      this.getData(k);
    });
    // alert(this.props.sortFilter)
    // alert(this.state.key)
  };
  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <div className="w-100">
        <Card className="tabs-card">
          <Card.Header>
            <Tabs
              id="controlled-tab-example"
              activeKey={this.props?.auctionEndTabKey}
              onSelect={(k) => this.handleTabChange(k)}
              className="mb-3 main-content-tabs"
            >
              <Tab
                eventKey="tradecar"
                title="Trade Car"
                className="auction-text"
              >
                {!this.state.loading ? (
                  <List listData={this.state?.tradeAuctionEnd} />
                ) : (
                  <Loader />
                )}
              </Tab>
              <Tab eventKey="sellcar" title="Sell Car" className="auction-text">
                {!this.state.loading ? (
                  <List listData={this.state?.sellAuctionEnd} />
                ) : (
                  <Loader />
                )}
              </Tab>
            </Tabs>
          </Card.Header>
        </Card>
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
  return {
    handleAcutionEndTabKey: (value) =>
      dispatch({ type: "AUCTION_END_TAB_KEY", value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AuctionEnd);
