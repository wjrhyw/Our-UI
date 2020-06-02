const path = require("path");
const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const merge = require("webpack-merge");
const devMode = process.env.NODE_ENV !== "production";

module.exports = merge(common, {
  entry: path.resolve(__dirname, "src/index.less"),
  output: {
    // 这里的path控制了全部静态资源文件的打包存放位置，不只是js文件；
    // 因为就算分离了不是js类型的文件，但是打包的入口还是js文件
    path: path.resolve(__dirname, "dist"),
    // 这里是针对入口js文件设置的打包之后的名字
    // 其他类型的文件会通过loader或者插件来设置打包之后的名字
    // 在指定filename或者name（一般在loader中配置）的时候，是可以加上其他路径的，
    // webpack在打包的时候会自动的完成前面路径的所对应文件夹的创建
    filename: devMode ? "js/main.js" : "main.[chunkhash].js",
    // 指定了在打包生成的文件中所有静态资源文件引用路径的前缀；
    // 并且这的设置会影响到devserver
    // 并且这里的publicPath配置是相对于打包之后的index.html来设置的
    // 比如如果打包之后js文件在js文件夹中，index.html文件在html文件夹中,那么久就需要配置为../
    // publicPath应该以'/'结尾，同时其他loader或插件的配置不要以'/'开头
    // 默认情况下loader和插件的publicpath配置会从这获取
    publicPath: devMode ? "" : "./",
    // 总结一个公式：打包之后引用的静态资源文件的路径=output.publicpath+filename/name
  },
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src/index.html"),
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? "css/[name].css" : "css/[name].[contenthash].css",
      chunkFilename: devMode ? "css/[id].css" : "css/[id].[contenthash].css",
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    port: 9000,
    open: true,
    hot: true,
    contentBase: "dist",
  },
});
