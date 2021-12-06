
import React, { Component } from 'react'
import { connect } from 'react-redux'; 
import Footer from '../_partials/footer';
import AuctionDetailHero from '../../components/auctionDetailHero/auctionDetailHero'; 
class AuctionDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    } 
  } 
  render() {
    return ( 
          <React.Fragment>
            <AuctionDetailHero {...this.props} /> 
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
export default connect(mapStateToProps, mapDispatchToProps)(AuctionDetail);