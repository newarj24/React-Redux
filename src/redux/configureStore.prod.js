import { createStore, applyMiddleware } from "redux";
import rootReducers from "./reducers";
import thunk from "redux-thunk";

export default function configureStor(initialState) {
  return createStore(rootReducers, initialState, applyMiddleware(thunk));
}
