

import { call, put, takeEvery } from "redux-saga/effects";
import { post } from "utils/http";
import {
  SAGALOAD_PRODUCT_DETAILS_DATA,
  LOAD_PRODUCT_DETAILS_DATA,
} from "./actionTyeps";

function* loadProductdDetailsData(id) {
  let result = yield call(post, {
    url: "/api/post/getRePost",
    data: {
      uid: 0,
      post_id: 27919643,
      limit: 20,
      index: 0,
    },
  });

  yield put({
    type: LOAD_PRODUCT_DETAILS_DATA,
    productdetails: result.responseData,
  });
}

function* sagas() {
  yield takeEvery(SAGALOAD_PRODUCT_DETAILS_DATA, loadProductdDetailsData);
}

export default sagas;
