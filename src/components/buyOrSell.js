import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
class NewCars extends Component {
  handleRedirect = (value) => {
    this.props.history.push("/login");
  };
  render() {
    return (
      <div className="buy-sell-section">
        <Container>
          <Row className="buy-sell-container">
            <Col
              onClick={() => this.handleRedirect("trade")}
              className="buy-card"
              lg={6}
              md={12}
              sm={12}
            >
              <h1 className="tr-heading">Are you looking to buy a new car?</h1>
              <p className="tr-sub-heading">
                Start searching our inventory that includes 2000+ cars
              </p>
            </Col>
            <Col
              onClick={() => this.handleRedirect("sell")}
              className="sell-card"
              lg={6}
              md={12}
              sm={12}
            >
              <h1 className="tr-heading">Are you looking to sell your car?</h1>
              <p className="tr-sub-heading">
                Add your vehicle to inventory & reach 3k potential buyers
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.app.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(NewCars);
