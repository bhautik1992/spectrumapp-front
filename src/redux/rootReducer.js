import { combineReducers } from "redux";
import layout from "./layout";
import navbar from "./navbar";
import LoginReducer from "../services/reducers/LoginReducer";
import { LOGOUT_REQUEST } from "../services/constants";

const appReducer = combineReducers({
    navbar,
    layout,
    LoginReducer,
});

const rootReducer = (state, action) => {
    if(action.type === LOGOUT_REQUEST){
        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;


