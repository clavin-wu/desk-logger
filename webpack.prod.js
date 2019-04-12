const webpack = require('webpack');
const merge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const base = require('./webpack.base.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(base, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        filename: 'js/[name].[contenthash:8].js',
        chunkFilename: 'js/[name].[contenthash:8].js',
    },
    performance: {
        hints: 'warning', // false | "error" | "warning"
        maxEntrypointSize: 200000, // bytes
        maxAssetSize: 200000 // bytes
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    enforce: true,
                    priority: 1
                },
                common: {
                    name: 'common',
                    chunks: 'all',
                    minChunks: 2,
                    enforce: true,
                    priority: 0
                }
            }
        }
    },
    plugins: [
        new BundleAnalyzerPlugin({
            openAnalyzer: false,
            analyzerMode: 'static',
            reportFilename: 'bundle-analyzer-report.html'
        }),
        new webpack.HashedModuleIdsPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles/[name]-[contenthash:16].css',
            chunkFilename: 'styles/[name]-[contenthash:16].css',
        }),
        new OptimizeCssAssetsPlugin(),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './src/template_prod.html', // Specify the HTML template to use
            minify: false,
            chunks: ['runtime', 'vendor', 'common', 'app'],
            inject: true,
        }),
    ]
});
