/*
    html-webpack-plugin - Generate HTML file via webpack 
    path - provides utilities for working with file and directory paths
*/
const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

// To Let Babel plugin know config should run on development mode
process.env.NODE_ENV = 'development';

// To configure webpack we have to export JavaScript Object
module.exports = {
    mode: 'development',
    target: 'web', // We can also set this to node if Webpack to build an app running in Node
    devtool: 'cheap-module-source-map', // Let us see our original code when debugging in the browser
    entry: './src/index',
    // Webpack to output
    output: {
        path: path.resolve(__dirname, 'build'), // Serve from this dir
        publicPath: '/', //Public URL of the output directory when it ref in the browser
        filename: 'bundle.js' // Webpack requires this value so that HTML can reference the bundle that being served from memory
    },
    // Configuring Dev server, We can use Express too
    devServer: {
        stats: 'minimal', //Reduces the info that writes to command line
        overlay: true, // Overlay the error that occur in the browser
        historyApiFallback: true, // All request will be sent to index.html
        disableHostCheck: true,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        https: false
    },
    // Plugins: Specify an ARRAY
    plugins: [
        new htmlWebpackPlugin({
            template: "src/index.html",
            favicon: "src/favicon.ico"
        })
    ],
    // informing Webpack what are the files to handle
    module: {
        rules: [
            // For JavaScript
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                // What to do with these JS files?
                // Run babel and eslint loader in files
                // Webpack will run esLint each time we hit save
                // Bottom-up : eslint then babel
                use: [
                    "babel-loader", "eslint-loader"
                ]
            },
            // For CSS
            {
                test: /(\.css)$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
}