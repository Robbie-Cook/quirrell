const nodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.ts"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index.js",
  },

  mode: "production",
  target: "web",

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },

  module: {
    rules: [
      {
        test: /(\.ts(x?))|(\.jsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "tsconfig.json"),
            },
          },
        ],
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "source-map-loader",
      },
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: [
          // Use the chain sass-loader -> css-loader -> style-loader
          // But use MiniCssExtractPlugin on prod, so we get a file.
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },

  // externals: {
  //   'react': 'react', // Case matters here
  //   'react-dom' : 'react-dom' // Case matters here
  // },
  externals: [nodeExternals()],
  plugins: [],
};
