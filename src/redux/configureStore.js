import { createStore, applyMiddleware, compose } from "redux";
import rootReducers from "./reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

export default function configureStor(initialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // Support for redux dev tools

  return createStore(
    rootReducers,
    initialState,
    composeEnhancers(applyMiddleware(reduxImmutableStateInvariant()))
  );
}
