// const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const createConfig = () => {
    // function stringify (obj) {
    //     Object.keys(obj).forEach((key) => {
    //         obj[key] = `"${obj[key]}"`;
    //     });
    //     return obj;
    // }

    const config = {
        entry: './windycityswing/src/scripts/app.js',

        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'bundle.js'
        },

        // devServer: {
        //     hot: true,
        //     port: 8080,
        //     inline: true,
        //     contentBase: "dist/"
        //     proxy: {
        //         "/WindyCitySwing": {
        //             target: "http://localhost:8080/",
        //             secure: false
        //         }
        //     }
        // },

        module: {
            loaders: [
                {
                    test: /\.js$/,
                    include: path.join(__dirname, 'windycityswing', 'src', 'scripts'),
                    loader: 'babel',
                    query: {
                        presets: ['es2015', 'react']
                    }
                },
                {
                    test: /\.js$/,
                    include: path.join(__dirname, 'vday2017', 'src', 'scripts'),
                    loader: 'babel',
                    query: {
                        presets: ['es2015', 'react']
                    }
                },
                {
                    test: /\.less$/,
                    include: path.join(__dirname, 'windycityswing', 'src', 'less'),
                    loaders: ['style', 'css', 'resolve-url', 'less']
                },
                {
                    test: /\.less$/,
                    include: path.join(__dirname, 'vday2017', 'src', 'less'),
                    loaders: ['style', 'css', 'resolve-url', 'less']
                },
                {
                    test: /\.(eot|woff|woff2|ttf|svg)$/,
                    include: path.join(__dirname, 'windycityswing', 'src', 'lib', 'assets', 'fonts'),
                    loader: 'url-loader?limit=70000&name=fonts/[name]-[hash].[ext]'
                },
                {
                    test: /\.(eot|woff|woff2|ttf|svg)$/,
                    include: path.join(__dirname, 'vday2017', 'src', 'fonts'),
                    loader: 'url-loader?limit=70000&name=fonts/[name]-[hash].[ext]'
                },
                {
                    test: /\.(jpg|svg|png)$/,
                    loader: 'url-loader?limit=10000&name=images/[name]-[hash].[ext]',
                    include: path.join(__dirname, 'windycityswing', 'src', 'images')
                },
                {
                    test: /\.(jpg|svg|png)$/,
                    loader: 'url-loader?limit=10000&name=images/[name]-[hash].[ext]',
                    include: path.join(__dirname, 'vday2017', 'src', 'images')
                },
                {
                    include: /\.json$/, loaders: ['json-loader']
                }
            ]
        },

        resolve: {
            extensions: ['', '.json', '.jsx', '.js']
        },

        plugins: [
            new CopyWebpackPlugin([
                {from: '.\\vday2017\\src\\images\\', to: 'images\\'}, // TODO: Use url-loader, it's better than this. Then remove copy-webpack-plugin.
                {from: '.\\vday2017\\src\\fonts\\', to: 'fonts\\'}
            ]),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'index.html')
            })
        ]
    };

    return config;
};

module.exports = createConfig();