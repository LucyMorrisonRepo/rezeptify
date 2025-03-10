const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: ["babel-polyfill", "./src/js/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/bundle.js",
    publicPath: "/"
  },
  devServer: {
    contentBase: "./dist",
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html"
    }),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: "img/**/*",
          to: path.resolve(__dirname, "dist"),
          context: path.resolve(__dirname, "src")
        },
        { 
          from: "css/style.css",
          to: path.resolve(__dirname, "dist/css"),
          context: path.resolve(__dirname, "src")
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "img/",
              publicPath: "img/"
            }
          }
        ]
      }
    ]
  }
};