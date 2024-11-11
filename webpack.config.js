const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        app: "./src/index.js",
    },
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: '/',
        clean: true,
    },
    mode: 'development',
    devServer: {
      static: path.join(__dirname, 'dist'),  // Serve content from the dist directory
      open: true,  // Automatically open the browser
      port: 8080,  // Port 8080

     
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/template.html',  // Path to your HTML template
      }),
    ],
    module: {
        rules: [
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        },
        {
            test: /\.html$/i,
            loader: "html-loader",
        },
        {
            test: /\.(png|svg|webp|jpg|jpeg|gif)$/i,
            type: "asset/resource",
        },
        ],
    },
};