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
class Acution extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      key: this.props?.appliedAuctionKey,
      loading: false,
      appliedAuction: null,
      wonAuction: null,
      lostAuction: null,
      filterValue: "",
    };
  }
  getData = async (filters = {}) => {
    this._isMounted = true;
    this.setState({ loading: true });
    try {
      const {
        user: { id },
        topBids,
      } = this.props;
      const mode = topBids ? "top_bids" : "current_bids";
      const make = filters.car_make ? `&make=${filters.car_make}` : "";
      const model = filters.car_model ? `&model=${filters.car_model}` : "";

      const response = await axios(
        APIConfig(
          "get",
          `/list_auction_dealer?${mode}=1&dealer_id=${id}${make}${model}`,
          null
        )
      );

      if (response?.status === 200) {
        this.state.key === "applied"
          ? this.setState({
              loading: false,
              appliedAuction: HandleAPIData(response?.data),
            })
          : this.state.key === "won-auction"
          ? this.setState({
              loading: false,
              wonAuction: HandleAPIData(response?.data),
            })
          : this.setState({
              loading: false,
              wonAuction: HandleAPIData(response?.data),
            });
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  handleTabChange = (k) => {
    // this.setState({ key: k })
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
      this.getData();
    }
  }
  handleFilters = (filters) => {
    this.setState({ filterValue: filters });
    this.getData(filters);
  };
  handleResetFilter = () => {
    this.setState({ showData: false });
    this.getData();
  };

  render() {
    return (
      <div className="w-100">
        <Card className="tabs-card">
          <Card.Header>
            <Tabs
              id="controlled-tab-example"
              activeKey={this.state.key}
              onSelect={(k) => this.handleTabChange(k)}
              className="mb-3 main-content-tabs"
            >
              <Tab eventKey="applied" title="Applied" className="auction-text">
                {!this.state.loading ? (
                  <React.Fragment>
                    <Filters
                      handleResetFilter={this.handleResetFilter}
                      handleFilters={this.handleFilters}
                    />
                    <List
                      {...this.props}
                      listData={this.state?.appliedAuction}
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
                {!this.state.loading ? (
                  <React.Fragment>
                    <Filters
                      handleResetFilter={this.handleResetFilter}
                      handleFilters={this.handleFilters}
                    />
                    <List {...this.props} listData={this.state?.wonAuction} />
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
                {!this.state.loading ? (
                  <React.Fragment>
                    <Filters
                      handleResetFilter={this.handleResetFilter}
                      handleFilters={this.handleFilters}
                    />
                    <List {...this.props} listData={this.state?.wonAuction} />
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
