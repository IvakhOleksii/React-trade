import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Carousel,
  Form,
  FormControl,
  Button,
  Image,
  Badge,
} from "react-bootstrap";
import { Eye, Search } from "react-feather";
import ImageViewer360 from "./imageViewer360";
import NoResultFound from "../assets/imgs/png/dashboard/no-results-found1.png";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import Timmer from "./timmer";
import AcceptAndRejectAuction from "./acceptAndRejectAuction";
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: this.props.listData,
      showModal: false,
      // user_type:"",
      // sideBarItem:"",
      // auctionTab:"",
      // currentView: "",
      images: [],
      outDatedAuctionIds:[],
      id:Number
    };
  }
  handlePopup = () => {
    this.setState({ showModal: !this.state.showModal });
  };
  handle360View = (images) => {
    this.setState({ images: images });
    this.handlePopup();
  };
  handleViewDetail = (auctionDetail) =>{ 
    this.props?.hanldeAuctionDetail(auctionDetail) 
    this.props?.history?.push("/auction-detail") 
  }  
  handleEdit = (auctionDetail) =>{  
    this.props.history.push({
      pathname: `/trade-your-car`,
      state: {  auctionDetail }
  }) 
  }

  // handleDashboardSidebar = () => {
  //     switch(this.currentView) 
  //     {
  //       case "Car Owner":   
  //       return user_type;
  //       case "Car Dealer":   
  //       return user_type;
  //       case "auctionEnd":
  //       return sideBarItem;
  //       case "viewAuction":
  //       return sideBarItem;
  //       case "tradecar":  
  //       return auctionEndTabKey;
  //       case "sellcar":  
  //       return auctionEndTabKey;
  //       default:      
  //       return <h1>No Data Found</h1>
  //     }
  //   }
  // componentDidMount=()=>{
  //   this.setState({
  //       user_type: this?.props?.user?.user_type,
  //       sideBarItem: this.props?.showSidebarItem,
  //       auctionTab: this.props?.auctionEndTabKey,
  // })}
    componentDidMount=()=>{
  //  alert("list ")
    // console.log("Data console : "+ JSON.stringify(this.props?.listData))
}
handleOutDatedAuction= (id) =>{
 let temp = this.state.outDatedAuctionIds
 temp.push(id);
  this.setState({ outDatedAuctionIds: temp });  
}

  render() {
    return (
      <div className="list-section">
        {this.state.listData?.filter((filter,index)=>filter.id !== this.state.outDatedAuctionIds[index]).map((item, index) => (
          <Row key={index} className="list-container  ">
            <Col className="list-image-area" lg={4} md={12} sm={12}>
             {this.props?.user?.user_type === "Car Dealer" &&
               this.props?.showSidebarItem === "liveAuction"  ? 
              <Button className="trade-btn"  >
               {item?.type==="trade"?" Trade" :"Sell"} 
                </Button>
               :
               ""
              // <span
              //   className={
              //     item.status === "Hot"
              //       ? "car-badge hot"
              //       : item.status === "Sale"
              //       ? "car-badge sale"
              //       : item.status === "red"
              //       ? "car-badge red"
              //       : ""
              //   }
              // >
              //   {item.status}
              // </span>
              }  
              {item.images360.length > 0 ? (
                <span
                  className={"car-badge-360"}
                  onClick={() => this.handle360View(item.images360)}
                >
                  360°{" "}
                  <Eye className="primary" size={20} data-tour="toggle-icon" />
                </span>
              ) : (
                ""
              )}
              <Carousel fade>
             
                {item.images?.map((subItem, subIndex) => (
                  <Carousel.Item key={subIndex}>
                    <img
                      className="d-block w-100"
                      src={subItem.thumbnail}
                      alt="First slide"
                    /> 
                  </Carousel.Item>
                ))}
              </Carousel>
              
            </Col>
            <Col className="list-text-area" 
              lg={(this.props?.user?.user_type === "Car Owner" &&
                this.props?.showSidebarItem === "auctionEnd" &&
               ( this.props?.auctionEndTabKey === "tradecar" || this.props?.auctionEndTabKey === "sellcar" )) ? "5":"7"}
                md={10} sm={10}>
                  <div className="d-flex draft-items">
                    <div>
                    <h5 className="car-list-title">{item.vin}</h5>
                    </div>
                    {this.props?.user?.user_type === "Car Owner" &&
                    this.props?.showSidebarItem === "viewAuction" &&
                    this.props.user.id===parseInt(item.user_id) &&
                    this.props?.viewAuctionTabKey === "tradecar" ? (
                     <div className="d-flex justify-content-between w-100">
                        <div>
                          {item?.publish_status==="draft"?<Badge bg="warning badge-draft">Draft</Badge>:""}
                          {/* <Badge bg="warning badge-draft">Draft</Badge> */}
                        </div>
                        <div>
                        <span  onClick={( )=>this.handleEdit(item)}   className="d-flex justify-between badge-link pt-2">
                          Edit
                        </span>
                        </div>
                      </div>
                  ) : (
                    ""
                  )}
              </div>
              <div className="car-description">{item.descrption} </div>
              <div className="car-list-wrap">
                <div className="car-list-wrap-left">
                  <div className="right--content">
                    <span className="card-list__title">Year: </span>
                    <span className="card-list__info">{item.year} </span>
                  </div>
                  <div className="right--content">
                    <span className="card-list__title">Zip Code: </span>
                    <span className="card-list__info">{item.zip} </span>
                  </div>
                  <div className="right--content">
                    <span className="card-list__title">Fuel: </span>
                    <span className="card-list__info">{item?.fuel_type} </span>
                  </div>
                  <div className="right--content">
                    <span className="card-list__title">Engine: </span>
                    <span className="card-list__info">{item.engine} </span>
                  </div>
                </div>
                <div className="car-list-wrap-right">
                  <div className="right--content">
                    <span className="card-list__title">City: </span>
                    <span className="card-list__info">{item.city} </span>
                  </div>{" "}
                  <div className="right--content">
                    <span className="card-list__title"> Drivetrain : </span>
                    <span className="card-list__info">{item.drivetrain}</span>
                  </div>{" "}
                  <div className="right--content">
                    <span className="card-list__title"> Exterior Color: </span>
                    <span className="card-list__info">{item.exterior_color} </span>
                  </div>{" "}

                  <div className="right--content">
                    <span className="card-list__title">  Mileage  : </span>
                    <span className="card-list__info">{item?.mileage} </span>
                  </div>{" "}

                  {this.props?.showSidebarItem === "auctionEnd" || this.props?.showSidebarItem === "auction" ?
                   <div className="right--content">
                    <span className="card-list__title"> {item?.approved_status==0?"Wating for approvals":item?.approved_status==1?"Approved by admin":item?.approved_status==2?"Approved admin and owner":item?.approved_status==7?"Rejected":""}   </span> 
                  </div>    :""  } 

                  <div className="right--content">
                    {/* <span className="card-list__title">status_message: </span> */}
                    <span className="card-list__info">
                      {/* {item.status_message}{" "} */}
                      
                    </span>
                  </div>
                </div>{" "}
              </div>
            </Col>

            {(this.props?.user?.user_type === "Car Owner" &&
              this.props?.showSidebarItem === "auctionEnd" &&
              (this.props?.auctionEndTabKey === "tradecar"  || this.props?.auctionEndTabKey === "sellcar")) ? (
              <Col lg={2} md={12} sm={10} className="winner-card ">
                <div className="   ">
                  <img src={item?.winner?.image}/>
                  <div className="  space-between winner"> 
                  <span className="card-list__title">  Winner &nbsp; </span>
                    <span className="card-list__info"> {item?.winner?.name}    </span>
                  </div>
                  <div className="  space-between bid-amount">
                    <span className="card-list__title"> Bid Amount &nbsp; </span>
                    <span className="card-list__info">   {item?.winner?.bid_amount}  </span>
                  </div> 
                </div>
                {/* <div className=" w-100 ">
                  <h5 className="card-start-time w-100 "> 
                    Accpet 
                  </h5> 
                </div> */}

          <AcceptAndRejectAuction data={item} />
       
                  </Col>
                ) : (
                  ""
            )}

            {/* {this.props?.user?.user_type === "Car Owner" &&
            this.props?.showSidebarItem === "viewAuction" &&
            this.props?.viewAuctionTabKey === "tradecar" ? (
              // <Col lg={1} md={1} sm={1} className="mt-2">
              //   <Link className="link">Edit</Link>
              // </Col>
            ) : (
              ""
            )} */}
 



            {/* Live Auction condition */}

            <Col lg={4} 
              md={this.props?.user?.user_type === "Car Dealer" &&
               this.props?.showSidebarItem === "liveAuction"  ? "4": "12"} 
               sm={this.props?.user?.user_type === "Car Dealer" &&
               this.props?.showSidebarItem === "liveAuction"  ? "4":"10"} 
               className={this.props?.user?.user_type === "Car Dealer" &&
               this.props?.showSidebarItem === "liveAuction"  ? "d-flex justify-content-center mt-1 mb-1" : "mt-2" }>
                    
               {this.props?.user?.user_type === "Car Dealer" &&
               this.props?.showSidebarItem === "liveAuction"  ? 
                <Button  onClick={( )=>this.handleViewDetail(item)}
                  className="btn-bid"
                  >
                 VIEW DETAILS & BID
                </Button>
              :
              item.price?<h5 className="card__price-number  ">{item.price}</h5>:""
               }
            </Col>
            {this.props?.user?.user_type === "Car Owner" &&
              this.props?.showSidebarItem === "viewAuction" &&
              (this.props?.viewAuctionTabKey === "tradecar" ||
               this.props?.viewAuctionTabKey === "sellcar") ? (
              <Col lg={8} md={12} sm={10} className="mt-2">
                <div className="d-flex"> 
                  <h5 className="card-start-time"> 
                    Start Time: {item.created_at}
                  </h5>
                  <h5 className="card-end-time"> 
                    End Time: {item?.expiry_at}
                  </h5>
             
                </div>
              </Col>
            ) : (
              ""
            )} 
             {this.props?.user?.user_type === "Car Dealer" &&
               this.props?.showSidebarItem === "liveAuction"  ? 
               <Col lg={7} 
               md={this.props?.user?.user_type === "Car Dealer" &&
               this.props?.showSidebarItem === "liveAuction"  ? "8": "12"} 
               sm={this.props?.user?.user_type === "Car Dealer" &&
               this.props?.showSidebarItem === "liveAuction"  ? "8":"10"} className="mt-2">
                <div className="d-flex justify-content-end card-end-live-auction">
                 
                  <Timmer handleOutDatedAuction={this.handleOutDatedAuction} endTime={item }/> 
                </div>
              </Col>
             : 
              ""
            }
          </Row>
        ))}

        {!this.state?.listData?.length>0 ? (
          <React.Fragment>
            <Row>
              <Col
                lg={12}
                className="d-flex-justify-content-center align-items-center flex-column text-center"
              >
                {/* <h3>No data to show</h3>  */}
                <Image
                  className="mt-4"
                  src={NoResultFound}
                  alt="no-result"
                  rounded
                />
              </Col>
            </Row>
          </React.Fragment>
        ) : (
          ""
        )}

        <Modal
          isOpen={this.state.showModal}
          size={"lg"}
          toggle={this.handlePopup}
          className={"dark "}
        >
          <ModalHeader toggle={this.handlePopup}>
            TraderSell 360° view
          </ModalHeader>
          <ImageViewer360 images={this.state.images} />
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.app.user,
    showSidebarItem: state.app.showSidebarItem,
    viewAuctionTabKey: state.app.viewAuctionTabKey,
    auctionEndTabKey: state.app.auctionEndTabKey,
  };
};
const mapDispatchToProps = (dispatch) => {
  return { 
    hanldeAuctionDetail:(value)=> dispatch({type:"AUCTION_DETAIL",value:value})
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(List);
