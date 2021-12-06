import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
  // import ThreeSixty from "react-360-view"; 
import { Pannellum } from "pannellum-react";
class ImageViewer360 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: null,
      yaw:Number,
      pitch:Number, 
      displayImage:""

    };
  }
  componentDidMount() {
  this.setState({displayImage:this.props?.images[0]?.image})
  console.log("this is 360 ", JSON.stringify(this.props?.images))
  }
  // componentWillUnmount() {
  //     window.addEventListener('resize', () => {
  //         this.setState({
  //             isMobile: window.innerWidth < 768
  //         });
  //     }, false);

  // }
  panImage  = React.createRef() ; 
  render() { 
    return (
      <Container style={{padding:"0px 0px 25px 0px"}}   fluid>
        {/* <Row className=" default-margin  ">  
          <Col lg={12} md={12} sm={12}>
            <div class="v360-header text-light bg-dark">
              <span class="v360-header-title">TraderSell 360 View</span>
              <span class="v360-header-description"></span>
            </div>
            <ThreeSixty
              amount={36}
              imagePath="https://firebasestorage.googleapis.com/v0/b/ebigwin-40cb3.appspot.com/o/boston_panorama_516937.jpg?alt=media&token=762b7def-3334-4d74-998e-1edc66fa85a5"
              fileName="iris-{index}.jpeg"
              spinReverse
              autoplay
              buttonClass="dark"
            />
          </Col> 
        </Row> */}

        {/* 2nd package  */}

        <Row className=" default-margin  ">
          <Col  lg={12} md={12} sm={12}  style={{backgroundColor:"white"}}>
            {/* <div class="v360-header text-light bg-dark">
              <span class="v360-header-title">TraderSell 360 View</span>
              <span class="v360-header-description"></span>
            </div>  */}
            <Pannellum
              width="100%"
              height="450px"
              image={this.state.displayImage}
              pitch={10}
              yaw={180}
              hfov={110}
              autoLoad
              showZoomCtrl={true} 
              className="pannellum"
            >
              <Pannellum.Hotspot
                type="custom"
                pitch={12.41}
                yaw={117.76}
                handleClick={(evt, name) => console.log(name)}
                name="image info"
              />
            </Pannellum>
            <div className="d-flex justify-content-center images-360">
               { this.props.images?.map((item,index)=>
                 <img key={index} src={item.image} onClick={()=>{this.setState({displayImage:item.image})}} style={{width:"100px", height:"80px"}} alt={`image1${index}`}/> 
                )} 
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    vouched: state.app.vouched,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(ImageViewer360);
 