import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import securityReducer from "./securityReducer";
import taskReducer from "./taskReducer";

/*
The resulting reducer calls every child reducer,
and gathers their results into a single state object.
The state produced by combineReducers() namespaces the states of each reducer
under their keys as passed to combineReducers()
*/
export default combineReducers({
  errors: errorReducer,
  security: securityReducer,
  taskInfo: taskReducer
});
