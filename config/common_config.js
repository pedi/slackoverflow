const webpack = require('webpack');
const path = require('path');
const appPath = path.resolve(__dirname, '../app');

const devFlagPlugin = new webpack.DefinePlugin({
    __BASE_HOST__: JSON.stringify(process.env.HOST || 'http://10.2.201.244:3000'),
});
module.exports = {
    entry: {
        app: appPath + '/index.js',
        vendor: ['react', 'react-dom', 'moment', 'emoji-data', 'react-syntax-highlighter', 'react-router']
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
                loaders: ['babel'],
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
        devFlagPlugin,
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
    ],
    resolve: {
        root: [appPath,],
        modules: [
            'node_modules',
        ]
    }
}