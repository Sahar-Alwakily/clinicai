/*
 * @Author: heping
 * @Date: 2020-08-01 20:18:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-03 20:31:52
 * @Description:
 */

import { call, put, takeEvery } from "redux-saga/effects";
import { get } from "utils/http";
import {
  LOAD_PRODUCT_DATA,
  SAGA_LOAD_PRODUCT_DATA,
  SAGA_LOAD_FEEDLIST_DATA,
  LOAD_FEEDLIST_DATA,
} from "./actionTyeps";

function* loadProductData() {
  let result = yield call(get, { url: "/api/itemcity/product?lver=7.8.0" });
  yield put({
    type: LOAD_PRODUCT_DATA,
    productlist: result.responseData.menu1_info,
  });
}

function* loadFeedListData() {
  let result = yield call(get, {
    url:
      "/api/site/index-ajax-feed?page=1&menu_id=0&menu_name=%E6%8E%A8%E8%8D%90&part=2&cityId=9&newFeed=1",
  });
  yield put({
    type: LOAD_FEEDLIST_DATA,
    feedlist: result,
  });
}

function* sagas() {
  yield takeEvery(SAGA_LOAD_PRODUCT_DATA, loadProductData);
  yield takeEvery(SAGA_LOAD_FEEDLIST_DATA, loadFeedListData);
}

export default sagas;
