/*
 * @Author: heping
 * @Date: 2020-07-29 08:46:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-03 22:43:04
 * @Description:
 */
import { combineReducers } from "redux";

import { reducer as home } from "pages/home/";
import { reducer as mianbulunkuo } from "pages/mianbulunkuo/";
import { reducer as details } from "pages/details/";

export default combineReducers({
  home,
  mianbulunkuo,
  details,
});
