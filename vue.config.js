// let proxyObj = {};
const proxyConfig = require('./proxy.config');
const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
    devServer: {
        host: 'localhost',
        port: 8083,
        hot: true,
        proxy: proxyConfig
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [
                    new CompressionPlugin({
                        test: /\.js$|\.html$|\.css/,
                        threshold: 1024,
                        deleteOriginalAssets: false
                    })
                ]
            }
        }
    }
}