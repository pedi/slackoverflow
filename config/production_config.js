const config = require('./common_config');
const path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

config.plugins = [
	new CleanWebpackPlugin('./dist', {
		root: path.resolve(__dirname, '../'),
		verbose: true,
	}),
	new HtmlWebpackPlugin({
		title: 'SlackOverflow'
	})
].concat(config.plugins);
config.devtool = 'source-map';
module.exports = config;