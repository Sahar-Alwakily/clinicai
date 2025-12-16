/*
 * @Author: heping
 * @Date: 2020-07-28 20:57:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-01 20:22:28
 * @Description:
 */
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import reducer from "./reducer";
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagas.forEach((value) => {
  sagaMiddleware.run(value);
});

export default store;
