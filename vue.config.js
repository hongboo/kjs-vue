let proxyObj = {};
const CompressionPlugin = require("compression-webpack-plugin");
proxyObj['/ws'] = {
    ws: true,
    // target: "ws://39.96.165.180:8081"
    target: "ws://localhost:8081"
};
proxyObj['/'] = {
    ws: false,
    // target: 'http://39.96.165.180:8081',
    target: 'http://localhost:8081',
    changeOrigin: true,
    pathRewrite: {
        '^/': ''
    }
}
module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        hot: true,
        proxy: proxyObj
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