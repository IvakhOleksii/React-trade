const HandleAPIData = (data) => {
  var tempData = [];
  // .filter((fitler) => fitler.status === this.props?.sortFilter||"").
  data?.forEach((element) => {
    var temp360 = [];
    var tempImages = [];
    element?.get_images?.forEach((imageObj) => {
      if (imageObj?.is_primary === 0) {
        imageObj[
          "image"
        ] = `${process.env.React_App_BASE_URL_IMAGE}${imageObj?.url}`;
        // delete  imageObj?.url
        temp360.push(imageObj);
      } else {
        imageObj[
          "original"
        ] = `${process.env.React_App_BASE_URL_IMAGE}${imageObj?.url}`;
        imageObj[
          "thumbnail"
        ] = `${process.env.React_App_BASE_URL_IMAGE}${imageObj?.url}`;
        // delete  imageObj?.url
        tempImages.push(imageObj);
      }
    });
    delete element?.get_images;

    const { name, dealername, email, phone, dp } =
      element.top_auction_bid?.dealer ?? element.auction_bids?.[0]?.owner ?? {};
    element["winner"] = {
      name: dealername || name,
      image: dp,
      email,
      phone,
    };
    element["images360"] = temp360;
    element["images"] = tempImages;
    element["zip_code"] = element?.zip;

    tempData.push(element);
  });
  return tempData;
};

export const ConvertObjectIntoArray = (data) => {
  var tempData = [];
  for (var key in data) {
    tempData.push(data[key]);
  }
  return tempData;
};

export default HandleAPIData;
