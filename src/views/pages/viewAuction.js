import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Tab } from "react-bootstrap";
import Tabs from "react-bootstrap/Tabs";
import List from "../../components/list";
import APIConfig from "../../helpers/api/config";
import axios from "axios";
import HandleAPIData from "../../helpers/handleAPIData";
import Loader from "../../components/loader";

const INITIAL_STATE = {
  loading: false,
  tradeAuction: [],
  sellAuction: [],
  start: 0,
  total: 0,
};

class ViewAuction extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
      key: this.props?.viewAuctionTabKey,
    };
  }
  getData = async () => {
    this._isMounted = true;
    this.setState({ loading: true });
    try {
      const { bids, drafts } = this.props;
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
          `/list_auction_owner?type=${mode}&start=${this.state.start}${extraParams}`,
          null
        )
      );
      if (response.status === 200) {
        const { auctions, start, total } = response.data;
        const dataKey =
          this.state.key === "tradecar" ? "tradeAuction" : "sellAuction";

        this.setState({
          loading: false,
          start,
          total,
          [dataKey]: [...this.state[dataKey], ...HandleAPIData(auctions)],
        });
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };
  handleTabChange = (k) => {
    this.props.handleViewAuctionTabKey(k);
    this.setState({ ...INITIAL_STATE, key: k }, () => {
      this.getData();
    });
  };
  handleLoadMore() {
    this.getData();
  }
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
      this.setState(INITIAL_STATE, () => {
        this.getData();
      });
    }
  }
  render() {
    const { loading, tradeAuction, sellAuction, start, total } = this.state;

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
                {!loading ? (
                  <List
                    {...this.props}
                    listData={tradeAuction}
                    loadMore={total > start}
                    handleLoadMore={this.handleLoadMore.bind(this)}
                  />
                ) : (
                  <Loader />
                )}
              </Tab>
              <Tab eventKey="sellcar" title="Sell Car" className="auction-text">
                {!loading ? (
                  <List
                    {...this.props}
                    listData={sellAuction}
                    loadMore={total > start}
                    handleLoadMore={this.handleLoadMore.bind(this)}
                  />
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleViewAuctionTabKey: (value) =>
      dispatch({ type: "VIEW_AUCTION_TAB_KEY", value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewAuction);
