const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isDev = process.env.NODE_ENV == 'development';

const extractSass = new ExtractTextPlugin({
  filename: '../css/[name].styles.css',
});

module.exports = {
  devtool: 'cheap-inline-source-map',
  context: path.resolve(__dirname, 'src/js'),
  entry: {
    learning: './learning.js',
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public/js'),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/js')
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015']
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, 'src/sass')
        ],
        use: extractSass.extract({
          use: [
            'css-loader',
            'sass-loader'
          ],
          fallback: 'style-loader'
        })
      }
    ]
  },

  plugins: [
    extractSass
  ]
}