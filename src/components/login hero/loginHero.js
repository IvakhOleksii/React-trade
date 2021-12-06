import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Form, Button, Spinner, Alert } from "react-bootstrap";
import NavBar from "../../views/_partials/navbar";
import { Link } from "react-router-dom";
import Logo from "../../assets/imgs/png/nav/logo.png";
import axios from "axios";
import { ReactComponent as DottedSVG } from "../../assets/imgs/png/bg/dotted.svg";
import APIConfig from "../../helpers/api/config";
import { toast } from "react-toastify"; 
import ForgetPassword from "../forgetPassword";
import { ArrowLeft } from "react-feather";
// import  DottedSVG1 from "../../assets/imgs/png/bg/1.jpg";
class LoginHero extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
      showLoginForm: true,
      showNavBar: true,
    };
  }

  resetForm = () => {
    this.setState({ email: "", password: "", loading: false });
  };
  handleLogin = async () => {
    // this.props.handleAppliedAuctionTabKey("lost-auction")
    // this.props.handleSideBarItem("auction")
    // this.props.history.push('/dashboard')

    this._isMounted = false;
    var FormData = require("form-data");
    var data = new FormData();
    data.append("email", this.state.email);
    data.append("password", this.state.password);
    var tempPassword = this.state.password;
    try {
      const response = await axios(APIConfig("post", "/login", data));
      if (response.status === 200) {
        var reduxData = response.data.data;
        console.log(JSON.stringify(reduxData))
        reduxData["isLogin"] = true;
        // reduxData["password"] = tempPassword;
        this.props.UserHandler(reduxData);
        toast.success("Login SuccessFully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        this.setState({ loading: false });
        if (this.state?.showNavBar || reduxData?.user_type==="Car Dealer") {
          this.props.history.push("/dashboard");  
        } 
        this.resetForm();
      }
    } catch (error) {
      toast.error("Failed please try again  ", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      this.resetForm();
    }
  };
  handleResetPassword=(status)=> {
    if (status) { 
      this.setState({ showLoginForm: true });
    }
  }
 
  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    this.handleLogin();
    this.resetForm();
  };
  componentDidMount() {
    if (!this.props?.isNavBar) {
      this.setState({ showNavBar: this.props?.isNavBar });
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div   className={this.state?.showNavBar ? "login-hero-section" : ""}  >
        {/* <NavBar {...this.props} showSvg={true} /> */}

        {this.state?.showNavBar ? (
            <NavBar {...this.props} showSvg={true} />
          ) : (
            ""
          )}
        <Container>
          {/* <DottedSVG className="page-top-dottedSvg" /> */}
          {/* <img src={DottedSVG1} className="page-top-dottedSvg"/>  */}
          <Row className={this.state?.showNavBar ?"d-flex justify-content-center align-items-center section-t-b-padding":"d-flex justify-content-center align-items-center "}  >
            {this.state.showLoginForm ? (
              <Col lg={this.state?.showNavBar ? "5" : "12"}  md={12} sm={12}>
                <Form
                  onSubmit={(e) => {
                    this.handleSubmit(e);
                  }}
                  className={
                    this.state?.showNavBar ? "login-hero-container" : ""
                  } 
                >

                {this.state?.showNavBar ? (
                  <React.Fragment>
<div className="d-flex justify-content-center login-header-container algin-center mb-4">
                    <Link to="/">
                      {" "}
                      <img className=" " src={Logo} alt="social1" />
                    </Link>
                  </div>
   <div className="d-flex justify-content-center algin-center mb-2">
              <h3 className="car-info">   Login   </h3>
            </div>  
                  </React.Fragment>
                  
                ) : (
                  ""
                )}
                
               
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Control
                      value={this.state.email || ""}
                      onChange={(e) => this.setState({ email: e.target.value })}
                      name="email"
                      className="ts-input"
                      required
                      type="email"
                      placeholder="User Name"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Control
                      value={this.state.password || ""}
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                      name="password"
                      className="ts-input"
                      required
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 d-flex justify-content-between"
                    controlId="formBasicCheckbox"
                  >
                    {/* <Form.Check
                      type="checkbox"
                      className="ts-bbg-text-color"
                      label="Remember me"
                    /> */}
                     <span className="ts-bbg-text-color" onClick={()=>this.setState({showLoginForm:false})} style={{cursor:"pointer"}}  >
                      Forgot your password ?
                    </span>
                    {  this.state?.showNavBar ? <Link className="ts-bbg-text-color" to="/register">
                      Register
                    </Link> : ""   } 
                    
                  </Form.Group>
                  {/* <div className="d-flex justify-content-flex-start">
                    <Link className="ts-bbg-text-color" to="/register">
                      Forgot your password ?
                    </Link>
                  </div> */}
                  <div className="  justify-content-center algin-center mt-4 ">
                    {!this.state.loading ? (
                      <Button
                        className="ts-btn"
                        variant="primary"
                        type="submit"
                      >
                        Login
                      </Button>
                    ) : (
                      <Button
                        disabled
                        className="ts-btn"
                        variant="primary"
                        type="submit"
                      >
                        <Spinner animation="grow" variant="dark" size="md" />
                      </Button>
                    )}
                  </div>
                </Form>
              </Col>
            ) : (
              <Col lg={this.state?.showNavBar ? "5" : "12"} md={12} sm={12}>
                <div   className={  this.state?.showNavBar ? "login-hero-container" : "" } >
                 
                {this.state?.showNavBar ? (
                  <React.Fragment>
<div className="d-flex justify-content-center login-header-container algin-center mb-4">
                    <Link to="/">
                      {" "}
                      <img className=" " src={Logo} alt="social1" />
                    </Link>
                  </div>
     
                  </React.Fragment>
                  
                ) : (
                  ""
                )}
               
            <Col  lg={12} md={12} sm={12}>
             <span
                        onClick={() =>
                          this.setState({ showLoginForm: true }) 
                        }
                        className="btn--back"
                      >
                        <ArrowLeft
                          className="primary p mb-2"
                          size={20}
                          data-tour="toggle-icon"
                        />
                      </span>

             </Col>
             <div className="d-flex justify-content-center algin-center mb-2">
              <h3 className="car-info">   Forget Passowrd   </h3>
            </div> 
                  <ForgetPassword 
                    afterResetPassword={this.handleResetPassword}
                  />
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.app.user,
    showAlert: state.app.showAlert,
    alertMessage: state.app.alertMessage,
    alertType: state.app.alertType,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    UserHandler: (value) => dispatch({ type: "USER", value: value }),
    hanleShowAlert: (value) => dispatch({ type: "SHOW_ALERT", value: value }),
    handleAlertMessage: (value) =>
      dispatch({ type: "ALERT_MESSAGE", value: value }),
    handleAlertType: (value) => dispatch({ type: "ALERT_TYPE", value: value }),

    handleSideBarItem: (value) =>
      dispatch({ type: "SHOWSIDEBARITEM", value: value }),
    handleAppliedAuctionTabKey: (value) =>
      dispatch({ type: "APPLIED_AUCTION_KEY", value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginHero);





























































// import React, { Component } from "react";
// import { connect } from "react-redux";
// import {
//   Container,
//   Row,
//   Col,
//   Form,
//   Button,
//   Spinner,
//   Tab,
//   Image,
// } from "react-bootstrap";
// import Tabs from "react-bootstrap/Tabs";
// import NavBar from "../../views/_partials/navbar";
// import { Link } from "react-router-dom";
// import Logo from "../../assets/imgs/png/nav/logo.png";
// import axios from "axios";
// import APIConfig from "../../helpers/api/config";
// import { toast } from "react-toastify";
// import { CarMake } from "../../helpers/contraints";
// class RegistrationHero extends Component {
//   _isMounted = false;
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       user_type: "",
//       phone: "",
//       address: "",

//       state: "",
//       city: "",

//       dealerName: "",
//       carMake: "",
//       companyWebsite: "",
//       primary_photo: [],

//       loading: false,
//       showNavBar: true,

//       key: "Car Owner",
//     };
//   }
//   resetForm = () => {
//     this.setState({
//       email: "",
//       password: "",
//       user_type: "",
//       confirmPassword: "",
//       name: "",
//       loading: false,
//     });
//   };
//   handleRegistration = async () => { 
//     var FormData = require("form-data");
//     var data = new FormData();
//     if (this.state.key === "Car Owner") {
//       data.append("name", this.state.name);
//       data.append("email", this.state.email);
//       data.append("password", this.state.password);
//       data.append("user_type", this.state.key); 
//       data.append("state", this.state.state); 
//       data.append("city", this.state.city); 
//       data.append("address", this.state.address);
//       data.append("phone", this.state.phone); 
//     } else {
//       data.append("name", this.state.name);
//       data.append("email", this.state.email);
//       data.append("password", this.state.password);
//       data.append("user_type", this.state.key);
//       data.append("dealerName", this.state.dealerName);
//       data.append("companyWebsite", this.state.companyWebsite);
//       data.append("address", this.state.address);
//       data.append("phone", this.state.phone);
//       data.append("car_make", this.state.car_make);
//       //  console.log("this.state.primary_photo  "+JSON.stringify(this.state.primary_photo))
//       // var temp_primary_photo = this.state.primary_photo.map((val) => {
//       //   return val;
//       // });  
//       // for (let i = 0; i < temp_primary_photo.length; i++) {
//       //   if (temp_primary_photo[i].fileName === "license") {
//       //     alert(temp_primary_photo[i].file); 
//       //     console.log("my file"+temp_primary_photo[i].file)
//       //     data.append("license[" + 0 + "]", temp_primary_photo[i].file); 
//       //   }   
//       // } 

//       // var temp_primary_photo = this.state.primary_photo.map((val) => {
//       //   return val.file;
//       // });
//       // for (let i = 0; i < temp_primary_photo.length; i++) {
//       //   if (this.state.primary_photo.length - 1 === i) {
//       //     alert(temp_primary_photo[i])
//       //     alert(JSON.stringify( temp_primary_photo[i]))
//       //     data.append("primary_photo[" + i + "]", temp_primary_photo[i]);
//       //   }
//       // }

//       var temp_primary_photo = this.state.primary_photo.map((val) => {
//         return val.file;
//     }); 
//     for (let i = 0; i < temp_primary_photo.length; i++) {
//         if(this.state.primary_photo.length - 1 === i){
//           console.log("my file is here"+JSON.stringify(temp_primary_photo[i]))
//             data.append('license[' + i + ']', temp_primary_photo[i]);
       
//         } 
//     } 

//     }
//     // console.log("temp_primary_photo",JSON.stringify(temp_primary_photo)) 
//     try {
//       const testData={
//         name   :this.state.name,
//         email   :this.state.email,
//         password  :this.state.password,
//         dealerName  : this.state.dealerName,
//         companyWebsite : this.state.companyWebsite,
//         car_make  : this.state.car_make,
//         address:this.state.address,
//         phone:this.state.phone,
//         user_type:this.state.key,
//         license:"tst"
//       }
//       console.log(JSON.stringify(testData))
//       const response = await axios(APIConfig("post", "/register", data));
//       if (response.status === 200) {
//         var reduxData = response.data.data;
//         reduxData["isLogin"] = true;
//         this.props.UserHandler(reduxData);
//         toast.success("Successfully Registered", {
//           position: toast.POSITION.TOP_RIGHT,
//           autoClose: 1500,
//         });
//         if (this.state?.showNavBar) {
//           this.props.history.push("/trade-your-car");
//         }
//         this.resetForm();
//       } else if (response.status === 300) {
//         toast.warn("Email already Exist", {
//           position: toast.POSITION.TOP_RIGHT,
//           autoClose: 1500,
//         });
//       }
//     } catch (error) {
//       toast.warn("Failed to create new user  ", {
//         position: toast.POSITION.TOP_RIGHT,
//         autoClose: 1500,
//       });
//       console.log(error);
//       this.resetForm();
//     }
//   };
//   handleImageChange(e) {
//     e.preventDefault();
//     // del if exist previous
//     // this.state.primary_photo?.map((item, index) => {
//     //   if (item.fileName === e.target.name) {
//     //     return this.handleDeletePhoto(item, "primary_photo");
//     //   }
//     // });
//     // let files = Array.from(e.target.files);
//     // files.forEach((file) => {
//     //   let reader = new FileReader();
//     //   reader.onloadend = () => {
//     //     const Preview = reader.result;
//     //     const fileName = e.target.name;
//     //     var joined = this.state.primary_photo.concat({
//     //       file,
//     //       Preview,
//     //       fileName,
//     //     });
//     //     this.setState({ primary_photo: joined });
//     //     console.log(joined);
//     //   };
//     //   reader.readAsDataURL(file);
//     // }); 
     
//     let files = Array.from(e.target.files);
//     files.forEach((file) => {
//         let reader = new FileReader();
//         reader.onloadend = () => {
//             const Preview = reader.result;
//             var joined = this.state.primary_photo.concat({ file, Preview });
//             this.setState({ primary_photo: joined });
//         };
//         reader.readAsDataURL(file);
//     });
    
//   }
//   handleDeletePhoto = (item, fileName) => {
//     this.setState({
//       primary_photo: this.state.primary_photo.filter(function (val) {
//         return val.file !== item.file;
//       }),
//     });
//   };
//   validatePassword = () => {
//     if (this.state.password !== this.state.confirmPassword) {
//       toast.warn("Confirm Password does not match with Password", {
//         position: toast.POSITION.TOP_RIGHT,
//         autoClose: 1500,
//       });
//       return false;
//     } else {
//       return true;
//     }
//   };
//   handleSubmit = async (e) => {
//     this._isMounted = true;
//     e.preventDefault();
//     // const testData={
//     //   name   :this.state.name,
//     //   email   :this.state.email,
//     //   password  :this.state.password,
//     //   state  : this.state.state,
//     //   city  : this.state.city,
//     //   address:this.state.address,
//     //   phone:this.state.phone,
//     //   user_type:this.state.key
//     // }
//     // const testData={
//     //   name   :this.state.name,
//     //   email   :this.state.email,
//     //   password  :this.state.password,
//     //   dealerName  : this.state.dealerName,
//     //   companyWebsite : this.state.companyWebsite,
//     //   car_make  : this.state.car_make,
//     //   address:this.state.address,
//     //   phone:this.state.phone,
//     //   user_type:this.state.key,
//     //   license:this.state.primary_photo[0].file
//     // }

//     // alert(JSON.stringify(testData))
//     if (this.validatePassword()) {
//       this.setState({ loading: true });
//       this.handleRegistration();
//     }
//   };
//   componentDidMount() {
//     if (!this.props?.isNavBar) {
//       this.setState({ showNavBar: this.props?.isNavBar });
//     }
//   }
//   componentWillUnmount() {
//     this._isMounted = false;
//   }

//   render() {
//     return (
//       <div
//         className={this.state?.showNavBar ? "registration-hero-section" : ""}
//       >
//         <React.Fragment>
//           {this.state?.showNavBar ? (
//             <NavBar {...this.props} showSvg={true} />
//           ) : (
//             ""
//           )}
//           <Container>
//             <Row className="d-flex justify-content-center align-items-center section-registration-t-b-padding">
//               <Col lg={this.state?.showNavBar ? "7" : "12"} md={12} sm={12} className="registration-scroll">
//                 {this.state?.showNavBar ? (
//                   <div className="d-flex justify-content-center login-header-container algin-center ">
//                     <Link to="/">
//                       {" "}
//                       <img className=" " src={Logo} alt="social1" />
//                     </Link>
//                   </div>
//                 ) : (
//                   ""
//                 )}
//                 <Tabs
//                   id="controlled-tab-example"
//                   activeKey={this.state.key}
//                   onSelect={(k) => this.setState({ key: k })}
//                   className="tab-bg"
//                 >
//                   <Tab eventKey="Car Owner" title="Owner" className="tab-color">
//                     <Form
//                       onSubmit={(e) => {
//                         this.handleSubmit(e);
//                       }}
//                       className={
//                         this.state?.showNavBar ? "login-hero-container" : ""
//                       }
//                     >
//                       <Row>
//                         <Col lg={6} sm={12} md={12}>
//                           <Form.Group className="mb-3" controlId="name">
//                             <Form.Control
//                               value={this.state.name || ""}
//                               onChange={(e) =>
//                                 this.setState({ name: e.target.value })
//                               }
//                               required
//                               name="name"
//                               className="ts-input"
//                               type="text"
//                               placeholder="Name"
//                             />
//                           </Form.Group>
//                         </Col>
//                         <Col lg={6} sm={12} md={12}>
//                           <Form.Group className="mb-3" controlId="email">
//                             <Form.Control
//                               value={this.state.email || ""}
//                               onChange={(e) =>
//                                 this.setState({ email: e.target.value })
//                               }
//                               required
//                               name="email"
//                               className="ts-input"
//                               type="email"
//                               placeholder="User Name"
//                             />
//                           </Form.Group>
//                         </Col>
//                       </Row>

//                       <Row>
//                         <Col lg={6} sm={12} md={12}>
//                           <Form.Group className="mb-3" controlId="State">
//                             <Form.Control
//                               className="ts-input"
//                               name="state"
//                               required
//                               value={"" || this.state.state}
//                               onChange={(e) =>
//                                 this.setState({ state: e.target.value })
//                               }
//                               type="text"
//                               placeholder="State*"
//                             />
//                           </Form.Group>
//                         </Col>
//                         <Col lg={6} sm={12} md={12}>
//                           <Form.Group className="mb-3" controlId="City">
//                             <Form.Control
//                               className="ts-input"
//                               name="city"
//                               required
//                               value={"" || this.state.city}
//                               onChange={(e) =>
//                                 this.setState({ city: e.target.value })
//                               }
//                               type="text"
//                               placeholder="City*  "
//                             />
//                           </Form.Group>
//                         </Col>
//                       </Row>
//                       <Row>
//                         <Col lg={6} sm={12} md={12}>
//                           <Form.Group className="mb-3" controlId="Phone">
//                             <Form.Control
//                               className="ts-input"
//                               type="text"
//                               required
//                               value={"" || this.state.phone}
//                               onChange={(e) =>
//                                 this.setState({ phone: e.target.value })
//                               }
//                               name="phone"
//                               placeholder="Phone*"
//                             />
//                           </Form.Group>
//                         </Col>

//                         <Col lg={6} sm={12} md={12}>
//                           <Form.Group className="mb-3" controlId="address">
//                             <Form.Control
//                               value={this.state.address || ""}
//                               onChange={(e) =>
//                                 this.setState({ address: e.target.value })
//                               }
//                               required
//                               name="address"
//                               className="ts-input"
//                               type="textarea"
//                               placeholder="  Address"
//                             />
//                           </Form.Group>
//                         </Col>
//                       </Row>
//                       <Row>
//                         <Col lg={6} sm={12} md={12}>
//                           <Form.Group className="mb-3" controlId="password">
//                             <Form.Control
//                               value={this.state.password || ""}
//                               //  pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
//                               onChange={(e) =>
//                                 this.setState({ password: e.target.value })
//                               }
//                               required
//                               name="password"
//                               className="ts-input"
//                               type="password"
//                               placeholder="Password"
//                             />
//                           </Form.Group>
//                         </Col>
//                         <Col lg={6} sm={12} md={12}>
//                           <Form.Group
//                             className="mb-3"
//                             controlId="confirmPassword"
//                           >
//                             <Form.Control
//                               value={this.state.confirmPassword || ""}
//                               onChange={(e) =>
//                                 this.setState({
//                                   confirmPassword: e.target.value,
//                                 })
//                               }
//                               required
//                               onBlur={() => this.validatePassword()}
//                               name="confirmPassword"
//                               className="ts-input"
//                               type="password"
//                               placeholder="Confirm Password"
//                             />
//                           </Form.Group>
//                         </Col>
//                       </Row>

//                       {/* <Form.Group className="mb-3  " controlId="cardOwner">
//                         <Form.Check
//                           value={
//                             this.state.user_type === "owner" ? true : false
//                           }
//                           onChange={(e) =>
//                             this.setState({
//                               user_type: e.target.checked ? "Car Owner" : "",
//                             })
//                           }
//                           name="user_type"
//                           type="radio"
//                           className="ts-bbg-text-color"
//                           required
//                           label="Car Owner"
//                         />

//                         <Form.Check
//                           value={
//                             this.state.user_type === "dealer" ? true : false
//                           }
//                           onChange={(e) =>
//                             this.setState({
//                               user_type: e.target.checked ? "Car Dealer" : "",
//                             })
//                           }
//                           name="user_type"
//                           type="radio"
//                           className="ts-bbg-text-color"
//                           required
//                           label="Car Dealer"
//                         />
//                       </Form.Group> */}
//                       <div className="d-flex justify-content-flex-start">
//                         <Link className="ts-bbg-text-color" to="/login">
//                           {" "}
//                           Already a member ?
//                         </Link>
//                       </div>
//                       <div className="  justify-content-center algin-center mt-4 ">
//                         {!this.state.loading ? (
//                           <Button
//                             className="ts-btn-register-btn"
//                             variant="primary"
//                             type="submit"
//                           >
//                             Register
//                           </Button>
//                         ) : (
//                           <Button
//                             disabled
//                             className="ts-btn"
//                             variant="primary"
//                             type="submit"
//                           >
//                             <Spinner
//                               animation="grow"
//                               variant="dark"
//                               size="md"
//                             />
//                           </Button>
//                         )}
//                       </div>
//                     </Form>
//                   </Tab>

//                   <Tab eventKey="Car Dealer" title="Dealer">
//                     <Form
//                       onSubmit={(e) => {
//                         this.handleSubmit(e);
//                       }}
//                       className={
//                         this.state?.showNavBar ? "login-hero-container" : ""
//                       }
//                     >
//                       <Row>
//                         <Col lg={6} sm={12} md={12}>
//                           <Form.Group className="mb-3" controlId="name">
//                             <Form.Control
//                               value={this.state.name || ""}
//                               onChange={(e) =>
//                                 this.setState({ name: e.target.value })
//                               }
//                               required
//                               name="name"
//                               className="ts-input"
//                               type="text"
//                               placeholder="Name"
//                             />
//                           </Form.Group>
//                         </Col>
//                         <Col lg={6} sm={12} md={12}>
//                           <Form.Group className="mb-3" controlId="email">
//                             <Form.Control
//                               value={this.state.email || ""}
//                               onChange={(e) =>
//                                 this.setState({ email: e.target.value })
//                               }
//                               required
//                               name="email"
//                               className="ts-input"
//                               type="email"
//                               placeholder="User Name"
//                             />
//                           </Form.Group>
//                         </Col>
//                       </Row>
//                       <Row>
//                         <Col lg={6} sm={12} md={12}>
//                           <Form.Group className="mb-3" controlId="Phone">
//                             <Form.Control
//                               className="ts-input"
//                               type="text"
//                               required
//                               value={"" || this.state.phone}
//                               onChange={(e) =>
//                                 this.setState({ phone: e.target.value })
//                               }
//                               name="phone"
//                               placeholder="Phone*"
//                             />
//                           </Form.Group>
//                         </Col>

//                         <Col lg={6} sm={12} md={12}>
//                           <Form.Group className="mb-3" controlId="address">
//                             <Form.Control
//                               value={this.state.address || ""}
//                               onChange={(e) =>
//                                 this.setState({ address: e.target.value })
//                               }
//                               required
//                               name="address"
//                               className="ts-input"
//                               type="textarea"
//                               placeholder=" Address"
//                             />
//                           </Form.Group>
//                         </Col>
//                       </Row>
//                       <Row>
//                         <Col lg={6} sm={12} md={12}>
//                           <Form.Group className="mb-3" controlId="dealerName">
//                             <Form.Control
//                               className="ts-input"
//                               name="dealerName"
//                               value={"" || this.state.dealerName}
//                               onChange={(e) =>
//                                 this.setState({ dealerName: e.target.value })
//                               }
//                               type="text"
//                               placeholder="Dealer Name"
//                             />
//                           </Form.Group>
//                         </Col>
//                         <Col lg={6} sm={12} md={12}>
//                           <Form.Group
//                             className="mb-3"
//                             controlId="companyWebsite"
//                           >
//                             <Form.Control
//                               className="ts-input"
//                               name="companyWebsite"
//                               value={"" || this.state.companyWebsite}
//                               onChange={(e) =>
//                                 this.setState({
//                                   companyWebsite: e.target.value,
//                                 })
//                               }
//                               type="text"
//                               placeholder="Company Website*  "
//                             />
//                           </Form.Group>
//                         </Col>
//                       </Row>

//                       <Row>
//                         <Col lg={12} sm={12} md={12}>
//                           <Form.Group controlId="carMake">
//                             <Form.Select
//                               name="carMake"
//                               required
//                               value={"" || this.state.carMake}
//                               onChange={(e) =>
//                                 this.setState({ carMake: e.target.value })
//                               }
//                               className="ts-input mb-3"
//                               defaultValue="  Car Make"
//                             >
//                               <option>Car Make </option>
//                               {CarMake?.map((item, index) => (
//                                 <option value={item}>{item}</option>
//                               ))}
//                             </Form.Select>
//                           </Form.Group>
//                         </Col>
//                       </Row>

//                       <Row>
//                         <Col lg={6} sm={12} md={12}>
//                           <Form.Group className="mb-3" controlId="password">
//                             <Form.Control
//                               value={this.state.password || ""}
//                               //  pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
//                               onChange={(e) =>
//                                 this.setState({ password: e.target.value })
//                               }
//                               required
//                               name="password"
//                               className="ts-input"
//                               type="password"
//                               placeholder="Password"
//                             />
//                           </Form.Group>
//                         </Col>
//                         <Col lg={6} sm={12} md={12}>
//                           <Form.Group
//                             className="mb-3"
//                             controlId="confirmPassword"
//                           >
//                             <Form.Control
//                               value={this.state.confirmPassword || ""}
//                               onChange={(e) =>
//                                 this.setState({
//                                   confirmPassword: e.target.value,
//                                 })
//                               }
//                               required
//                               onBlur={() => this.validatePassword()}
//                               name="confirmPassword"
//                               className="ts-input"
//                               type="password"
//                               placeholder="Confirm Password"
//                             />
//                           </Form.Group>
//                         </Col>
//                       </Row>
//                       <Row>
//                         {/* <Col lg={6} md={12} sm={12}>
//                           <Form.Label className="sell-form-label">
//                             Copy of State mandated dealers license
//                           </Form.Label>
//                           <Form.Group className="mb-3" controlId="license">
//                             <Form.Control
//                               name="primary_photo"
//                               onChange={(e) => this.handleImageChange(e)}
//                               className="ts-input"
//                               type="file"
//                             />
//                           </Form.Group>
//                         </Col> */}
//                          <Col lg={6} md={12} sm={12}>
//                                                 <Form.Label className="sell-form-label">       Primary photo *</Form.Label>
//                                                 <Form.Group className="mb-1" controlId="Primary Photo">
//                                                     <Form.Control name="primary_photo"
//                                                         //  value={"" || this.state.primary_photo} 
//                                                         // onChange={(e) => this.setState({ primary_photo: e.target.file })} 
//                                                          onChange={(e) => this.handleImageChange(e)}
//                                                         className="ts-input" type="file" placeholder="  Primary Photo " />
//                                                 </Form.Group>
//                                             </Col>
//                         <Col
//                           lg={6}
//                           md={12}
//                           sm={12}
//                           className="preview-images-list"
//                           style={{ paddingTop: "unset" }}
//                         >
//                           {this.state.primary_photo?.map((item, index) => {
//                             if (item.fileName === "license") {
//                               return (
//                                 <span
//                                   key={index}
//                                   className="image-container d-flex justify-content-center"
//                                 >
//                                   <Image src={item.Preview} thumbnail />
//                                 </span>
//                               );
//                             }
//                           })}
//                         </Col>
//                       </Row>

//                       {/* <Form.Group className="mb-3  " controlId="cardOwner">
//                         <Form.Check
//                           value={
//                             this.state.user_type === "owner" ? true : false
//                           }
//                           onChange={(e) =>
//                             this.setState({
//                               user_type: e.target.checked ? "Car Owner" : "",
//                             })
//                           }
//                           name="user_type"
//                           type="radio"
//                           className="ts-bbg-text-color"
//                           required
//                           label="Car Owner"
//                         />

//                         <Form.Check
//                           value={
//                             this.state.user_type === "dealer" ? true : false
//                           }
//                           onChange={(e) =>
//                             this.setState({
//                               user_type: e.target.checked ? "Car Dealer" : "",
//                             })
//                           }
//                           name="user_type"
//                           type="radio"
//                           className="ts-bbg-text-color"
//                           required
//                           label="Car Dealer"
//                         />
//                       </Form.Group> */}
//                       <div className="d-flex justify-content-flex-start">
//                         <Link className="ts-bbg-text-color" to="/register">
//                           {" "}
//                           Already a member ?
//                         </Link>
//                       </div>
//                       <div className="  justify-content-center algin-center mt-4 ">
//                         {!this.state.loading ? (
//                           <Button
//                             className="ts-btn-register-btn"
//                             variant="primary"
//                             type="submit"
//                           >
//                             Register
//                           </Button>
//                         ) : (
//                           <Button
//                             disabled
//                             className="ts-btn"
//                             variant="primary"
//                             type="submit"
//                           >
//                             <Spinner
//                               animation="grow"
//                               variant="dark"
//                               size="md"
//                             />
//                           </Button>
//                         )}
//                       </div>
//                     </Form>
//                   </Tab>
//                 </Tabs>
//               </Col>
//             </Row>
//           </Container>
//         </React.Fragment>
//       </div>
//     );
//   }
// }
// const mapStateToProps = (state) => {
//   return {
//     user: state.app.user,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     UserHandler: (value) => dispatch({ type: "USER", value: value }),
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(RegistrationHero);
