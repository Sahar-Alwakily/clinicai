/*
 * @Author: heping
 * @Date: 2020-08-01 20:18:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-03 20:54:05
 * @Description:
 */
import {
  LOAD_PRODUCT_DATA,
  LOAD_FEEDLIST_DATA,
  CHANGE_CLASS_NAME,
} from "./actionTyeps";

let defaultState = {
  productlist: [],
  feedlist: {},
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOAD_PRODUCT_DATA:
      return {
        ...Object.assign(state, {
          productlist: [...action.productlist],
        }),
      };

    case LOAD_FEEDLIST_DATA:
      return {
        ...Object.assign(state, {
          feedlist: action.feedlist,
        }),
      };

    case CHANGE_CLASS_NAME:
      let product = state.productlist.find((value) => {
        return value.name === action.name;
      });
      let arr = state.productlist.map((item) => {
        if (item.name === product.name) {
          item.selected = true;
        } else {
          item.selected = false;
        }
      });

      return {
        ...Object.assign(state, {
          feedlist: [...arr],
        }),
      };
    default:
      return state;
  }
};

export default reducer;
