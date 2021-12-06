
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Container, Row, Col, Form, Button , Spinner } from "react-bootstrap"; 
import axios from "axios"
import APIConfig from '../../helpers/api/config';
import NavBar from "../../views/_partials/navbar"
import { toast } from 'react-toastify';
class ContactUsHero extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading:false,
            first_name: "",
            last_name: "",
            company: "",
            email: "",
            phone_number: "",
            message: ""
        }
    }
    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            ...this.state,
            [name]: value
        })
    }
    handleSubmit  = async (e) => {
        e.preventDefault()
        this.setState({ loading: true })
        var FormData = requestAnimationFrame('form-data');
        var data = new FormData();
        data.append('first_name', this.state.first_name,);
        data.append('last_name', this.state.last_name);
        data.append('company', this.state.company);
        data.append('email', this.state.email);
        data.append('phone_number', this.state.phone_number);
        data.append('message', this.state.message); 
        try {
            const response = await axios(APIConfig('post', '/contact_us', data));
            if (response.status === 200) { 
                toast.success("Your message has been sent SuccessFully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1500,
                });
                this.setState({ loading: false })
                this.props.history.push('/')  
            }
        } catch (error) { 
            toast.error("Please try again  ", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1500,
            });
           
        }
    } 
    render() {
        return (
            <div className="contact-hero-section">
                <NavBar {...this.props} showSvg={true} />
                <Container>
                    <Row className="d-flex justify-content-center align-items-center section-contact-t-b-padding">
                        <Col className="text-area p-3 mb-2" lg={12} md={12} sm={12}>
                            <h2>Contact us </h2>
                            <p>Whether your trading-in or selling let us help you
                                get the most value from your current vehicle. </p>
                        </Col>
                        <Col lg={8} md={12} sm={12}>
                            <Form className="login-hero-container margin-top-medium" onSubmit={(e) => this.handleSubmit(e)}>
                                <div className="d-flex justify-content-center algin-center mb-4">
                                    <h1 classname="your-info">Your Information</h1>
                                </div>
                                <Row className="   ">
                                    <Col lg={6} md={12} sm={12}>
                                        <Form.Group className="mb-3" controlId="first_name">
                                            <Form.Control required value={this.state.first_name || ""} name="first_name" onChange={(e) => this.handleChange(e)} className="ts-input" type="text" placeholder="  First Name" />
                                        </Form.Group>

                                    </Col>
                                    <Col lg={6} md={12} sm={12}>

                                        <Form.Group className="mb-3" controlId="last_name">
                                            <Form.Control required value={this.state.last_name || ""} name="last_name" onChange={(e) => this.handleChange(e)} className="ts-input" type="text" placeholder=" Last Name" />
                                        </Form.Group>
                                    </Col>
                                </Row>


                                <Form.Group className="mb-3" controlId="company">
                                    <Form.Control required value={this.state.company || ""} name="company" onChange={(e) => this.handleChange(e)} className="ts-input" type="text" placeholder="Company" />
                                </Form.Group>

                                <Row className="  ">
                                    <Col lg={6} md={12} sm={12}>
                                        <Form.Group className="mb-3" controlId="email">
                                            <Form.Control required value={this.state.email || ""} name="email" onChange={(e) => this.handleChange(e)} className="ts-input" type="email" placeholder="   Email" />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} md={12} sm={12}>

                                        <Form.Group className="mb-3" controlId="phone_number">
                                            <Form.Control required value={this.state.phone_number || ""} name="phone_number" onChange={(e) => this.handleChange(e)} className="ts-input" type="number" placeholder="   Phone Number" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-3" controlId="message">
                                    <Form.Control required className="ts-input" rows="4" cols="50" as="textarea"
                                        value={this.state.message || ""} name="message" onChange={(e) => this.handleChange(e)}
                                        style={{ height: '100px' }} type="text" placeholder="    Message  " />
                                </Form.Group>

                                <div className="  justify-content-center algin-center mt-4 ">
                                {!this.state.loading ?   <Button className="ts-btn" variant="primary" type="submit">
                                        Send
                                 </Button> :
                                    <Button disabled className="ts-btn" variant="primary" type="submit">
                                     <Spinner animation="grow" variant="dark" size="md" />
                             </Button>    } 
                                </div>

                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div >

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
export default connect(mapStateToProps, mapDispatchToProps)(ContactUsHero);