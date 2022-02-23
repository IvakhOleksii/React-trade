import React, { Component } from "react";
import { connect } from "react-redux";
import GetRegistered from "../../components/getRegistered";
import Footer from "../_partials/footer";
import YourCarForm, {
  FORM_MODES,
} from "../../components/YourCarForm/YourCarForm";

const CARDS_DATA = {
  heading1: "Tell Us Where You are in the",
  heading2: "Purchasing Process.",
  cards: [
    {
      value:
        "  I’m ready to purchase now. Get me Top Dollar for my Trade-in Vehicle.",
    },
    {
      value:
        "  I’m within 60 days of a purchase. Get me Top Dollar for my Trade-in Vehicle.",
    },
    {
      value:
        " I’m not quite ready, I’d like an idea of what to expect for my Trade-in Vehicle.",
    },
  ],
};

class TradeYourCar extends Component {
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
          mode={FORM_MODES.TRADE}
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
export default connect(mapStateToProps, mapDispatchToProps)(TradeYourCar);
