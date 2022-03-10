 
 const HandleAPIData=(data) => {
    var tempData = [];
    // .filter((fitler) => fitler.status === this.props?.sortFilter||"").
    data?.forEach((element) => {
      var temp360 = [];
      var tempImages = [];
      element?.get_images?.forEach((imageObj) => {
        if (imageObj?.is_primary === 0) {
          imageObj[
            "image"
          ] = `${process.env.React_App_BASE_URL_IMAGE}/storage/images${imageObj?.url}`;
          // delete  imageObj?.url
          temp360.push(imageObj);
        } else {
          imageObj[
            "original"
          ] = `${process.env.React_App_BASE_URL_IMAGE}/storage/images${imageObj?.url}`;
          imageObj[
            "thumbnail"
          ] = `${process.env.React_App_BASE_URL_IMAGE}/storage/images${imageObj?.url}`;
          // delete  imageObj?.url
          tempImages.push(imageObj);
        }
      });
      delete element?.get_images;
      element["winner"] ={
                name:"MACKENZI",
                image:"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                bid_amount:"$454.00"
              }
      element["images360"] = temp360;
      element["images"] = tempImages;
      element["zip_code"] = element?.zip;

      tempData.push(element);
    }); 
    return tempData; 
}

export const ConvertObjectIntoArray=(data) => {
  var tempData = [];
  for (var key in data) {
    tempData.push(data[key]);
  }
  return tempData; 
}


export default HandleAPIData