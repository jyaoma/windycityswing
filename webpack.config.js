// const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const createConfig = () => {
    const config = {
        entry: './windycityswing/src/scripts/app.js',

        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'bundle.js'
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: path.join(__dirname, 'windycityswing', 'src', 'scripts'),
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015', 'react']
                    }
                },
                {
                    test: /\.js$/,
                    include: path.join(__dirname, 'vday2017', 'src', 'scripts'),
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015', 'react']
                    }
                },
                {
                    test: /\.js$/,
                    include: path.join(__dirname, 'jerissatothemoon', 'src', 'scripts'),
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015', 'react']
                    }
                },
                {
                    test: /\.less$/,
                    include: path.join(__dirname, 'windycityswing', 'src', 'less'),
                    loaders: ['style-loader', 'css-loader', 'resolve-url-loader', 'less-loader']
                },
                {
                    test: /\.less$/,
                    include: path.join(__dirname, 'vday2017', 'src', 'less'),
                    loaders: ['style-loader', 'css-loader', 'resolve-url-loader', 'less-loader']
                },
                {
                    test: /\.less$/,
                    include: path.join(__dirname, 'jerissatothemoon', 'src', 'less'),
                    loaders: ['style-loader', 'css-loader', 'resolve-url-loader', 'less-loader']
                },
                {
                    test: /\.(eot|woff|woff2|ttf|svg|otf)$/,
                    include: path.join(__dirname, 'windycityswing', 'src', 'fonts'),
                    loader: 'url-loader?limit=70000&name=fonts/[name]-[hash].[ext]'
                },
                {
                    test: /\.(eot|woff|woff2|ttf|svg|otf)$/,
                    include: path.join(__dirname, 'vday2017', 'src', 'fonts'),
                    loader: 'url-loader?limit=70000&name=fonts/[name]-[hash].[ext]'
                },
                {
                    test: /\.(eot|woff|woff2|ttf|svg|otf)$/,
                    include: path.join(__dirname, 'jerissatothemoon', 'src', 'fonts'),
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
                    test: /\.(jpg|svg|png)$/,
                    loader: 'url-loader?limit=10000&name=images/[name]-[hash].[ext]',
                    include: path.join(__dirname, 'jerissatothemoon', 'src', 'images')
                }
            ]
        },

        resolve: {
            extensions: ['.json', '.jsx', '.js']
        },

        plugins: [
            new CopyWebpackPlugin([
                {from: '.\\jerissatothemoon\\src\\images\\', to: 'images\\'}, // TODO: Use url-loader, it's better than this. Then remove copy-webpack-plugin.
                {from: '.\\jerissatothemoon\\src\\fonts\\', to: 'fonts\\'},
                {from: '.\\jerissatothemoon\\src\\less\\', to: 'less\\'},
                {from: '.\\vday2017\\src\\images\\', to: 'images\\'}, // TODO: Use url-loader, it's better than this. Then remove copy-webpack-plugin.
                {from: '.\\vday2017\\src\\fonts\\', to: 'fonts\\'},
                {from: '.\\vday2017\\src\\less\\', to: 'less\\'},
                {from: '.\\windycityswing\\src\\images\\', to: 'images\\'}, // TODO: Use url-loader, it's better than this. Then remove copy-webpack-plugin.
                {from: '.\\windycityswing\\src\\fonts\\', to: 'fonts\\'},
                {from: '.\\windycityswing\\src\\less\\', to: 'less\\'}
            ]),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'index.html')
            })
        ]
    };

    return config;
};

module.exports = createConfig();