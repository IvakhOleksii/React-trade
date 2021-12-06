import { combineReducers } from "redux";
import app from "./app/appReducer";

const rootReducer = combineReducers({
  app: app,
});

export default rootReducer;
