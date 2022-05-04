import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Tabs, Tab } from "react-bootstrap";
import MessagingCard from "../../components/messagingCard";
import APIConfig from "../../helpers/api/config";
import axios from "axios";

class Messaging extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      key: "messaging",
      id: "",
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
      const response = await axios(
        APIConfig("get", "/messaging_conversation", null)
      );
      if (response.status === 200) {
        this.setState({
          loading: false,
          chatList: response?.data,
        });
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
