const webpack = require('webpack');
const path = require('path');
const appPath = path.resolve(__dirname, '../app');
module.exports = {
    entry: {
        app: appPath + '/index.js',
        vendor: ['react', 'react-dom', 'react-router', 'moment']
    },
    output: {
        path: path.resolve(__dirname,'../dist/'),
        publicPath: '/assets/',
        filename: '[name].js',            
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: appPath,
                loaders: ['react-hot', 'babel'],
            },
            {
                test: /\.(png|jpg)$/,
                include: path.resolve(__dirname, '../assets'),
                loader: 'file-loader',
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
    ],
    resolve: {
        root: [appPath,],
        modules: [
            'node_modules',
        ]
    }
}