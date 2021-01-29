const path = require("path");

module.exports = {
  entry: './src/index.js',
  output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'public'),
      publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  mode: 'development' || process.env.NODE_ENV, 
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000',
      }
    }
  }
};