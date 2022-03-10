import React, { Component } from "react";
import { connect } from "react-redux";
import AccountSettingFrom from "../../components/accountSettingFrom";
import { Card, Tab } from "react-bootstrap";
import Tabs from "react-bootstrap/Tabs";
import ChangePasswordForm from "../../components/changePasswordForm";
class AccountSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "accountSetting",
      appild: [
        {
          image:
            "https://revus.templines.org/rent/wp-content/uploads/2019/07/bmw_m8_competition_coupe_2020_5k_3-1280x720-1-600x440.jpg",
          title: "Ford Focus ST",
          descrption:
            "Multiply and itself their good blessed also good whose, had two without.",
          price: "$350 / per day",
          year: "2019",
          mileage: "31500",
          fuel: "Petrol",
          engine: "1900 cm3",
          horsepower: "130 hp",
          doors: "4 doors",
          color: "blue",
          condition: "New",
          status: "hot",
        },
        {
          image:
            "https://revus.templines.org/rent/wp-content/uploads/2019/07/orange_mustang_5k_3-1280x720-1-600x440.jpg",
          title: "Jaguar XJ50",
          descrption:
            "Multiply and itself their good blessed also good whose, had two without.",
          price: "$87 / per day",
          year: "2019",
          mileage: "52000",
          fuel: "Electric",
          engine: " 3900 cm3",
          horsepower: " 230 hp",
          doors: "4 doors",
          color: "yellow",
          condition: "Used",
          status: "sale",
        },
        {
          image:
            "https://revus.templines.org/rent/wp-content/uploads/2019/07/ferrari_488_pista_spider_2018_4k-1280x720-1-600x440.jpg",
          title: "Ferrari F8 Tributo",
          descrption:
            "Multiply and itself their good blessed also good whose, had two without.",
          price: "$87 / per day",
          year: "2012",
          mileage: "10",
          fuel: "Petrol+CNG",
          engine: " 3900 cm3",
          horsepower: " 230 hp",
          doors: "4 doors",
          color: "yellow",
          condition: "Used",
          status: "red",
        },
      ],
      lostAcution: [
        {
          image:
            "https://revus.templines.org/rent/wp-content/uploads/2019/07/ferrari_488_pista_spider_2018_4k-1280x720-1-600x440.jpg",
          title: "Ferrari F8 Tributo",
          descrption:
            "Multiply and itself their good blessed also good whose, had two without.",
          price: "$87 / per day",
          year: "2012",
          mileage: "10",
          fuel: "Petrol+CNG",
          engine: " 3900 cm3",
          horsepower: " 230 hp",
          doors: "4 doors",
          color: "yellow",
          condition: "Used",
          status: "red",
        },
        {
          image:
            "https://revus.templines.org/rent/wp-content/uploads/2019/07/bmw_m8_competition_coupe_2020_5k_3-1280x720-1-600x440.jpg",
          title: "Ford Focus ST",
          descrption:
            "Multiply and itself their good blessed also good whose, had two without.",
          price: "$350 / per day",
          year: "2019",
          mileage: "31500",
          fuel: "Petrol",
          engine: "1900 cm3",
          horsepower: "130 hp",
          doors: "4 doors",
          color: "blue",
          condition: "New",
          status: "hot",
        },
        {
          image:
            "https://revus.templines.org/rent/wp-content/uploads/2019/07/orange_mustang_5k_3-1280x720-1-600x440.jpg",
          title: "Jaguar XJ50",
          descrption:
            "Multiply and itself their good blessed also good whose, had two without.",
          price: "$87 / per day",
          year: "2019",
          mileage: "52000",
          fuel: "Electric",
          engine: " 3900 cm3",
          horsepower: " 230 hp",
          doors: "4 doors",
          color: "yellow",
          condition: "Used",
          status: "sale",
        },
      ],
    };
  }
  handleAfterChangePassword = (status) => {
    if (status) {
      this.setState({ key: "accountSetting" });
    }
  };
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
              <Tab eventKey="accountSetting" title="Account Setting">
                <AccountSettingFrom />
              </Tab>
              <Tab eventKey="changePassword" title=" Change Password  ">
                <ChangePasswordForm
                  accountSettting={true}
                  afterChangePassword={this.handleAfterChangePassword}
                />
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
export default connect(mapStateToProps, mapDispatchToProps)(AccountSetting);
