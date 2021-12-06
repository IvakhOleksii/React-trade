import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Card, Tabs, Tab, Col } from "react-bootstrap";
import MessagingCard from "../../components/messagingCard";
import Image1 from "../../assets/imgs/png/newcars/1.jpg";
import Image2 from "../../assets/imgs/png/newcars/2.jpg";
import Image3 from "../../assets/imgs/png/newcars/3.jpg";
import APIConfig from "../../helpers/api/config";
import axios from "axios";

class Messaging extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      key: "messaging",
      id: "",
      // chat: [
      //  {
      //   senderId:'1',
      //   receiverId:'2',
      //   senderImage:Image1,
      //   receiverImage:Image2,
      //   conversation_id:1,
      //   lastMessage:'bye',
      //   conversation:[
      //     {
      //       senderId: "1",
      //       conversation_id: 1,
      //       Image: Image1,
      //       sender: false,
      //       text: "who'll win?who'll 'll win?who'll win?",
      //     },
      //     {
      //       senderId: "",
      //       conversation_id: 1,
      //       Image: Image1,
      //       sender: true,
      //       text: "who'll win?",
      //     },
      //     {
      //       senderId: "",
      //       conversation_id: 1,
      //       Image: Image2,
      //       sender: true,
      //       text: "i will ...",
      //     },
      //   ],
      //  } ,

      //  {
      //   senderId:'1',
      //   receiverId:'2',
      //   senderImage:Image1,
      //   receiverImage:Image2,
      //   conversation_id:2,
      //   lastMessage:'bye',
      //   conversation:[
      //     {
      //       senderId: "1",
      //       conversation_id: 2,
      //       Image: Image1,
      //       sender: false,
      //       text: "who'll win?who'llasasas 'all win?who'll win?",
      //     },
      //     {
      //       senderId: "",
      //       conversation_id: 2,
      //       Image: Image1,
      //       sender: true,
      //       text: "who'll win? asasasas",
      //     },
      //     {
      //       senderId: "",
      //       conversation_id: 2,
      //       Image: Image2,
      //       sender: true,
      //       text: "i will  asasas...",
      //     }
      //   ],
      //  } ,

      //  {
      //   senderId:'2',
      //   receiverId:'3',
      //   senderImage:Image1,
      //   receiverImage:Image2,
      //   conversation_id:3,
      //   lastMessage:'bye',
      //   conversation:[
      //     {
      //       senderId: "31",
      //       conversation_id: 3,
      //       Image: Image1,
      //       sender: false,
      //       text: "who'll  asas 'll win?",
      //     },
      //     {
      //       senderId: "",
      //       conversation_id: 3,
      //       Image: Image1,
      //       sender: true,
      //       text: "who'll wa sas  in? asasasas",
      //     },
      //     {
      //       senderId: "",
      //       conversation_id: 3,
      //       Image: Image2,
      //       sender: true,
      //       text: "i will  asasas asasas...",
      //     }
      //   ],
      //  } ,

      // ],

      // chatList: [
      //   {
      //     Image: Image1,
      //     conversation_id: 1,
      //     Name: "Kelvin",
      //     Time: "3:10pm",
      //   },
      //   {
      //     Image: Image2,
      //     conversation_id: 2,
      //     Name: "Perboasdasrgen",
      //     Time: "3:10pm",
      //   }  ,
      //   {
      //     Image: Image2,
      //     conversation_id: 3,
      //     Name: "naaa",
      //     Time: "3:10pm",
      //   }
      // ],
      //   chat:[
      //     {
      //         "id": 1,
      //         "dealer_id": 26,
      //         "owner_id": 9,
      //         "item_id": 10,
      //         "message": "Hello, How are you?",
      //         "sent_by": 26,
      //         "created_at": "2021-10-15 03:13:25",
      //         "dp": "/LiwJetYvH6AuynHI6dG8CJmWRegukm0NVUIEA9qc.jpg",
      //         "name": "d4"
      //     },
      //     {
      //         "id": 2,
      //         "dealer_id": 26,
      //         "owner_id": 9,
      //         "item_id": 10,
      //         "message": "Hello, I am good. How are you? DADADAD",
      //         "sent_by": 9,
      //         "created_at": "2021-10-15 03:13:25",
      //         "dp": "/LiwJetYvH6AuynHI6dG8CJmWRegukm0NVUIEA9qc.jpg",
      //         "name": "DANISH 3 ALI 122bbb"
      //     },
      //     {
      //         "id": 3,
      //         "dealer_id": 26,
      //         "owner_id": 9,
      //         "item_id": 10,
      //         "message": "I am good, Can you please tell me what is the model of this Car?",
      //         "sent_by": 26,
      //         "created_at": "2021-10-15 03:13:25",
      //         "dp": "/LiwJetYvH6AuynHI6dG8CJmWRegukm0NVUIEA9qc.jpg",
      //         "name": "d4"
      //     },
      //     {
      //         "id": 4,
      //         "dealer_id": 26,
      //         "owner_id": 9,
      //         "item_id": 10,
      //         "message": "Its Audi 2009 Model.",
      //         "sent_by": 9,
      //         "created_at": "2021-10-15 03:13:25",
      //         "dp": "/LiwJetYvH6AuynHI6dG8CJmWRegukm0NVUIEA9qc.jpg",
      //         "name": "DANISH 3 ALI 122bbb"
      //     }
      // ],
      //     chatList:[
      //       {
      //           "id": 26,
      //           "dealer_id": 26,
      //           "owner_id": 9,
      //           "item_id": 9,
      //           "message": "Hello, How are you?",
      //           "sent_by": "dealer",
      //           "created_at": null,
      //           "name": "d4",
      //           "email": "d4@d4.com",
      //           "email_verified_at": null,
      //           "password": "$2y$10$Qzwfqfj3gUUuHuz7JndB1OQzF8Dc..A.26YeGo8xKwfT9sJBDY.0y",
      //           "two_factor_secret": null,
      //           "two_factor_recovery_codes": null,
      //           "remember_token": null,
      //           "current_team_id": null,
      //           "profile_photo_path": null,
      //           "location": null,
      //           "state": null,
      //           "city": null,
      //           "address": "d4",
      //           "dealername": "d4",
      //           "companywebsite": "d4",
      //           "car_make": "Ferrari",
      //           "license": "8df1b450b2bc3238b25e27bc9d2fa321.jpg",
      //           "dp": "/LiwJetYvH6AuynHI6dG8CJmWRegukm0NVUIEA9qc.jpg",
      //           "dealer_licence": "/wKwApefzYLxhQod5tumO7tkBmb4xH37Iv6WbVDwA.jpg",
      //           "phone": "d4",
      //           "member_type": "user",
      //           "user_type": "Car Dealer",
      //           "updated_at": "12/10/2021",
      //           "stripe_id": null,
      //           "card_brand": null,
      //           "card_last_four": null,
      //           "trial_ends_at": null
      //       },
      //       {
      //           "id": 26,
      //           "dealer_id": 26,
      //           "owner_id": 9,
      //           "item_id": 10,
      //           "message": "Hello, How are you?",
      //           "sent_by": "dealer",
      //           "created_at": null,
      //           "name": "d4",
      //           "email": "d4@d4.com",
      //           "email_verified_at": null,
      //           "password": "$2y$10$Qzwfqfj3gUUuHuz7JndB1OQzF8Dc..A.26YeGo8xKwfT9sJBDY.0y",
      //           "two_factor_secret": null,
      //           "two_factor_recovery_codes": null,
      //           "remember_token": null,
      //           "current_team_id": null,
      //           "profile_photo_path": null,
      //           "location": null,
      //           "state": null,
      //           "city": null,
      //           "address": "d4",
      //           "dealername": "d4",
      //           "companywebsite": "d4",
      //           "car_make": "Ferrari",
      //           "license": "8df1b450b2bc3238b25e27bc9d2fa321.jpg",
      //           "dp": "/LiwJetYvH6AuynHI6dG8CJmWRegukm0NVUIEA9qc.jpg",
      //           "dealer_licence": "/wKwApefzYLxhQod5tumO7tkBmb4xH37Iv6WbVDwA.jpg",
      //           "phone": "d4",
      //           "member_type": "user",
      //           "user_type": "Car Dealer",
      //           "updated_at": "12/10/2021",
      //           "stripe_id": null,
      //           "card_brand": null,
      //           "card_last_four": null,
      //           "trial_ends_at": null
      //       }
      //   ],
      chat: [],
      chatList: [],
      showChat: [],
      loading: false,
      singleChatItem: null,
    };
  }
  getData = async () => {
    this._isMounted = true;
    this.setState({ loading: true });
    try {
      const response =
        this.props.user?.user_type === "Car Owner"
          ? await axios(
              APIConfig(
                "get",
                `/messaging_conversation/${this.props.user?.id}/owner`,
                null
              )
            )
          : await axios(
              APIConfig(
                "get",
                `/messaging_conversation/${this.props.user?.id}/dealer`,
                null
              )
            );
      if (response.status === 200) {
        this.setState({
          loading: false,
          chatList: response?.data,
        });
        // console.log("this is messsage Dta last message : : "+ JSON.stringify(response?.data))
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };
  handleChatChange = async (conversation_item) => {
    this._isMounted = true;
    this.setState({ loading: true, singleChatItem: conversation_item });
    try {
      const response = await axios(
        APIConfig("get", `/conversation/${conversation_item?.item_id}`, null)
      );

      if (response.status === 200) {
        this.setState({
          loading: false,
          chat: response?.data,
        });
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };
  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidMount() {
    this.getData();
  }
  handlePostMessage = async (newMessage) => {
    this._isMounted = true;
    // updating internal State
    var tempChatArray = [...this.state.chat];
    var tempNewMessageObj = {
      message: newMessage,
      id: Math.random(),
      sent_by: this.props.user?.id,
      dealer_id: 26,
      owner_id: 9,
      item_id: 9,
      created_at: "2021-10-15 03:13:25",
      dp: this.props.user?.dp,
      name: "xyz",
    };
    tempChatArray.push(tempNewMessageObj);
    this.setState({ chat: tempChatArray }, () => {});
    // updating message in API

    var FormData = require("form-data");
    var data = new FormData();
    data.append("message", newMessage);
    data.append("sent_by", this.props?.user?.id);
    data.append("item_id", this.state.chat[0]?.item_id);
    data.append("dealer_id", this.state.chat[0]?.dealer_id);
    data.append("owner_id", this.state.chat[0]?.owner_id);

    try {
      const response = await axios(APIConfig("post", "/addmessaging", data));
      if (response.status === 200) {
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };
  render() {
    return (
      <div className="w-100">
        <Card className="tabs-card">
          <Card.Header className="scroll-messaging">
            <Tabs
              id="controlled-tab-example"
              activeKey={this.state.key}
              onSelect={(k) => this.setState({ key: k })}
              className="mb-3 main-content-tabs "
            >
              <Tab eventKey="messaging" title="Messaging" className="">
                <MessagingCard
                  handleChatChange={this.handleChatChange}
                  handlePostMessage={this.handlePostMessage}
                  loading={this.state.loading}
                  chat={this.state.chat}
                  chatList={this.state.chatList}
                  {...this.props}
                />
              </Tab>
            </Tabs>
          </Card.Header>
        </Card>
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
export default connect(mapStateToProps, mapDispatchToProps)(Messaging);
