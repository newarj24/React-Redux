import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";

import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux/configureStore";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const store = configureStore();

render(
  <ReduxProvider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReduxProvider>,
  document.getElementById("app")
);
