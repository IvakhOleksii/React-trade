import { store } from "../../redux/storeConfig/store";

const APIConfig = (methodType, endpoint, data) => {
  const token = store.getState().app.token;

  var config = {
    method: methodType,
    url: `${process.env.React_App_BASE_URL}${endpoint}`,
    headers: {
      "APP-KEY": `${process.env.React_App_ACCESS_TOKEN}`,
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  return config;
};

export default APIConfig;
