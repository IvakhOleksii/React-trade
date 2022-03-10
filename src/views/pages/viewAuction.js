import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Tab } from "react-bootstrap";
import Tabs from "react-bootstrap/Tabs";
import List from "../../components/list";
import APIConfig from "../../helpers/api/config";
import axios from "axios";
import HandleAPIData from "../../helpers/handleAPIData";
import Loader from "../../components/loader";
class ViewAuction extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      key: this.props?.viewAuctionTabKey,
      loading: false,
      tradeAuction: null,
      sellAuction: null,
    };
  }
  getData = async () => {
    this._isMounted = true;
    this.setState({ loading: true });
    try {
      const {
        user: { id },
        bids,
        drafts,
      } = this.props;
      const mode =
        this.props.viewAuctionTabKey === "tradecar" ? "trade" : "sell";
      const extraParams = bids
        ? "&bids=1"
        : drafts
        ? "&publish_status=draft"
        : "";

      const response = await axios(
        APIConfig(
          "get",
          `/list_auction_owner?type=${mode}&user_id=${id}${extraParams}`,
          null
        )
      );
      if (response.status === 200) {
        this.state.key === "tradecar"
          ? this.setState({
              loading: false,
              tradeAuction: HandleAPIData(response?.data),
            })
          : this.setState({
              loading: false,
              sellAuction: HandleAPIData(response?.data),
            });
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };
  handleTabChange = (k) => {
    this.props.handleViewAuctionTabKey(k);
    this.setState({ key: k }, () => {
      this.getData();
    });
  };
  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidMount() {
    this.getData();
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.bids !== this.props.bids ||
      prevProps.drafts !== this.props.drafts
    ) {
      this.getData();
    }
  }
  render() {
    return (
      <div className="w-100">
        <Card className="tabs-card">
          <Card.Header>
            <Tabs
              id="controlled-tab-example"
              activeKey={this.props?.viewAuctionTabKey}
              onSelect={(k) => this.handleTabChange(k)}
              className="mb-3 main-content-tabs"
            >
              <Tab
                eventKey="tradecar"
                title="Trade Car"
                className="auction-text"
              >
                {!this.state.loading ? (
                  <List {...this.props} listData={this.state?.tradeAuction} />
                ) : (
                  <Loader />
                )}
              </Tab>
              <Tab eventKey="sellcar" title="Sell Car" className="auction-text">
                {!this.state.loading ? (
                  <List {...this.props} listData={this.state?.sellAuction} />
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
    sortFilter: state.app.sortFilter,
    viewAuctionTabKey: state.app.viewAuctionTabKey,
    user: state.app.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleViewAuctionTabKey: (value) =>
      dispatch({ type: "VIEW_AUCTION_TAB_KEY", value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewAuction);
