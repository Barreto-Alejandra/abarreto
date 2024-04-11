const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  entry: ["./src/js/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    // publicPath: "/wp-content/themes/frontend/dist/",
    filename: "bundle.js",
    filename: "bundle.js",
    chunkFilename: "[id][hash].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules\/(?!(swiper|dom7)\/).*/, /\.test\.jsx?$/],
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"]],
            plugins: ["syntax-dynamic-import"],
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // Otras configuraciones de optimización de imagen
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "./fonts/[name][ext]",
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "bundle.css",
      chunkFilename: "[id][hash].css",
    }),
    new BrowserSyncPlugin(
      {
        // browse to http://localhost:3000/ during development,
        // ./public directory is being served
        proxy: "http://template.local/",
        files: ["dist" + "/*.css", "dist" + "/*.js"],
        injectCss: true,
      },
      { reload: false }
    ),
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          plugins: [
            ["gifsicle", { interlaced: true }],
            ["jpegtran", { progressive: true }],
            ["optipng", { optimizationLevel: 5 }],
            // SVG y otros plugins de optimización de imágenes pueden ir aquí
          ],
        },
      },
    }),    
  ],
  devtool: false,
};
