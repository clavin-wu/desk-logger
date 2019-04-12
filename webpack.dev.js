const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.base.js');
const config = require('./src/config/config.node.js');

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap(merge(base, {
    output: {
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js',
        path: path.join(__dirname, 'dist'),
        publicPath: config.publicPath,
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        // Tell the server where to serve content from. This is only necessary if you want to 
        // serve static files. devServer.publicPath will be used to determine where the bundles 
        // should be served from, and takes precedence.
        contentBase: path.join(__dirname, 'src', 'static'),
        hot: true,
        overlay: true,
        public: config.publicPath,
        host: 'localhost',
        port: config.devSererverPort,
        inline: true,
        headers: {
            'static-server': 'webpack-dev-server'
        },
        disableHostCheck: true,
        open: true,
        openPage: '#/machine/manage',
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
            },
        },
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './src/template_dev.html', // Specify the HTML template to use
            minify: false,
            chunks: ['app'],
            inject: true,
        }),
    ]
}));