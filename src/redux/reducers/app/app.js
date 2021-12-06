import { combineReducers } from "redux";
import { app } from "./appReducer";

const authReducers = combineReducers({
    app
});

export default authReducers;
