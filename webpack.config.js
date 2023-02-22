const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const {resolve} = require('path')
module.exports = {
    target:'web',
    mode:"development",
    devtool:"source-map",
    entry:resolve(__dirname+"/index.jsx"),

    resolve: {
        extensions:['.js','.jsx']
    },

    
    devServer: {
        host: '127.0.0.1',
        port: '8090',
        hot: true
    },

    module: {
        rules: [
          {
            test: /\.m?js|jsx$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            }
          }
        ]
      },

    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
          template: resolve(__dirname, './index.html')
        })
    ]



}