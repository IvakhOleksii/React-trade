import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { Send } from "react-feather";
import Loader from "../components/loader";
import Img from "../assets/imgs/png/bg-chats.jpg";
import classNames from "classnames";
import { ArrowLeft } from "react-feather";  
import moment from "moment"
class MessagingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      showDiv: true,
      isMobile: false,
      message:'', 
      activeChatId:null
    };  
  } 
 
  chatContainer = React.createRef();

  handleSelectCoversation(conversation_item) { 
    this.props.handleChatChange(conversation_item);
    this.setState({ showDiv: false,activeChatId:conversation_item });
  }

  handleBack = () => {
    this.setState({ showDiv: true });
  };
  scrollToMyRef = () => {
    const scroll =
      this.chatContainer.current.scrollHeight -
      this.chatContainer.current.clientHeight;
    this.chatContainer.current.scrollTo(0, scroll);
  };
  componentDidMount() {
    window.addEventListener("resize", () => {
      this.setState({
        isMobile: window.innerWidth < 768,
      }, ()=>{
        this.scrollToMyRef()
      });
    });   
  
  }
  componentDidUpdate() {
    this.scrollToMyRef()
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handlePostMessage(this.state.message) 
   this.scrollToMyRef()
   this.setState({message:""})
  };
 
  render() {
    return (
      <>
        <Row>
          <Col
            lg={4}
            md={4}
            sm={4}
            className={`${
              this.state.isMobile ? (this.state.showDiv ? "block" : "none") : ""
            } border chat-height scroll chats`}
          >
            <h4 className="d-flex justify-content-center algin-center pb-3">
              Chats
            </h4>
            <div className="">
              <ul className="message-list">
                {/* {this.props?.loading? <Loader />
               : */}
                {this.props?.chatList?.map((item) => {
                  return (
                    <li
                      onClick={() =>
                        this.handleSelectCoversation(item)
                      }
                    >
                      <Nav vertical className="w-100">
                        <NavItem className="w-100">
                          <NavLink onClick=""  className={this.state?.activeChatId===item?"nav-msg active-chat ":"nav-msg"}>
                            <div className="d-flex justify-content-between border-bottom chatters pb-2 ">
                              <div className="d-flex w-100">
                                <img
                                  src={`${process.env.React_App_BASE_URL_IMAGE}/storage/images${item.dp}`}
                                  className="chats-msg-image"
                                />
                                <div className="d-flex flex-column ml-2 w-100">
                                <h5 className="  chat-name">{item.name}</h5>
                                <div className="d-flex justify-content-between w-100">
                                <p className="last-msg">{item.message.substr(0, 23)}...</p>
                                <p className="chat-time">
                                  {moment(item.created_at).fromNow() }
                                </p>
                                </div>
                                </div> 

                              </div> 
                            </div>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Col>

          <Col
            lg={8}
            md={8}
            sm={8} ref={this.chatContainer}
            className="border bg-right chat-height scroll messages"
          >
          {this.state.isMobile ? <ArrowLeft
              className="primary p ml-3"
              size={26}
              data-tour="toggle-icon"
              onClick={this.handleBack}
            />
          :""}
            <div className="msgs">
              <ul    className="message-list-chats">
                {this.props?.loading ? (
                  <Loader />
                ) : (
                  this.props?.chat?.map((item) => {
                    return (
                      <li  key={item.id}>
                        <div
                          className={`${
                            this.props.user?.id === item.sent_by
                              ? "chatRight"
                              : "chatLeft"
                          } chat`}
                        >
                          <img
                            src={`${process.env.React_App_BASE_URL_IMAGE}/storage/images/${this.props.user?.dealer_image}`}
                            className="msg-image"
                          />
                          {/* <h5>{item.id}</h5> */}
                          <div   className="chat">{ item?.approved_status===0 || item?.approved_status===2 ?"Pending for admin approval":item.message}</div>
                        </div>
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          </Col>
        </Row>
       
          <form onSubmit={(e) => this.handleSubmit(e)}> 
          <Row className="">
            <Col
              lg={4}
              md={4}
              sm={4}
              className="d-flex justify-content-center algin-center border"
            ></Col>

            <Col
              lg={8}
              md={8}
              sm={8}
              className="d-flex justify-content-center algin-center border pl-0"
            >
              <input
                type="text"
                placeholder="Type a Message Here...."
                className="w-100 chatInput"
                required
                value={this.state.message}
                name="message"
                onChange={(e)=> this.setState({[e.target.name]:e.target.value}) } 
              />

              <Button
                className="svg-send-btn"
                type="submit" 
                disabled={!this.props?.chat?.length>0?true:false}
              >
                <Send
                  className="primary p justify-content-center algin-center pt-1"
                  size={28}
                  data-tour="toggle-icon"
                />
              </Button>
            </Col>  </Row>
          </form>
      
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(MessagingCard);
