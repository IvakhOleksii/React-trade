import React from "react";
import Logo from "../../assets/imgs/png/nav/logo.png"
import * as Icon from 'react-feather';
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from 'react-redux';
const Footer = ({  user ,props}) => {
  
  return (
    <>
      <div className="   d-flex justify-content-center align-items-center flex-column footer-container mt-auto  ">
        <div className="footer-logo mt-4">
          <Link to="/">
            {" "}
            <img className=" " src={Logo} alt="social1" />
          </Link>
        </div>
        <div className="  d-flex justify-content-center align-items-center  footer-social-links pt-4">
          <a className="mr-3" href="https://web.facebook.com/">
            {" "}
            <Icon.Facebook color="white" className="footer-call  " />{" "}
          </a>
          <a className="mr-3" href="https://www.instagram.com/">
            {" "}
            <Icon.Instagram color="white" className="footer-call  " />{" "}
          </a>
          <a href="https://twitter.com/home">

            <Icon.Twitter color="white" className="footer-call  " />{" "}
          </a>
        </div>
        <Container>
          <Row className="mt-5 footer-text-area">
            <Col
              className="  footer-text-area-column-1  d-flex flex-column"
              lg={4}
              md={6}
              sm={12}
            >
              <p>
              Buy Sell Your Car Quickly & Easily with TraderSell
You get the best trade-in value or the best offer selling your vehicle and dealer you want to do business with.
              </p>
 

              <span className="d-flex mt-2">
                <Icon.Map color="white" className="   pr-2" />
                151 New Park Ave, Hartford, CT 12345 United States
              </span>
              <span className="d-flex mt-2">
                <Icon.Mail color="white" className=" l  pr-2" />
                contactus@tradesell.com
              </span>
              <span className="d-flex mt-2">
                <Icon.Phone color="white" className="   pr-2" />
                Phone:{" "}
                <span className="footer-phone-number">
                + 1 (123) 456-7890
                </span>{" "}
              </span>
            </Col>
            <Col
              className="footer-text-area-column-2  d-flex flex-column  "
              lg={2}
              md={6}
              sm={12}
            >
              <h5>About Tradersell</h5>
              <div className="footer-link-column-container d-flex flex-column">
                <Link className="footer-link" to="/">
                  {" "}
                  <Icon.ChevronRight
                    color="white"
                    className="   pr-2"
                  /> Home{" "}
                </Link>
                {user?.user_type!=="Car Dealer"?
             <React.Fragment>
             <Link className="footer-link " to="/trade-your-car">
                  
                  <Icon.ChevronRight color="white" className="   pr-2" /> Trade
                  your car 
                </Link>
                <Link className="footer-link " to="/sell-your-car">
                  
                  <Icon.ChevronRight color="white" className="   pr-2" /> Sell
                  your car 
                </Link>
             </React.Fragment>
                :""}
                <Link className="footer-link " to="/contactus">
                  <Icon.ChevronRight color="white" className="   pr-2" />{" "}
                  Contact us{" "}
                </Link>
                <Link className="footer-link " to="/login">
                  <Icon.ChevronRight color="white" className="   pr-2" /> Login{" "}
                </Link>
                <Link className="footer-link " to="/register">
                  {" "}
                  <Icon.ChevronRight color="white" className="   pr-2" />{" "}
                  Register{" "}
                </Link> 
                 
              </div>
            </Col>
            <Col
              className="footer-text-area-column-3  d-flex flex-column  "
              lg={2}
              md={6}
              sm={12}
            >
              <h5>Customer Links </h5>
              <div className="footer-link-column-container d-flex flex-column">
            
              {user?.isLogin ? (
                  <Link className="footer-link " to="/dashboard">
                    {" "}
                    <Icon.ChevronRight color="white" className="   pr-2" />{" "}
                    Dashboard{" "}
                  </Link>):""}
              <Link className="footer-link " to="/aboutus">
                  {" "}
                  <Icon.ChevronRight color="white" className="   pr-2" /> About
                  Us{" "}
                </Link>
          
                <Link className="footer-link " to="/terms-and-condition">
                  {" "}
                  <Icon.ChevronRight color="white" className="   pr-2" /> Terms and Conditions

                </Link>
                <Link className="footer-link " to="/privacy">
                  <Icon.ChevronRight color="white" className="   pr-2" />Privacy
                  your car{" "}
                </Link>
               
              </div>
            </Col>
            <Col
              className="footer-text-area-column-4   d-flex flex-column"
              lg={4}
              md={6}
              sm={12}
            >
              <h5> Comtact Us   </h5>
              <p>
              Our unique process makes dealers compete which means your current vehicle is worth more.For contact us if you have any query regarding Tradersell 
              </p>
              {/* <input
                type="text"
                className="news-letter-input"
                placeholder="Your Email"
              /> */}
            
              <Link className="btn-newsletter  " to="/contactus">
             <span className="d-flex justify-content-center">
               Contact Us
             </span>
                </Link>
            </Col>
          </Row>
        </Container>
        <div className=" d-flex justify-content-flex-start align-items-center flex-column flex-wrap footer-links"></div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  user: state.app.user
});

export default connect(mapStateToProps)(Footer); 

