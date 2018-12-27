import { combineReducers } from "redux";
import SigninReducer from "./reducerSignin";
import UserReducer from "./reducerUser";

const rootReducer = combineReducers({
  loggedUser: SigninReducer,
  users: UserReducer
});

export default rootReducer;
