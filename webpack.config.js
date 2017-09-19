/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
const WebpackChunkHash = require("webpack-chunk-hash");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports={
    entry: {
        application:    path.resolve(__dirname,'./src/app.js'),
    },
    
    output: {
        path:           path.resolve(__dirname,'./backend/public'),
        filename:       '[name].[chunkhash].js',
        chunkFilename:  '[name].[chunkhash].js'
        //filename:   'application.js',
    },
    resolve: {
        alias: {'less': path.resolve('less')},
    },
    module: {
        loaders: [
            {
                test:       /\.less$/,
                loader:     "style-loader!css-loader!less-loader"
            },
            { 
                test:       /\.hbs$/, 
                loader:     "handlebars-loader",
            },
        ],
    },
    devServer: {
        public: "127.0.0.1:8080",
        historyApiFallback: {
            index: '/',
        },
        proxy: {
            '/backend/**': {
                target:         'http://9cb9b5e9.ngrok.io',
                changeOrigin:   true    // to redirect to external servers
            },
        },
        port: 8080,
    },
    plugins: [
//        new ExtractTextPlugin(`css/[name]-[hash].min.css`),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            _: 'underscore',
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: 'vendor', // Specify the common bundle's name.
            minChunks: function (module) {
                //skip core libs!
                /*
                if(module.resource && coreLibs.indexOf(path.basename(module.resource,'.js'))!== -1) {
                    return false;
                }
                */
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && (module.context.indexOf('node_modules') !== -1 || module.context.indexOf('vendor') !== -1);
            },
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "manifest",
            minChunks: Infinity,
        }),
        new webpack.HashedModuleIdsPlugin(),
        new WebpackChunkHash(),
        /*
         * чувак сломал плагин в версии 1.1.2 последняя рабочая 1.1.1
         */
        new ChunkManifestPlugin({
            filename: "chunk-manifest.json",
            manifestVariable: "webpackManifest",
        }),
/*
        new ScriptExtHtmlWebpackPlugin({
//            defer: /vendor\..+/,
//            async: ['vendor'],
        }),
*/
        new InlineManifestWebpackPlugin({
            name: 'webpackManifest'
	}),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'./src/index.html'),
	}),
    ], 
};