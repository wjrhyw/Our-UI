const path = require("path");
const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge = require("webpack-merge");
const devMode = process.env.NODE_ENV !== "production";

module.exports = merge(common, {
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: devMode ? "main.js" : "main.[chunkhash].js",
    publicPath: devMode ? " " : "./",
  },
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src/index.html"),
      hash: !devMode,
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? "css/[name].css" : "css/[name].[contenthash].css",
      chunkFilename: devMode ? "css/[id].css" : "css/[id].[contenthash].css",
    }),
  ],
  devServer: {
    port: 9000,
    open: true,
    hot: true,
    contentBase: './src' //默认在根目录下寻找index，重定向在src下
  },
});
