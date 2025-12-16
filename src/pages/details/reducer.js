
import { LOAD_PRODUCT_DETAILS_DATA } from "./actionTyeps";

let defaultState = {
  productdetails: {},
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOAD_PRODUCT_DETAILS_DATA:
      return {
        ...Object.assign(state, {
          productdetails: { ...action.productdetails },
        }),
      };
    default:
      return state;
  }
};

export default reducer;
