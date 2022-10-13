const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

const config = {
  entry: {
    index: './src/pages/index.tsx'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        exclude: /\.module.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.module.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]-[hash:5]'
              }
            }
          }
        ]
      }
    ]
  }
}

module.exports = [
  {
    ...config,
    output: {
      path: path.resolve('./dist/assets'),
      filename: 'scripts/[name].js',
      publicPath: '/'
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'styles/[name].css'
      }),
      new NodePolyfillPlugin()
    ]
  },
  {
    ...config,
    entry: {
      index: './src/index.ts'
    },
    output: {
      path: path.resolve('./dist/assets'),
      filename: '../[name].js',
      publicPath: '/'
    },
    target: 'node',
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles/[name].css'
      })
    ]
  }
]
