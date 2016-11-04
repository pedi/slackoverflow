const path = require('path');
const webpack = require('webpack');
const config = require('./common_config');
config.module.loaders[0].loaders.unshift('react-hot');
config.entry.app = ['webpack-hot-middleware/client'].concat(config.entry.app),
config.plugins = config.plugins.concat(
    [
        new webpack.HotModuleReplacementPlugin(),
    ]
)
module.exports = config;