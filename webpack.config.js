const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
  entry: { main: './src/index.js' },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    compress: true,
    port: 8080,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name].[hash][ext]'
                }
            
          },
     {
  test: /\.js$/, // Обрабатываем все JS файлы
  exclude: /node_modules/, // исключая node_modules
  use: {
    loader: 'babel-loader',
  },
}
    ],
  },

  resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'images'),
            'node_modules'
        ]
    },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};