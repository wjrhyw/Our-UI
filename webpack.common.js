// 公共webpack配置
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  // sourcemap配置：映射模式匹配，eval，source-map，module，inline，cheap，五中类型的互相组合，
  // cheap-module-eval-source-map：react开发环境使用
  // module，配置之后可以在源码中以原始的语法定位错误信息（否则会出现被编译过一边的源码）
  // inline，将map文件已base64的格式来映射，打包到出口文件中，使得打包之后的文件体积更大
  // eval，通过//#sourceURL以地址形式关联源文件，所以打包速度最快
  // cheap，不关联源码中的列信息，
  // source-map，每一个出口文件都都会对应一个map文件，打包速度更慢
  devtool: devMode && "cheap-module-source-map",
  module: {
    rules: [
      // less转换配置
      {
        test: /\.less/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /(\.jsx|\.js)/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /(\.jpg|\.png|\.gif)/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024 * 5,
              outputPath: "img",
              name:'[name].[ext]'
            },
          },
        ],
      },
    ],
  },
};
