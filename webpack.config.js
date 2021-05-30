const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
module.exports = {
    entry: {
        app: ['./src/index.js']
    },
    output: {
        filename: '[name].bundle.js',
        path: __dirname + '/dist',
    },
    // webpack 5 comes with devServer which loads in development mode
    devServer: {
        port: 3001,
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
      },
    // Rules of how webpack will take our files, complie & bundle them for the browser 
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /nodeModules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'fitbuddyLogin',
            filename: 'remoteEntry.js',
            exposes: {
                './FitbuddyLoginIndex': './src/index',
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ],
}