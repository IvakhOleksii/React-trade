
import React, { Component } from 'react'
import { connect } from 'react-redux'; 
import Hero from "../../components/hero/hero";
import Welcome from '../../components/welcome';
import GetRegistered from '../../components/getRegistered';
import HowWeWork from '../../components/howWeWork';
import BuyOrSell from '../../components/buyOrSell';
import NewCars from '../../components/newcars';
import CustomerReview from '../../components/customerReview';
// import NewsAndArticals from '../../components/newsAndArticals';
import Footer from '../_partials/footer';
class Home extends Component {
  _isMounted = false;
  
  componentDidMount(){
    this._isMounted = true; 
    window.scroll(0,0)
 
  }
 
  componentWillUnmount() {
    this._isMounted = false; 
  }
  render() { 
    return ( 
      <React.Fragment>
        <Hero />
        <Welcome />
        <HowWeWork />
        <BuyOrSell {...this.props} />
        <NewCars />
        <CustomerReview />
        {/* <NewsAndArticals /> */}
        <GetRegistered />
        <Footer />
      </React.Fragment> 
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);