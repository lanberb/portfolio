import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __dirname = path.resolve(path.dirname(""));

export default {
  devServer: {
    static: "dist",
    open: true,
  },
  entry: "./src/client/index.tsx",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: "ts-loader",
      },
    ],
  },
  output: {
    path: `${__dirname}/dist`,
    filename: "main.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "hello react",
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  target: ["web", "es5"],
};
