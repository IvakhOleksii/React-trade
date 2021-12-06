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
import { ArrowLeft } from "react-feather";
import APIConfig from "../helpers/api/config";
import { toast } from "react-toastify";
import axios from "axios";
import { validateSingleField } from "../helpers/validation";
class ChangePasswordForm extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {   

      loading: false,
      preview: [],

      currentPassword:"",
       newPassword:"",
        confirmPassword:""
    };
  } 
  handleFinalSubmit = async (e) => {   
    e.preventDefault();
    //this.props?.afterChangePassword(true)  
    this._isMounted = true;
    var FormData = require("form-data");
    var data = new FormData();
    // this.setState({ loading: true });
 
    // primary_photo
    data.append("password", this.state.currentPassword); 
    data.append("newpassword", this.state.newPassword); 
    data.append("id", this.props?.user?.id); 
    try {
      const response = await axios(APIConfig("post", "/resetpassword", data));
      if (response.status === 200) {
        toast.success("Password Successfully Change", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        this.setState({ loading: false,  currentPassword:"",
        newPassword:"",
         confirmPassword:"" }); 
        this.props?.afterChangePassword(true) 
      }
    } catch (error) {
      toast.error("Wrong old Password   ", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1600,
      });
    }
 
  };

  componentWillUnmount() {
    this._isMounted = false;
  }
  validatePassword = () => {
    if (this.state.newPassword !== this.state.confirmPassword) {
      toast.warn("Confirm Password does not match with Password", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
      return false;
    } else {
      return true;
    }
  };
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

             <Col  lg={12} md={12} sm={12}>
             <span
                        onClick={() =>
                          this.props?.afterChangePassword(true) 
                        }
                        className="btn--back"
                      >
                        <ArrowLeft
                          className="primary p"
                          size={20}
                          data-tour="toggle-icon"
                        />
                      </span>

             </Col>
             </Row>
            <div className="d-flex justify-content-center algin-center mb-2">
              <h3 className="car-info">   Change Password </h3>
            </div>  
         

            <Row className="  ">
              <Col lg={12} md={12} sm={12}>
                <Form.Group className="mb-3" controlId="currentPassword ">
                  <Form.Control
                    required
                    className="ts-input"
                    name="currentPassword"
                    value={"" || this.state.currentPassword}
                    onChange={(e) => this.setState({ currentPassword: e.target.value })}
                    type="password"
                    placeholder="Current Password*"
                  />
                </Form.Group>
              </Col>
            
            </Row>

            <Row className="  ">
            <Col lg={6} md={12} sm={12}>
              <Form.Group className="mb-4" controlId="newPassword ">
                  <Form.Control
                    required
                    className="ts-input"
                    name="newPassword"
                    value={"" || this.state.newPassword}
                    onChange={(e) => this.setState({ newPassword: e.target.value })}
                    type="password"
                    placeholder="New Password*"
                  />
                </Form.Group>
              </Col>
         
              <Col lg={6}  md={12} sm={12}>
              <Form.Group className="mb-4" controlId="confirmPassword">
                  <Form.Control
                    required
                    className="ts-input"
                    name="confirmPassword"
                    onBlur={() => this.validatePassword()}
                    value={"" || this.state.confirmPassword}
                    onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                    type="password"
                    placeholder="Confirm Password*"
                  />
                </Form.Group>
              </Col> 
        
            </Row> 
            
            <div className="d-flex  justify-content-center algin-items-center mt-1 ">
              {!this.state.loading ? (
               <Button className={"btn-next" } variant="primary" type="submit">
               Update
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
export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordForm);
