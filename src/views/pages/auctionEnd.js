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
      const response =
        // this.props?.auctionEndTabKey === "tradecar"
        tabValue === "tradecar" || tabValue === null
          ? await axios(
              APIConfig("get", `/bidtrade/${this.props.user?.id}`, null)
            )
          : await axios(
              APIConfig("get", `/bidsell/${this.props.user?.id}`, null)
            );
      if (response.status === 200) {
        console.log("Ressss" + JSON.stringify(response.data))(
          this.state.key === "tradecar"
            ? this.setState({
                loading: false,
                tradeAuctionEnd: HandleAPIData(response?.data),
              })
            : this.setState({
                loading: false,
                sellAuctionEnd: HandleAPIData(response?.data),
              })
        );
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
    this.getData(null);
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

// lostAcution:  [
//   {
//     images:[
//       {original:"https://revus.templines.org/rent/wp-content/uploads/2019/07/bmw_m8_competition_coupe_2020_5k_3-1280x720-1-600x440.jpg",
//       thumbnail:"https://revus.templines.org/rent/wp-content/uploads/2019/07/bmw_m8_competition_coupe_2020_5k_3-1280x720-1-600x440.jpg"},
//       {original:"https://revus.templines.org/rent/wp-content/uploads/2019/07/orange_mustang_5k_3-1280x720-1-600x440.jpg",
//       thumbnail:"https://revus.templines.org/rent/wp-content/uploads/2019/07/orange_mustang_5k_3-1280x720-1-600x440.jpg"}
//     ],
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

//       winner:{
//         name:"MACKENZI",
//         image:"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//         bid_amount:"$454.00"
//       }
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
// winner:{
//   name:"MACKENZI",
//   image:"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//   bid_amount:"$454.00"
// }

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

//       winner:{
//         name:"MACKENZI",
//         image:"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//         bid_amount:"$454.00"
//       }
//     },
// ],
