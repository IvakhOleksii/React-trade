
import React, { Component } from 'react'
import { connect } from 'react-redux';
// import GetRegistered from '../../components/getRegistered';
import Footer from '../_partials/footer';
import AboutUsHero from '../../components/aboutusHero/aboutusHero';
class AboutUs extends Component {
  
  render() { 
    return ( 
      <React.Fragment>
        <AboutUsHero {...this.props} />
        <Footer {...this.props} />
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
export default connect(mapStateToProps, mapDispatchToProps)(AboutUs);