/*
 * @Author: heping
 * @Date: 2020-08-01 20:18:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-03 20:43:40
 * @Description:
 */

import {
  SAGA_LOAD_PRODUCT_DATA,
  SAGA_LOAD_FEEDLIST_DATA,
  CHANGE_CLASS_NAME,
} from "./actionTyeps";

const loadProductData = () => {
  return {
    type: SAGA_LOAD_PRODUCT_DATA,
  };
};

const loadFeedListData = () => {
  return {
    type: SAGA_LOAD_FEEDLIST_DATA,
  };
};

const changeclass = (name) => {
  return {
    type: CHANGE_CLASS_NAME,
    name,
  };
};

export { loadProductData, loadFeedListData, changeclass };
