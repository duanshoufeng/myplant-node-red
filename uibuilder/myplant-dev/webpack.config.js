const path = require("path");

module.exports = {
  entry: "./src/index.js",
  // mode: "production",
  mode: "development",
  devtool: "eval-source-map",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "./src/dist"),
  },
};
