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
      tradeAuctionEnd: [],
      sellAuctionEnd: [],
      start: 0,
      total: 0,
    };
  }
  getData = async (tabValue) => {
    this._isMounted = true;
    this.setState({ loading: true });
    try {
      const { start } = this.state;
      const mode = !tabValue || tabValue === "tradecar" ? "trade" : "sell";

      const response = await axios(
        APIConfig(
          "get",
          `/list_auction_owner?type=${mode}&start=${start}&expired=1`,
          null
        )
      );

      if (response.status === 200) {
        const { auctions, limit, total } = response.data;
        const dataKey =
          this.state.key === "tradecar" ? "tradeAuctionEnd" : "sellAuctionEnd";

        this.setState({
          loading: false,
          start: start + limit,
          total,
          [dataKey]: [...this.state[dataKey], ...HandleAPIData(auctions)],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleTabChange = (k) => {
    this.props.handleAcutionEndTabKey(k);
    this.setState({ key: k }, () => {
      this.getData(k);
    });
  };
  handleLoadMore() {
    this.getData(this.state.key);
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidMount() {
    this.getData();
  }
  render() {
    const { loading, tradeAuctionEnd, sellAuctionEnd, start, total } =
      this.state;

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
                {!loading ? (
                  <List
                    listData={tradeAuctionEnd}
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
                    listData={sellAuctionEnd}
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
