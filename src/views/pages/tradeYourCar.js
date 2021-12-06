
import React, { Component } from 'react'
import { connect } from 'react-redux';
import GetRegistered from '../../components/getRegistered';
import Footer from '../_partials/footer';
import TradeYourCarHero from '../../components/tradeYourCar hero/tradeYourCarHero';
// import Loader from '../../components/loader';
class TradeYourCar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    } 
  }
 
  render() {
    return (
      // <React.Fragment>
      //   {this.state.loading ?
      //     <Loader />
      //     :
          <React.Fragment>
            <TradeYourCarHero {...this.props} />
            <GetRegistered {...this.props} />
            <Footer {...this.props} />
          </React.Fragment>
      //     }
      // </React.Fragment>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    vouched: state.app.vouched
  };
};
const mapDispatchToProps = (dispatch) => {
  return {

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TradeYourCar);