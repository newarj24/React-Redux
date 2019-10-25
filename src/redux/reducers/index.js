import { combineReducers } from "redux";
import courses from "./courseReducers";
import authors from "./authorReducers";
import apiCallsInProgess from "./apiStatusReducers";

const rootReducers = combineReducers({
  courses,
  authors,
  apiCallsInProgess
});

export default rootReducers;
