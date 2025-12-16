/*
 * @Author: heping
 * @Date: 2020-07-29 19:10:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-03 22:31:15
 * @Description:
 */

import axios from "axios";
import qs from "qs";
const get = ({ url }) => {
  return axios({
    url,
  }).then((result) => {
    return result.data;
  });
};

const post = ({ url, data }) => {
  data = qs.stringify(data);
  return axios({
    url,
    method: "POST",
    data,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  }).then((result) => {
    return result.data;
  });
};

export { get, post };
