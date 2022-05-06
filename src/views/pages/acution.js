import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Tab } from "react-bootstrap";
import Tabs from "react-bootstrap/Tabs";
import List from "../../components/list";
import APIConfig from "../../helpers/api/config";
import axios from "axios";
import Loader from "../../components/loader";
import HandleAPIData from "../../helpers/handleAPIData";

const INITIAL_STATE = {
  loading: false,
  data: [],
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
      loading: false,
      data: [],
      filterValue: "",
      start: 0,
    };
  }
  getData = async () => {
    this._isMounted = true;
    this.setState({ loading: true });
    try {
      const { topBids } = this.props;
      const { filters, start, data } = this.state;
      const endpoint = topBids
        ? "list_auction_dealer_top"
        : "list_auction_dealer";
      const mode = topBids ? "" : "&current_bids=1";
      const make = filters.car_make ? `&make=${filters.car_make}` : "";
      const model = filters.car_model ? `&model=${filters.car_model}` : "";

      const response = await axios(
        APIConfig(
          "get",
          `/${endpoint}?start=${start}${mode}${make}${model}`,
          null
        )
      );

      if (response?.status === 200) {
        const { auctions, total, limit } = response.data;

        this.setState({
          loading: false,
          start: start + limit,
          total,
          data: [...data, ...HandleAPIData(auctions)],
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
  handleLoadMore() {
    this.getData();
  }

  render() {
    const { loading, key, data, start, total } = this.state;

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
              <Tab eventKey="applied" className="auction-text">
                {!loading ? (
                  <React.Fragment>
                    <List
                      {...this.props}
                      listData={data}
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleAppliedAuctionKey: (value) =>
      dispatch({ type: "APPLIED_AUCTION_KEY", value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Acution);
