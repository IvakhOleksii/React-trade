import React, { Component } from "react";
import { connect } from "react-redux";
import { 
  Row,
  Col,
  Form,
  Button,
  Image, 
  Spinner,
} from "react-bootstrap";
// import { ArrowLeft } from "react-feather";
import APIConfig from "../helpers/api/config";
import { toast } from "react-toastify";
import axios from "axios";
import { validateSingleField } from "../helpers/validation";
class ForgetPassword extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {   

      loading: false,
      preview: [],

      email:"", 
    };
  } 
  handleFinalSubmit = async (e) => {  
    e.preventDefault();
    // this.props?.afterResetPassword(true) 
   
    this._isMounted = true;
    var FormData = require("form-data");
    var data = new FormData();
    this.setState({ loading: true });
 
    // primary_photo
    data.append("email", this.state.email);   
    try {
      const response = await axios(APIConfig("post", "/forget", data));
      if (response.status === 200) {
        toast.success("Your password has been reset please check your email address ", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        this.setState({ loading: false }); 
        this.props?.afterResetPassword(true) 
      } 
    } catch (error) {  
        if (error.message === "Request failed with status code 320"){
        toast.success("Your email does not exist please enter valid email", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        this.setState({ loading: false }); 
      }else{
          toast.error("Network Error ", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      }
    
    }
 
  };

  componentWillUnmount() {
    this._isMounted = false;
  }
 
  render() {
    return (
      <Row className=" ">
        <Col lg={12} md={12} sm={12}>
          <Form
            className="pr-2 "
            onSubmit={(e) => {
              this.handleFinalSubmit(e);
            }}
          >
             <Row className="  ">

             {/* <Col  lg={12} md={12} sm={12}>
             <span
                        onClick={() =>
                          this.props?.afterResetPassword(true) 
                        }
                        className="btn--back"
                      >
                        <ArrowLeft
                          className="primary p mb-2"
                          size={20}
                          data-tour="toggle-icon"
                        />
                      </span>

             </Col> */}
             </Row>
            {/* <div className="d-flex justify-content-center algin-center mb-2">
              <h3 className="car-info">   Forget Password </h3>
            </div>   */}
         

            <Row className="  ">
              <Col lg={12} md={12} sm={12}>
                <Form.Group className="mb-3 mt-2" controlId="email ">
                  <Form.Control
                    required
                    className="ts-input"
                    name="email"
                    value={"" || this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                    type="email"
                    placeholder="Enter Email*"
                  />
                </Form.Group>
              </Col>
            
            </Row>

           
            <div className="d-flex  justify-content-center algin-items-center mt-5 ">
              {!this.state.loading ? (
               <Button className={ "ts-btn"} variant="primary" type="submit">
                Reset Password
        </Button> 
              ) : (
                <Button disabled className="btn-next" variant="primary">
                  <Spinner animation="grow" variant="dark" size="sm" />
                </Button>
              )}
            </div>
            
          </Form>
        </Col>
      </Row>
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
export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);
