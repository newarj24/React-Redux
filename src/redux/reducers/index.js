import { combineReducers } from "redux";
import courses from "./courseReducers";
import authors from "./authorReducers";

const rootReducers = combineReducers({
  courses,
  authors
});

export default rootReducers;
