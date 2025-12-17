/*
 * @Author: heping
 * @Date: 2020-07-28 19:27:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-01 21:21:06
 * @Description:
 */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import store from "./store/";
import { Provider } from "react-redux";

import App from "./App";

import "assets/styles/reset";

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.querySelector("#root")
);
