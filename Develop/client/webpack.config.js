const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      delete: "./src/js/delete.js",
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      //The plugin info
      new HtmlWebpackPlugin({
        template: "./index.html",
        tile: "Jate",
        favicon: "./favicon.ico"
      }),
      //The program info
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Jate",
        description: "A little text editor to save your notes in!",
        favicon: "./favicon.ico",
        background_color: "#A95C68",
        start_url: "/",
        publicPath: "/",
        icons: [
        {
          src: path.resolve("src/images/logo.png"),
          sizes: [96, 128, 192, 256],
          destination: path.join("src", "images")
        }
        ]
      })
    ],

    module: {
      rules: [
        //Loaders for CSS and Babel
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
          excluse: [path.join(__dirname, 'src')]
        },
        {
          test: /\.m?js$/,
          excluse: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["#babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ]
            }
          }
        }
      ],
    },
  };
};
