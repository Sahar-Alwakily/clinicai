/*
 * @Author: heping
 * @Date: 2020-07-28 19:01:21
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-07-28 19:09:52
 * @Description:
 */

const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

const productionConfig = {
  mode: "production",
  devtool: "source-map",
};

module.exports = merge(commonConfig, productionConfig);
