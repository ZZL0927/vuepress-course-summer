const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
module.exports = {
  // 模式
  mode: "development",
  // 输入
  entry: {
    index: "./src/index.ts",
    open: "./src/open.ts",
  },
  // 输出
  output: {
    // 输出的文件名格式，这里采用名字+内容hash片段的方式，用于清理缓存
    filename: "scripts/[name].[contenthash:5].js",
    // 输出路径
    path: path.resolve(__dirname, "../dist")
  },
  resolve: {
    // 支持的脚本后缀，可以让我们导入时省略
    extensions: [".ts", ".js"]
  },
  // 开启sourcemap
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /.ts$/,
        use: [
          "ts-loader"
        ]
      },
      {
        test: /\.html$/,
        use: [ {
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }],
      }
    ]
  },
  plugins: [
    // 清理插件，可以在每次编译之前清空dist目录
    new CleanWebpackPlugin(),
    // 可以将引入的样式合并输出到css文件
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash:5].css"
    }),
    // 根据模板生成html文件
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/pages/index.html",
      chunks: ["index"]
    }),
    new HtmlWebpackPlugin({
      filename: "open.html",
      template: "./src/pages/open.html",
      chunks: ["open"]
    })
  ],
  devServer: {
    hot: true,
    port: 8080
  }
}