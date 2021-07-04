const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const path = require('path')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const config = require('../src/client/config')

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'dist'),
    port: 3700
  },
  module: {
    rules: [
      {
        test: /\.(c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ]
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new OpenBrowserPlugin({ url: 'http://localhost:3700/h5Build/index' }),
    new webpack.DefinePlugin({
      REQUEST_URL: JSON.stringify(config.dev.host),
      WS_URL: JSON.stringify(config.dev.wsHost)
    })
  ]
})
