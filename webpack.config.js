const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  target: ["web", "es5"],

  entry: {
    main: "./src/index.js",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "",
  },

  mode: "development", // добавили режим разработчика

  devServer: {
    contentBase: path.resolve(__dirname, "./dist"), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
    open: true, // сайт будет открываться сам при запуске npm run dev
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin(),
  ],

  module: {
    rules: [
      // добавим объект правил для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: "babel-loader",
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: "/node_modules/",
      },
      {
        test: /\.(svg|png|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },
      {
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 }, // при использовании @import в css-файлах
          },
          "postcss-loader",
        ],
      },
    ],
  },
  target: "web", // активирует hot-reload в режиме разработки
};
