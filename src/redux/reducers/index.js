import { combineReducers } from "redux";
import courses from "./courseReducers";

const rootReducers = combineReducers({
  courses
});

export default rootReducers;
