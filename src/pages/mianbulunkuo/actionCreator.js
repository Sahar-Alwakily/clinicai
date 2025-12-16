/*
 * @Author: heping
 * @Date: 2020-08-01 20:18:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-02 15:46:21
 * @Description:
 */

import {
  SAGA_LOAD_ITEM_PRODUCT_DATA,
  LOAD_ITEM_PRODUCT_DATA,
} from "./actionTyeps";

const loaditemProductData = () => {
  return {
    type: SAGA_LOAD_ITEM_PRODUCT_DATA,
  };
};

export { loaditemProductData };
