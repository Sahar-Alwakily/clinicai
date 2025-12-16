/*
 * @Author: heping
 * @Date: 2020-08-01 20:18:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-02 16:14:23
 * @Description:
 */

import { call, put, takeEvery } from "redux-saga/effects";
import { get } from "utils/http";
import {
  SAGA_LOAD_ITEM_PRODUCT_DATA,
  LOAD_ITEM_PRODUCT_DATA,
} from "./actionTyeps";

function* loaditemProductData() {
  let result = yield call(get, {
    url:
      "/api/yuehui/product?ajax=1&lver=6.3.9&district_id=9&sort=0&menu1_id=10006&menu2_id=0&index=1",
  });

  yield put({
    type: LOAD_ITEM_PRODUCT_DATA,
    itemproductlist: result.result.product_info,
  });
}

function* sagas() {
  yield takeEvery(SAGA_LOAD_ITEM_PRODUCT_DATA, loaditemProductData);
}

export default sagas;
