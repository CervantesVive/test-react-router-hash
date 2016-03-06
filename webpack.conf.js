/*global module:true, require:true, console:true, __dirname:true */
(function(module, require){
    'use strict';

    var path = require('path');
    var webpack = require('webpack');

    var OUTPUT_PATH = path.join(__dirname, '../../../dist');

    var config = {
        context: __dirname,
        entry: [
            './index.js'
        ],
        output: {
            path: OUTPUT_PATH,
            filename: "bundle.js",
            publicPath: '/'
        },
        // Allow server to find jsx files w/o extension
        // See:
        //    https://webpack.github.io/docs/configuration.html#resolve-extensions
        resolve: {
            extensions: ['', '.js', '.jsx']
        },
        module: {
            loaders: [
                {
                    test: /\.(js|jsx)?$/,
                    loader: 'babel',
                    exclude: /node_modules/
                }
            ]
        },
        plugins: [
            // This prevents any output files from being written when there are
            // compilation errors.
            // See:
            //   https://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
            new webpack.NoErrorsPlugin(),

            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            })
        ],
        cache: true
    };

    config.devtool = "source-map";

    config.devServer = {
        contentBase: ".",
        info: true,
        hot: false,
        inline: false,
        port : 3000
    };

    module.exports = config;
})(module, require);
