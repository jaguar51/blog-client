const NODE_ENV = process.env.NODE_ENV || 'development';

const webpack = require('webpack');

const path = require('path');
const BUILD_DIR = path.resolve(__dirname, './build');
const APP_DIR = path.resolve(__dirname, './src');

module.exports = {
    entry: [
        APP_DIR + '/app/App.js',
    ],
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
        publicPath: '/',
    },

    watch: NODE_ENV == 'development',
    watchOptions: {
        aggregateTimeout: 100,
    },

    devtool: NODE_ENV == 'development' ? 'cheap-inline-module-source-map' : null,

    plugins: [
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(NODE_ENV),
            'require.specified': 'require.resolve'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new webpack.NoErrorsPlugin()
    ],

    devServer: {
        historyApiFallback: true
    },

    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.(png|jpg|svg|[ot]tf|eot|woff|woff2)$/,
                loader: 'file?name=[path][name].[ext]'
            },
        ]
    }
};

if (NODE_ENV == 'production') {
    module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false,
        compress: {
            sequences: true,
            booleans: true,
            loops: true,
            unused: true,
            warnings: false,
            drop_console: true,
            unsafe: true
        }
    }));
}
