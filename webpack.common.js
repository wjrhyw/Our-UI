// 公共webpack配置
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const devMode = process.env.NODE_ENV !== "production"

module.exports = {
  module: {
    rules: [
      // less转换配置
      {
        test: /\.less/,
        use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: (resourcePath, context) => {
                  // 根据css目录动态判定层级
                  //  ./css/admin/main.css the publicPath will be ../../
                  //  ./css/main.css the publicPath will be ../
                  return path.relative(path.dirname(resourcePath), context) + '/';
                },
                hmr:devMode,
                esModule: true, //CommentJs支持的ES模式
              },
            },
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
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
              outputPath: "img",
              publicPath: "./img",
            },
          },
        ],
      },
    ],
  },
};
