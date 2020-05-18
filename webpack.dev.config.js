const path = require("path");
const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge = require("webpack-merge");
// 更具mode来获取当前的环境，通过process.env.NODE_ENV
const devMode = process.env.NODE_ENV !== "production";

module.exports = merge(common, {
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: devMode ? "man.js" : "main.[chunkhash].js",
    // 打包之后，静态资源文件的公共查找路径
    publicPath: devMode ? "" : "./",
  },
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src/index.html"),
      // 可要可不要，通过devserver不需要这个
      //   hash: true,
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
  },
});
