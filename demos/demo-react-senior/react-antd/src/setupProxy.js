const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/article",
    createProxyMiddleware({
      target: "https://assets.kscampus.io:10443",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/",
    createProxyMiddleware({
      target: "http://localhost:3361",
      changeOrigin: true,
    })
  );
};
