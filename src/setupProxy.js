const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        proxy('/api',{
            changeOrigin: true,
            target: "http://localhost:8080",
            pathRewrite: {
                "^/api": "/"
            }
        })
    );
};