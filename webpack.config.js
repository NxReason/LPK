const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: '../css/[name].styles.css',
});
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  devtool: isDev ? 'inline-source-map' : 'cheap-source-map',
  context: path.resolve(__dirname, 'src/js'),
  entry: {
    learning: './learning/index.js',
    login: './login/index.js',
    cad: './cad/index.js',
    galery: './cad/galery.js',
    usersList: './admin/usersList.js',
    userForm: './admin/userForm.js',
    models: './admin/models.js',
    common: './common/index.js',
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
          path.resolve(__dirname, 'src/js'),
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015'],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, 'src/sass'),
        ],
        use: extractSass.extract({
          use: [
            'css-loader',
            'sass-loader',
          ],
          fallback: 'style-loader',
        }),
      },
      {
        test: /.(jpe?g|gif|png|svg)$/i,
        include: [
          path.resolve(__dirname, 'src/img'),
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '../img/[name].[ext]',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    extractSass,
  ],
};
