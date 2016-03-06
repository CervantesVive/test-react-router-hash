/*global module:true, require:true, console:true, __dirname:true */
(function(module, require){
    'use strict';

    var path = require('path');
    var webpack = require('webpack');
    var autoprefixer = require('autoprefixer');
    var ExtractTextPlugin = require('extract-text-webpack-plugin');

    var VERBOSE = false;
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
        // Sets the options for the webpack CLI
        stats: {
            colors: true,
            reasons: VERBOSE,
            hash: VERBOSE,
            version: VERBOSE,
            timings: true,
            chunks: VERBOSE,
            chunkModules: VERBOSE,
            cached: VERBOSE,
            cachedAssets: VERBOSE
        },
        module: {
            loaders: [
                {
                    test: /\.(js|jsx)?$/,
                    loader: 'babel',
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader!postcss-loader'
                },
                // Any png-image or woff-font below or equal to 100K will be converted
                // to inline base64 instead
                {
                    test: /\.(png|woff|woff2|eot|svg|ttf)$/,
                    loader: 'url-loader?limit=100000'
                }
            ]
        },
        plugins: [
            // This is recommended to be used when [chunkhash] is used in output
            // filenames.
            // See:
            //   https://webpack.github.io/docs/list-of-plugins.html#occurenceorderplugin
            //   https://webpack.github.io/docs/configuration.html#output
            new webpack.optimize.OccurenceOrderPlugin,

            // This prevents any output files from being written when there are
            // compilation errors.
            // See:
            //   https://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
            new webpack.NoErrorsPlugin(),

            // Prevents the inclusion of duplicate code in the bundle builds.
            // See:
            //   https://github.com/webpack/docs/wiki/optimization#deduplication
            new webpack.optimize.DedupePlugin(),

            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            })
        ],
        cache: true,
        // set postcss plugins
        // See:
        //  https://github.com/postcss/postcss-loader
        //  https://github.com/postcss/autoprefixer
        postcss() {
            return [autoprefixer({
                browsers: [
                    'last 2 Android version',
                    'iOS > 7',
                    'last 3 Chrome version'
                ]
            })]
        }
    };

    if(process.env.NODE_ENV === 'production'){
        config.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: true
                },
                output: {
                    comments: false
                },
                sourceMap: true,
                mangle: true
            }),

            // extract inline css into separate 'styles.css'
            new ExtractTextPlugin('styles.css')
        );

        config.module.loaders.push(
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    // activate source maps via loader query
                    'css?sourceMap!' +
                    'sass?sourceMap' +
                    '!postcss-loader'
                )
            }
        );
    } else {
        config.plugins.push(
            // Allows modules to be "hot swapped" at runtime removing the need for a full
            // page reload during development
            // See:
            //   https://webpack.github.io/docs/hot-module-replacement.html
            new webpack.HotModuleReplacementPlugin()
        );

        config.module.loaders.push(
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader!postcss-loader'
            }
        );

        config.entry.push(
            'webpack/hot/dev-server'
        );

        config.devtool = "source-map";

        config.devServer = {
            historyApiFallback: true,
            contentBase: ".",
            info: true,
            hot: true,
            inline: true,
            port : 3000
        };
    }

    module.exports = config;
})(module, require);
