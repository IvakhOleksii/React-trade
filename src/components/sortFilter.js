import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col,   Form  } from "react-bootstrap";  
class SortFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
       
    };
  } 
  handleChange = (e) => {   
    this.props.handleSortFilter(e.target.value)
    if(e.target.value === "reset"){
      this.props.handleFilters("")   
    }
    else{
      this.props.handleFilters(e.target.value)
    }
  };

  
  render() {
    return (
      <div className=" ">
      
          <Row className=" pt-1 item-right pr-2">
            <Col lg={3} md={12} sm={12} className="cars-modal-textfeild  ">
              <Form.Group controlId="sort_by">
                <Form.Select
                  name="sort_by"
                  required
                  value={"" ||  this.props.sortFilter}
                  onChange={(e) =>this.handleChange(e)}
                  className="ts-input"
                  defaultValue="     Sort By"  >
                  <option>Sort By</option>
                  <option value="sell">Sell</option>
                  <option value="trade">Trade</option>
                  <option value="admin_approved">Admin Approved</option>
                  <option value="admin_declined">Admin Declined</option>
                  <option value="owner_approved">Owner Accepted</option>
                  <option value="owner_declined">Owner Declined</option>
                  <option value="reset">Reset</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row> 
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
      sortFilter: state.app.sortFilter  
  };
};
const mapDispatchToProps = (dispatch) => {
  return { 
    handleSortFilter: (value) => dispatch({ type: "SORT_FILTER", value: value }), 
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SortFilter);
