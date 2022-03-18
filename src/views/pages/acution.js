import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Tab } from "react-bootstrap";
import Tabs from "react-bootstrap/Tabs";
import List from "../../components/list";
import APIConfig from "../../helpers/api/config";
import axios from "axios";
import Filters from "../../components/filters";
import Loader from "../../components/loader";
import HandleAPIData from "../../helpers/handleAPIData";

const INITIAL_STATE = {
  loading: false,
  appliedAuction: [],
  wonAuction: [],
  lostAuction: [],
  filters: {},
  start: 0,
  total: 0,
};

class Acution extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
      key: this.props?.appliedAuctionKey,
    };
  }
  getData = async () => {
    this._isMounted = true;
    this.setState({ loading: true });
    try {
      const {
        user: { id },
        topBids,
      } = this.props;
      const { filters, start: startState, key } = this.state;
      const mode = topBids ? "top_bids" : "current_bids";
      const make = filters.car_make ? `&make=${filters.car_make}` : "";
      const model = filters.car_model ? `&model=${filters.car_model}` : "";

      const response = await axios(
        APIConfig(
          "get",
          `/list_auction_dealer?${mode}=1&dealer_id=${id}&start=${
            startState || 0
          }${make}${model}`,
          null
        )
      );

      if (response?.status === 200) {
        const { auctions, start, total } = response.data;
        const dataKey =
          key === "applied"
            ? "appliedAuction"
            : key === "won-auction"
            ? "wonAuction"
            : "lostAuction";

        this.setState({
          loading: false,
          start,
          total,
          [dataKey]: [...this.state[dataKey], ...HandleAPIData(auctions)],
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  handleTabChange = (k) => {
    this.props.handleAppliedAuctionKey(k);
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
    if (prevProps.topBids !== this.props.topBids) {
      this.setState(INITIAL_STATE, () => {
        this.getData();
      });
    }
  }
  handleFilters = (filters) => {
    this.setState({ showData: true, filters }, () => {
      this.getData();
    });
  };
  handleResetFilter = () => {
    this.setState({ showData: false, filters: {} }, () => {
      this.getData();
    });
  };
  handleLoadMore() {
    this.getData();
  }

  render() {
    const {
      loading,
      key,
      appliedAuction,
      wonAuction,
      lostAuction,
      start,
      total,
    } = this.state;

    return (
      <div className="w-100">
        <Card className="tabs-card">
          <Card.Header>
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => this.handleTabChange(k)}
              className="mb-3 main-content-tabs"
            >
              <Tab eventKey="applied" title="Applied" className="auction-text">
                {!loading ? (
                  <React.Fragment>
                    <Filters
                      handleResetFilter={this.handleResetFilter}
                      handleFilters={this.handleFilters}
                    />
                    <List
                      {...this.props}
                      listData={appliedAuction}
                      loadMore={total > start}
                      handleLoadMore={this.handleLoadMore.bind(this)}
                    />
                  </React.Fragment>
                ) : (
                  <Loader />
                )}
              </Tab>
              <Tab
                eventKey="won-auction"
                title="Won Auction"
                className="auction-text"
              >
                {!loading ? (
                  <React.Fragment>
                    <Filters
                      handleResetFilter={this.handleResetFilter}
                      handleFilters={this.handleFilters}
                    />
                    <List
                      {...this.props}
                      listData={wonAuction}
                      loadMore={total > start}
                      handleLoadMore={this.handleLoadMore.bind(this)}
                    />
                  </React.Fragment>
                ) : (
                  <Loader />
                )}
              </Tab>
              <Tab
                eventKey="lost-auction"
                title="Lost Auction"
                className="auction-text"
              >
                {!loading ? (
                  <React.Fragment>
                    <Filters
                      handleResetFilter={this.handleResetFilter}
                      handleFilters={this.handleFilters}
                    />
                    <List
                      {...this.props}
                      listData={lostAuction}
                      loadMore={total > start}
                      handleLoadMore={this.handleLoadMore.bind(this)}
                    />
                  </React.Fragment>
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
    appliedAuctionKey: state.app.appliedAuctionKey,
    user: state.app.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleAppliedAuctionKey: (value) =>
      dispatch({ type: "APPLIED_AUCTION_KEY", value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Acution);
