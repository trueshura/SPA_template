/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const path = require('path');
const webpack = require('webpack');

module.exports={
    entry: './src/app.js',
    
    output: {
        path:       path.resolve('./backend/public/'),
        filename:   'application.js',
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
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            _: 'underscore',
        })
    ],    
};