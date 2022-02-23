import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsData: this.props.cardsData,
    };
  }
  handleOptionSelect = (value) => {
    this.props.handleOptionSelect(value);
  };

  render() {
    return (
      <div className=" margin-top-medium">
        <h3 className="trade-your-car-heading">
          {this.state.cardsData.heading1}
          <span className="d-inline trader-sell-text pl-2">
            {this.state.cardsData.heading2}
          </span>{" "}
        </h3>

        <Row className="trade-your-car-cards-container">
          {this.state.cardsData.cards.map((item, index) => (
            <Col
              key={index}
              onClick={() => this.handleOptionSelect(item.value)}
              className="option-card-container  "
              lg={5}
              sm={12}
              md={5}
            >
              <div className="option-card-bg card1">
                <p>{item.value}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
export default Card;
