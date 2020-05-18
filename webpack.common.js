// 公共webpack配置
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 根基当前环境来选择不同的配置项
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  module: {
    rules: [
      // less转换配置
      {
        test: /\.less/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      // jsx，es新特性支持
      {
        test: /(\.jsx|\.js)/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      // 项目静态资源文件的loader配值
      {
        test: /(\.jpg|\.png|\.gif)/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              outputPath:'img',
              publicPath:'./img'
            },
          },
        ],
      },
    ],
  },
};
