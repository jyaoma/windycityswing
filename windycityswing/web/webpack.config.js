const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const createConfig = () => {
    const config = {
        entry: './src/scripts/app.js',

        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'bundle.js'
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: path.join(__dirname, 'src', 'scripts'),
                    loader: 'babel-loader',
                    query: {
                        presets: ['react', 'env']
                    }
                },
                {
                    test: /\.less$/,
                    include: path.join(__dirname, 'src', 'less'),
                    loaders: ['style-loader', 'css-loader', 'resolve-url-loader', 'less-loader']
                },
                {
                    test: /\.(eot|woff|woff2|ttf|svg|otf)$/,
                    include: path.join(__dirname, 'src', 'fonts'),
                    loader: 'url-loader?limit=70000&name=fonts/[name]-[hash].[ext]'
                },
                {
                    test: /\.(jpg|svg|png)$/,
                    loader: 'url-loader?limit=10000&name=images/[name]-[hash].[ext]',
                    include: path.join(__dirname, 'src', 'images')
                },
            ]
        },

        resolve: {
            extensions: ['.json', '.jsx', '.js']
        },

        plugins: [
            new CopyWebpackPlugin([
                {from: '.\\src\\images\\', to: 'images\\'}, // TODO: Use url-loader, it's better than this. Then remove copy-webpack-plugin.
                {from: '.\\src\\fonts\\', to: 'fonts\\'},
                {from: '.\\src\\less\\', to: 'less\\'}
            ]),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'index.html')
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            })
        ]
    };

    return config;
};

module.exports = createConfig();