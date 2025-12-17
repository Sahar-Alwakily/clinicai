const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const fs = require("fs");

module.exports = {
  entry: {
    "js/app": path.resolve(__dirname, "../src/index.js"),
  },

  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
    filename: "[name]-[chunkHash:6].js",
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    chrome: "58",
                    ie: "11",
                  },
                  useBuiltIns: "usage",
                  corejs: 3,
                },
              ],
              "@babel/preset-react",
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { legacy: true }],
              ["@babel/plugin-proposal-class-properties", { loose: true }],
              ["import", { libraryName: "antd-mobile", style: "css" }],
            ],
          },
        },
      },
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === "development",
              publicPath: "/",
            },
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [require("postcss-preset-env")()],
            },
          },
          {
            loader: "less-loader",
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 800,
            name: "[name]-[hash:6].[ext]",
            outputPath: "images/",
          },
        },
      },
      {
        test: /\.(woff|ttf)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 8000,
            name: "[name]-[hash:6].[ext]",
            outputPath: "iconfont/",
          },
        },
      },
      {
        test: /\.(glb|gltf)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "assets/models/",
          },
        },
      },
    ],
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src/components"),
      pages: path.resolve(__dirname, "../src/pages"),
      assets: path.resolve(__dirname, "../src/assets"),
      utils: path.resolve(__dirname, "../src/utils"),
    },

    extensions: [".js", ".jsx", ".css"],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "ClinicAI - عيادة التجميل",
      template: path.resolve(__dirname, "../public/index.ejs"),
      filename: "index.html",
    }),

    new MiniCssExtractPlugin({
      filename: "[name]-[hash:6].css",
      chunkFilename: "[id]-[hash:6].css",
      ignoreOrder: true,
    }),

    new CleanWebpackPlugin(),

    // Copy PWA files
    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap("CopyPWAFiles", (compilation) => {
          const distPath = path.resolve(__dirname, "../dist");
          
          // Copy manifest.json
          const manifestSrc = path.resolve(__dirname, "../public/manifest.json");
          const manifestDest = path.resolve(distPath, "manifest.json");
          if (fs.existsSync(manifestSrc)) {
            fs.copyFileSync(manifestSrc, manifestDest);
          }
          
          // Copy service-worker.js
          const swSrc = path.resolve(__dirname, "../src/service-worker.js");
          const swDest = path.resolve(distPath, "service-worker.js");
          if (fs.existsSync(swSrc)) {
            fs.copyFileSync(swSrc, swDest);
          }
          
          // Copy icon.svg
          const iconSrc = path.resolve(__dirname, "../public/icon.svg");
          const iconDest = path.resolve(distPath, "icon.svg");
          if (fs.existsSync(iconSrc)) {
            fs.copyFileSync(iconSrc, iconDest);
          }
          
          // Copy 3D model
          const modelDir = path.resolve(distPath, "assets/models");
          if (!fs.existsSync(modelDir)) {
            fs.mkdirSync(modelDir, { recursive: true });
          }
          const modelSrc = path.resolve(__dirname, "../src/assets/models/model.glb");
          const modelDest = path.resolve(modelDir, "model.glb");
          if (fs.existsSync(modelSrc)) {
            fs.copyFileSync(modelSrc, modelDest);
          }
        });
      },
    },
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
