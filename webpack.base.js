const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

module.exports = {
    mode: 'development',
    entry: {
        app: './src/app.tsx',
    },
    output: {
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js',
        path: path.join(__dirname, 'dist'),
    },
    module: {
        rules: [
            { 
                test: /\.tsx?$/, 
                use: [
                    {
                        // babel-plugin-import will not work properly if you add the 
                        // library to the webpack config vendor.
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-react'],
                            plugins: [
                                'syntax-dynamic-import',
                                // style: true 会加载 less 文件
                                [ 'import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' } ]
                                //  can be an array.~ It's not available in babel@7+
                                // For Example:
                                // [ 'import', [
                                //         { libraryName: 'antd-mobile', style: 'css' },
                                //         { libraryName: 'antd', style: true },
                                //     ]
                                // ]
                            ],
                        },
                    },
                    {
                        loader: 'awesome-typescript-loader',
                    }
                ]
            },
            { 
                enforce: 'pre', 
                test: /\.js$/, 
                loader: 'source-map-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[name].[hash:16].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[name].[hash:16].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.(sc|sa|c)ss$/,
                use: [
                    process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: process.env.NODE_ENV !== 'production'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            sourceMap: process.env.NODE_ENV !== 'production',
                            plugins: loader => [
                                require('autoprefixer')({
                                    browsers: [' > 0.15% in CN ']
                                })
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: process.env.NODE_ENV !== 'production'
                        }
                    }
                ]
            },
        ]
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src'),
            mobx: __dirname + '/node_modules/mobx/lib/mobx.es6.js'
        },
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    plugins: [
    ]
};
