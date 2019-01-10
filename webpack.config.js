const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  context: __dirname + "/src",
  entry: {
    app: __dirname + "/src/js/index",
    admin: __dirname + "/src/js/admin"
  },
  output: {
    path: __dirname + "/dist",
    // filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],  
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new CopyWebpackPlugin([
      { from: __dirname + '/index.html', to: __dirname + '/dist' },
      { from: __dirname + '/admin.html', to: __dirname + '/dist' },
      { from: __dirname + '/src/css', to: __dirname + '/dist/css' },

      // LG web app specifics
      { from: __dirname + '/icon.png', to: __dirname + '/dist' },
      { from: __dirname + '/largeIcon.png', to: __dirname + '/dist' },
      { from: __dirname + '/appinfo.json', to: __dirname + '/dist' },
    ])
  ]
}