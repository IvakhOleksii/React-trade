import React, { Component } from "react";
import { connect } from "react-redux"; 
import {
  Card ,
  Tab 
} from "react-bootstrap";
import Tabs from "react-bootstrap/Tabs";
import List from "../../components/list"; 
import APIConfig from "../../helpers/api/config";
import axios from "axios"; 
import SortFilter from "../../components/sortFilter";
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
      filterValue:""
    };
  }
  getData = async (filters) => { 
    this._isMounted = true;
    this.setState({ loading: true });
    try {
      const response =
        this.props?.appliedAuctionKey === "applied"
          ? await axios(APIConfig("get", `/applied_auction/applied/${filters}`, null))
          : this.props?.appliedAuctionKey === "won-auction"
          ? await axios(APIConfig("get", `/applied_auction/won/${filters}`, null))
          : await axios(APIConfig("get", `/applied_auction/lost/${filters}`, null));
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
      this.getData("trade");
    }); 
  }; 
  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidMount() {
    this.getData("trade");
  }
  handleFilters = (filters) => {
    this.setState({ filterValue: filters }, function () {
      console.log(JSON.stringify(filters));
    //  alert(filters)
    });
    this.getData(filters);
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
                    <SortFilter     handleFilters={this.handleFilters}  />
                    <List
                      {...this.props}
                      listData={this.state?.appliedAuction}
                    />
                  </React.Fragment>
                ) :<Loader/>}
              </Tab>
              <Tab
                eventKey="won-auction"
                title="Won Auction"
                className="auction-text"
              >
                {!this.state.loading ? (
                  <React.Fragment>
                    <SortFilter  handleFilters={this.handleFilters} />
                    <List {...this.props} listData={this.state?.wonAuction} />
                  </React.Fragment>
                ) :<Loader/>}
              </Tab>
              <Tab
                eventKey="lost-auction"
                title="Lost Auction"
                className="auction-text"
              >
                {!this.state.loading ? (
                  <React.Fragment>
                    <SortFilter  handleFilters={this.handleFilters} />
                    <List {...this.props} listData={this.state?.wonAuction} />
                  </React.Fragment>
                ) :  <Loader/>
                }
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

// lostAcution   : [
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
