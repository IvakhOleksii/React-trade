
import React, { Component } from 'react'
import { connect } from 'react-redux'; 
import Footer from '../_partials/footer'; 
import PrivacyHero from '../../components/PrivacyHero';
class Privacy extends Component {
  componentDidMount(){
    window.scroll(100, 100);
  }
  render() { 
    return ( 
      <React.Fragment> 
        <PrivacyHero {...this.props} />
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
export default connect(mapStateToProps, mapDispatchToProps)(Privacy);