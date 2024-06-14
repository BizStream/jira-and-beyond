import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default {
  mode: "production",
  entry: {
    content: "./scripts/content.js",
    popup: "./popup/options.js",
    tailwind: "./popup/styles.css",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(path.dirname(""), "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS into separate files
          "css-loader",
          "postcss-loader", // Add PostCSS loader for Tailwind CSS
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
  ],
};
