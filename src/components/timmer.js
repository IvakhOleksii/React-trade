import moment from "moment";
import React, { Component } from "react";
class Timmer extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      endTime: this.props?.endTime?.created_at,
      outDatedAuctionId:this?.props?.endTime.id,
      time: "",
      timer: false,
      timerEndDate: "",
      hours: "",
      minutes: "",
      seconds: "",
      discountValue: "",
      timmerSection: false,
    };
  }

  tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    // return time.join(""); // return adjusted time or original string
  }
  handleElemenateItem = () =>{
    if(this.state.time === "00:  00:    00" ){
      clearInterval(this.myInterval);
      this.props.handleOutDatedAuction(this.state?.outDatedAuctionId) 
    }
  }
  // 2021-10-12 21:21:39
  // 2021-10-12 9:21:39 PM
  componentDidMount() {
    // alert(this.state.endTime.slice(0, -9))

    // var MyDate = new Date(this.state.endTime);
    // var MyDateString;
    // MyDate.setDate(MyDate.getDate() + 20);
    // MyDateString =
    //   ("0" + MyDate.getDate()).slice(-2) +
    //   "-" +
    //   ("0" + (MyDate.getMonth() + 1)).slice(-2) +
    //   "-" +
    //   MyDate.getFullYear();
    // alert(MyDateString);
    // alert(this.tConvert(moment(this.state.endTime).format("LTS")));



// alert(this.state.endTime.slice(0, -9) + " " + moment(this.state.endTime).format("LTS") )

    //  alert(this.state.endTime.slice(0, -9)+" "+moment(this.state.endTime).format('LTS'))
    //  this.setState({endTime: this.tConvert(this.state.endTime.substring(11))},()=>{
    //   alert(this.tConvert(this.state.endTime))
    //  })
    this._isMounted = true;
   
    this.myInterval = setInterval(() => {
      var countDownDate =   new Date(this.state.endTime.slice(0, -9) +   " " + moment(this.state.endTime).format("LTS")).getTime() +60 * 60 * 24 * 1000;
      var now = new Date().getTime();

      var distance = countDownDate - now;
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 *60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      var hDisplay =
        hours > 0 ? (hours < 10 ? "0" + hours + ":" : hours + ":") : "00:";
      var mDisplay =
        minutes > 0
          ? minutes < 10
            ? "0" + minutes + ":"
            : minutes + ":"
          : "00:";
      var sDisplay =
        seconds > 0 ? (seconds < 10 ? "0" + seconds : seconds) : "00";

      this.setState({
        time: `${hDisplay}  ${mDisplay}    ${sDisplay}`,
        timer: false,
      });
     
  this.handleElemenateItem()
      this.setState({
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      });
    
    }, 1000);
       
this.handleElemenateItem()
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.myInterval);
  }
  render() {
    return <h5 className="card-end-time">End Time: {this.state.time} </h5>;
  }
}

export default Timmer;

