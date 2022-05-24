import React, { Component } from "react";
import { connect } from "react-redux";
import GetRegistered from "../../components/getRegistered";
import Footer from "../_partials/footer";
import YourCarForm, {
  FORM_MODES,
} from "../../components/YourCarForm/YourCarForm";

const CARDS_DATA = {
  heading1: "Get the Best Offer ",
  heading2: "Selling your Vehicle",
  cards: [
    {
      value: 0,
      text: "  My vehicle is 6 years or newer and I’m ready to sell now for the best offer.",
    },
    {
      value: 1,
      text: "My vehicle is older than 6 years and I’m ready to sell now for the best offer.",
    },
    {
      value: 3,
      text: "I’m not ready to sell but would like an idea of what my vehicle is worth",
    },
  ],
};

class SellYourCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  render() {
    return (
      <React.Fragment>
        <YourCarForm
          {...this.props}
          mode={FORM_MODES.SELL}
          cardsData={CARDS_DATA}
        />
        <GetRegistered {...this.props} />
        <Footer {...this.props} />
      </React.Fragment>
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
export default connect(mapStateToProps, mapDispatchToProps)(SellYourCar);
