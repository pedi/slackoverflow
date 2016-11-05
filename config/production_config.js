const config = require('./common_config');
const path = require('path');
const webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

config.plugins = [
	new CleanWebpackPlugin('./dist', {
		root: path.resolve(__dirname, '../'),
		verbose: true,
	}),
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		}
	}),
	new HtmlWebpackPlugin({
		title: 'SlackOverflow',
		hash: false,
		filename: 'index.html',
		template: path.resolve(__dirname, '../index.ejs'),
		inject: 'body',
	})
].concat(config.plugins);
config.devtool = 'source-map';
module.exports = config;