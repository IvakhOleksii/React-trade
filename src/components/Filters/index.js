import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Search } from "react-feather";
import { toast } from "react-toastify";
import Switch from "react-switch";
import { CarMake } from "../../helpers/contraints";
import StatesInput from "./StatesInput";

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      car_make: "",
      car_model: "",
      state: "",
      location: false,
    };
  }

  handleResetFrom = () => {
    this.setState({
      car_make: "",
      car_model: "",
      location: false,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    var obj = {
      car_make: this.state.car_make,
      car_model: this.state.car_model,
      location: this.state.location,
      state: this.state.state,
    };
    if (
      obj.car_make !== "" ||
      obj.state !== "" ||
      this.state.location === true ||
      obj.car_model !== ""
    ) {
      this.props.handleFilters(obj);
    } else {
      this.props.handleFilters(obj);
      toast.error("Please fill any one field before search", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1800,
      });
    }
  };
  render() {
    return (
      <div className=" ">
        <Form
          onSubmit={(e) => {
            this.handleSubmit(e);
          }}
        >
          <Row className=" pt-1 ">
            <Col lg={2} md={12} sm={12} className="cars-modal-textfeild">
              <Form.Group className="mb-3" controlId="  car_model">
                <Form.Control
                  name="car_model"
                  value={"" || this.state.car_model}
                  onChange={(e) => this.setState({ car_model: e.target.value })}
                  className="ts-input "
                  type="text"
                  placeholder=" Car Model"
                />
              </Form.Group>
            </Col>
            <Col lg={2} md={12} sm={12} className="cars-modal-textfeild">
              <Form.Group controlId="car_make">
                <Form.Select
                  name="car_make"
                  value={this.state.car_make || ""}
                  onChange={(e) => this.setState({ car_make: e.target.value })}
                  className="ts-input"
                >
                  <option>Car Make </option>
                  {CarMake?.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col lg={2} md={12} sm={12} className="cars-modal-textfeild">
              <StatesInput
                value={this.state.state || ""}
                handleChange={(e) => this.setState({ state: e.target.value })}
              />
            </Col>
            <Col
              lg={3}
              md={12}
              sm={12}
              className="cars-modal-textfeild location-cars"
            >
              <label className="d-flex mt-2">
                <span className="mr-2  ">Search by Distance</span>
                <Switch
                  className=" "
                  onChange={() =>
                    this.setState({
                      location: !this.state.location,
                    })
                  }
                  checked={this.state.location}
                />
              </label>
            </Col>
            <Col className="double-btns" lg={3} md={12} sm={12}>
              <Button type={"submit"} className=" btn-search  ">
                Search
                <Search
                  className="primary p"
                  size={20}
                  data-tour="toggle-icon"
                />
              </Button>
              <Button
                onClick={() => this.props.handleResetFilter()}
                className=" btn-reset "
              >
                Reset{" "}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default connect(null, null)(Filters);
