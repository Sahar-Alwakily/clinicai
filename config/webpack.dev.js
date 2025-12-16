/*
 * @Author: heping
 * @Date: 2020-07-28 19:01:21
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-07-30 20:33:00
 * @Description:
 */

const path = require("path");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

const developmentConfig = {
  mode: "development",
  devtool: "source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "../dist"),
    compress: true,
    historyApiFallback: true,
    port: 9000,
    proxy: {
      "/api": {
        target: "https://m.soyoung.com",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
    // Serve PWA files
    before: (app, server) => {
      const fs = require("fs");
      const path = require("path");
      
      // Serve manifest.json
      app.get("/manifest.json", (req, res) => {
        const manifestPath = path.resolve(__dirname, "../public/manifest.json");
        if (fs.existsSync(manifestPath)) {
          res.sendFile(manifestPath);
        } else {
          res.status(404).send("Not found");
        }
      });
      
      // Serve service-worker.js
      app.get("/service-worker.js", (req, res) => {
        const swPath = path.resolve(__dirname, "../src/service-worker.js");
        if (fs.existsSync(swPath)) {
          res.setHeader("Content-Type", "application/javascript");
          res.sendFile(swPath);
        } else {
          res.status(404).send("Not found");
        }
      });
      
      // Serve icon.svg
      app.get("/icon.svg", (req, res) => {
        const iconPath = path.resolve(__dirname, "../public/icon.svg");
        if (fs.existsSync(iconPath)) {
          res.setHeader("Content-Type", "image/svg+xml");
          res.sendFile(iconPath);
        } else {
          res.status(404).send("Not found");
        }
      });
    },
  },
};

module.exports = merge(commonConfig, developmentConfig);
