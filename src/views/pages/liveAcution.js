import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Nav, Button, Tab, Spinner } from "react-bootstrap";
import Tabs from "react-bootstrap/Tabs";
import List from "../../components/list";
import Filters from "../../components/filters";
import car3 from "../../assets/imgs/360/car3.jpeg";
import car4 from "../../assets/imgs/360/car4.jpg";
import car5 from "../../assets/imgs/360/car8.jpg";
import car6 from "../../assets/imgs/360/car7.jpg";
import car7 from "../../assets/imgs/360/car6.jpg";
import APIConfig from "../../helpers/api/config";
import axios from "axios";
import { toast } from "react-toastify";
import HandleAPIData, { ConvertObjectIntoArray } from "../../helpers/handleAPIData";
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
    //  alert(JSON.stringify(filters))
    // return
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
            // appild: HandleAPIData(this.handleDateFilter(response?.data)),
            appild: HandleAPIData(ConvertObjectIntoArray(response?.data)), 
          }); 
        }

      } else {
        response = await axios(APIConfig("get", "/get_all", null));
        if (response.status === 200) {    
          this.setState({
            loading: false,
            // appild: HandleAPIData(this.handleDateFilter(response?.data)),
            appild: HandleAPIData(response?.data),
  
          }); 
        }
      }
    
    } catch (error) {
      console.log(JSON.stringify(error));
      // toast.error("Please try again ", {
      //   position: toast.POSITION.TOP_RIGHT,
      //   autoClose: 1800,
      // });
      // this.setState({ loading: false });
    }
  };
  handleFilters = (filters) => {
    this.setState({ showData: true }, function () { 
    });
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

// appild: [
//   {
//     images:[
//       {original:"https://revus.templines.org/rent/wp-content/uploads/2019/07/bmw_m8_competition_coupe_2020_5k_3-1280x720-1-600x440.jpg",
//       thumbnail:"https://revus.templines.org/rent/wp-content/uploads/2019/07/bmw_m8_competition_coupe_2020_5k_3-1280x720-1-600x440.jpg"},
//       {original:"https://revus.templines.org/rent/wp-content/uploads/2019/07/orange_mustang_5k_3-1280x720-1-600x440.jpg",
//       thumbnail:"https://revus.templines.org/rent/wp-content/uploads/2019/07/orange_mustang_5k_3-1280x720-1-600x440.jpg"}
//     ]  ,
//     images360:[
//        { image: car7 },
//         { image: car3 },
//         { image: car4 },
//         { image: car5 },
//         { image: car6 },

//     ],
//     title: "Ford Focus ST",
//     descrption:   "Multiply and itself their good blessed also good whose, had two without.",
//     price: "0000000",
//     engine: "1900 cm3",
//       drivetrain : "AWD" ,
//       city : "New Port Riche",
//       status_message:"Car Owner Declined" ,
//       model:   "230",
//       state:  "Manual",
//         zip_code: "xyz",
//       phone:"123",
//       make:   "Peugeot",
//       year:   "2021",
//       mileage:   "2000",
//       vin:   "1VXEDYROTER",
//       fuel:   "Diesel",
//       horsepower:     "230",
//       transmission:  "Manual",
//       color:   "blue",
//       interior_Color:    "brown",
//       price_type:   "2",

//       odometer:   "Fixed",
//       trim :  "Trim",
//       fuel_type:  " Petrol",
//       body_type:  " Steel",
//       condition:   "Used",
//       exterior_color:   " Red",
//       vehicle_driving:  "Yes",
//       transmission_issue:  "No",
//       drivetrain_issue: "No",
//       steering_issue:  "No",
//       brake_issue:   "No",
//       suspension_issue:  "No",
//       minor_body_damage: "No",
//       moderate_body_damage:  "No",
//       major_body_damage:  "Yes",
//       scratches:   "Yes",
//       glass_damaged_cracked:   "No",
//       lights_damaged_cracked: "No",
//       minor_body_rust:  "Yes",
//       moderate_body_rust:  "No",
//       major_body_rust:  "Yes",
//       car_keys:   "2",
//       mismatched_paint_colors:   "Yes",
//       previous_paint_work :  "Yes",
//       seat_damage:  "No",
//       carpet_damage: "Yes",
//       dashboard_damage:  "Yes",
//       interior_trim_damage:  "No",
//       sunroof:   "No",
//       navigation:   "Yes",
//       aftermarket_stereo_equipment:     "No",
//       hvac_not_working:   "Yes",
//       leather_Or_Leather_type_seats:    "Yes",
//       make: "  BMW",
//       model:   "X6",
//       radius:   "10",
//       loan_or_lease_on_car: "No",
//       aftermarket_parts_exterior : "Yes",

//   },
//   {
//     images:[
//       {original:"https://revus.templines.org/rent/wp-content/uploads/2019/07/orange_mustang_5k_3-1280x720-1-600x440.jpg",
//       thumbnail:"https://revus.templines.org/rent/wp-content/uploads/2019/07/orange_mustang_5k_3-1280x720-1-600x440.jpg"},
//       {original:"https://revus.templines.org/rent/wp-content/uploads/2019/07/ferrari_488_pista_spider_2018_4k-1280x720-1-600x440.jpg",
//       thumbnail:"https://revus.templines.org/rent/wp-content/uploads/2019/07/ferrari_488_pista_spider_2018_4k-1280x720-1-600x440.jpg"}
//     ] ,

//     images360:[],
//       title: "Jaguar XJ50 1212",
//       descrption:  "Multiply and itself their good blessed also good whose, had two without.",
//       price: "$87 / per day",

//       engine: "1900 cm3",
//       drivetrain : "AWD" ,
//       city : "New Port Riche",
//       status_message:"Car Owner Declined" ,
//       model:   "230",
//       state:  "Manual",
//         zip_code: "xyz",
//       phone:"123",
//       make:   "Peugeot",
//       year:   "2021",
//       mileage:   "2000",
//       vin:   "1VXEDYROTER",
//       fuel:   "Diesel",
//       horsepower:     "230",
//       transmission:  "Manual",
//       color:   "blue",
//       interior_Color:    "brown",
//       price_type:   "2",

//       odometer:   "Fixed",
//       trim :  "Trim",
//       fuel_type:  " Petrol",
//       body_type:  " Steel",
//       condition:   "Used",
//       exterior_color:   " Red",
//       vehicle_driving:  "Yes",
//       transmission_issue:  "No",
//       drivetrain_issue: "No",
//       steering_issue:  "No",
//       brake_issue:   "No",
//       suspension_issue:  "No",
//       minor_body_damage: "No",
//       moderate_body_damage:  "No",
//       major_body_damage:  "Yes",
//       scratches:   "Yes",
//       glass_damaged_cracked:   "No",
//       lights_damaged_cracked: "No",
//       minor_body_rust:  "Yes",
//       moderate_body_rust:  "No",
//       major_body_rust:  "Yes",
//       car_keys:   "2",
//       mismatched_paint_colors:   "Yes",
//       previous_paint_work :  "Yes",
//       seat_damage:  "No",
//       carpet_damage: "Yes",
//       dashboard_damage:  "Yes",
//       interior_trim_damage:  "No",
//       sunroof:   "No",
//       navigation:   "Yes",
//       aftermarket_stereo_equipment:     "No",
//       hvac_not_working:   "Yes",
//       leather_Or_Leather_type_seats:    "Yes",
//       make: "  BMW",
//       model:   "X6",
//       radius:   "10",
//       loan_or_lease_on_car: "No",
//       aftermarket_parts_exterior : "Yes",

//     },
//     {

//       images:[
//         {original:"https://revus.templines.org/rent/wp-content/uploads/2019/07/ferrari_488_pista_spider_2018_4k-1280x720-1-600x440.jpg",
//         thumbnail:"https://revus.templines.org/rent/wp-content/uploads/2019/07/ferrari_488_pista_spider_2018_4k-1280x720-1-600x440.jpg",},
//         {original:"https://revus.templines.org/rent/wp-content/uploads/2019/07/orange_mustang_5k_3-1280x720-1-600x440.jpg",
//         thumbnail:"https://revus.templines.org/rent/wp-content/uploads/2019/07/orange_mustang_5k_3-1280x720-1-600x440.jpg"}
//       ]  ,
//       images360:[
//         { image: car6 },
//         { image: car7 },
//         { image: car4 },
//         { image: car5 },
//         { image: car3 },
//     ],
//       title: "Ferrari F8 Tributo",
//       descrption:  "Multiply and itself their good blessed also good whose, had two without.",
//       price: "set",
//       engine: "1900 cm3",
//       drivetrain : "AWD" ,
//       city : "New Port Riche",
//       status_message:"Car Owner Declined" ,
//       model:   "230",
//       state:  "Manual",
//         zip_code: "xyz",
//       phone:"123",
//       make:   "Peugeot",
//       year:   "2021",
//       mileage:   "2000",
//       vin:   "1VXEDYROTER",
//       fuel:   "Diesel",
//       horsepower:     "230",
//       transmission:  "Manual",
//       color:   "blue",
//       interior_Color:    "brown",
//       price_type:   "2",

//       odometer:   "Fixed",
//       trim :  "Trim",
//       fuel_type:  " Petrol",
//       body_type:  " Steel",
//       condition:   "Used",
//       exterior_color:   " Red",
//       vehicle_driving:  "Yes",
//       transmission_issue:  "No",
//       drivetrain_issue: "No",
//       steering_issue:  "No",
//       brake_issue:   "No",
//       suspension_issue:  "No",
//       minor_body_damage: "No",
//       moderate_body_damage:  "No",
//       major_body_damage:  "Yes",
//       scratches:   "Yes",
//       glass_damaged_cracked:   "No",
//       lights_damaged_cracked: "No",
//       minor_body_rust:  "Yes",
//       moderate_body_rust:  "No",
//       major_body_rust:  "Yes",
//       car_keys:   "2",
//       mismatched_paint_colors:   "Yes",
//       previous_paint_work :  "Yes",
//       seat_damage:  "No",
//       carpet_damage: "Yes",
//       dashboard_damage:  "Yes",
//       interior_trim_damage:  "No",
//       sunroof:   "No",
//       navigation:   "Yes",
//       aftermarket_stereo_equipment:     "No",
//       hvac_not_working:   "Yes",
//       leather_Or_Leather_type_seats:    "Yes",
//       make: "  BMW",
//       model:   "X6",
//       radius:   "10",
//       loan_or_lease_on_car: "No",
//       aftermarket_parts_exterior : "Yes",

//     },
// ],
