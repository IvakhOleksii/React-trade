import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Tab, Spinner } from "react-bootstrap";
import Tabs from "react-bootstrap/Tabs";
import List from "../../components/list";
import Filters from "../../components/filters";
import APIConfig from "../../helpers/api/config";
import axios from "axios";
import HandleAPIData, {
  ConvertObjectIntoArray,
} from "../../helpers/handleAPIData";
import moment from "moment";
class LiveAcution extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      key: "view-auction",
      liveAuction: [],
      showData: true,
      loading: false,
      appild: null,
    };
  }
  handleDateFilter = (data) => {
    var tempArray = [];
    data.forEach((element) => {
      var given = moment(element.created_at, "YYYY-MM-DD");
      var current = moment().startOf("day");
      if (moment.duration(given.diff(current)).asDays() > -2) {
        tempArray.push(element);
      }
    });
    return tempArray;
  };
  getData = async (filters) => {
    this._isMounted = true;
    this.setState({ loading: true });
    var FormData = require("form-data");
    var data = new FormData();
    var response;
    try {
      if (filters !== null) {
        data.append("make", filters?.car_make);
        data.append("model", filters?.car_model);
        data.append("location", filters?.location);
        response = await axios(APIConfig("post", "/car_list", data));
        if (response.status === 200) {
          this.setState({
            loading: false,
            appild: HandleAPIData(ConvertObjectIntoArray(response?.data)),
          });
        }
      } else {
        response = await axios(APIConfig("get", "/get_all", null));
        if (response.status === 200) {
          this.setState({
            loading: false,
            appild: HandleAPIData(response?.data),
          });
        }
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };
  handleFilters = (filters) => {
    this.setState({ showData: true }, function () {});
    this.getData(filters);
  };
  handleResetFilter = () => {
    this.getData(null);
    this.setState({ showData: false }, function () {});
  };

  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidMount() {
    this.getData(null);
  }
  render() {
    return (
      <div className="w-100">
        <Card className="tabs-card">
          <Card.Header>
            <Tabs
              id="controlled-tab-example"
              activeKey={this.state.key}
              onSelect={(k) => this.setState({ key: k })}
              className="mb-3 main-content-tabs"
            >
              <Tab
                eventKey="view-auction"
                title="View Auction "
                className="auction-text"
              >
                <Filters
                  handleResetFilter={this.handleResetFilter}
                  handleFilters={this.handleFilters}
                />

                {!this.state.loading ? (
                  <List {...this.props} listData={this.state.appild} />
                ) : (
                  <div className="d-flex justify-content-center align-items-center loading-container">
                    <Spinner animation="grow" variant="light" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
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
    vouched: state.app.vouched,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(LiveAcution);
