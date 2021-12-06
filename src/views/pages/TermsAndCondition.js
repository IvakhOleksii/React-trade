
import React, { Component } from 'react'
import { connect } from 'react-redux';
// import GetRegistered from '../../components/getRegistered';
import Footer from '../_partials/footer';
import TermsAndConditionHero from '../../components/TermsAndConditionHero';
class TermsAndCondition extends Component {
  componentDidMount(){
    window.scroll(100, 100);
  }
  render() { 
    return ( 
      <React.Fragment>
         
        <TermsAndConditionHero {...this.props} />
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
export default connect(mapStateToProps, mapDispatchToProps)(TermsAndCondition);