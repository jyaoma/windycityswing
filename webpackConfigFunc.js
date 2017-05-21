const path = require('path');

export default (webpackConfig) => {
    webpackConfig.module.loaders.unshift({
        test: /\.(eot|woff|woff2|ttf|svg|otf)$/,
        include: path.join(__dirname, 'windycityswing', 'src', 'fonts'),
        loader: 'url-loader?limit=70000&name=fonts/[name]-[hash].[ext]'
    });
    return webpackConfig;
};