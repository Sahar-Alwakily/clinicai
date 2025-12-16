/*
 * @Author: heping
 * @Date: 2020-08-01 20:18:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-02 16:16:59
 * @Description:
 */
import { LOAD_ITEM_PRODUCT_DATA } from "./actionTyeps";

let defaultState = {
  itemproductlist: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOAD_ITEM_PRODUCT_DATA:
      return {
        ...Object.assign(state, {
          itemproductlist: [...action.itemproductlist],
        }),
      };
    default:
      return state;
  }
};

export default reducer;
