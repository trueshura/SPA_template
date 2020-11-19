/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        application: path.resolve(__dirname, './src/app.js')
    },

    output: {
        path: path.resolve(__dirname, './backend/public'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js'
        //filename:   'application.js',
    },
    resolve: {
        alias: {'less': path.resolve('less')}
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            },
            {
                test: /\.hbs$/,
                loader: "handlebars-loader"
            }
        ]
    },
    devServer: {
        public: "127.0.0.1:8080",
        historyApiFallback: {
            index: '/'
        },
        proxy: {
            '/backend/**': {
                target: 'http://9cb9b5e9.ngrok.io',
                changeOrigin: true    // to redirect to external servers
            }
        },
        port: 8080
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,

                    // cacheGroupKey here is `vendor` as the key of the cacheGroup
                    name(module, chunks, cacheGroupKey) {
                        const moduleFileName = module.identifier().split('/').reduceRight(item => item);
                        const allChunksNames = chunks.map((item) => item.name).join('~');
                        return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
                    },
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
//        new ExtractTextPlugin(`css/[name]-[hash].min.css`),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            _: 'underscore'
        }),

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
//            publicPath: '/'
        })
    ]
};