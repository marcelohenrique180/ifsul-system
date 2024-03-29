const webpack = require('webpack')
const { join } = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: {
    bundle: './src/client/js/index.js'
  },
  output: {
    path: join(__dirname, 'src/main/resources/static/'),
    filename: 'js/bundle.min.js',
    publicPath: 'src/main/resources/static/',
    sourceMapFilename: 'js/bundle.min.js.map',
    pathinfo: true
  },
  devServer: {
    contentBase: [
      join(__dirname, '/src/main/resources/templates'),
      join(__dirname, 'src/main/resources/static')
    ],
    compress: true,
    port: 9000
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000&name=css/fonts/[hash].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      allChunks: true,
      disable: false
    })
  ]
}
