// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/chats", {
      target: "http://15.165.207.71:8080/", // 백엔드 서버의 주소
      changeOrigin: true,
      secure: false, // HTTPS 요청을 프록시할 때 false로 설정
    })
  );
  app.use(
    createProxyMiddleware("/auth", {
      target: "http://15.165.207.71:8080/", // 백엔드 서버의 주소
      changeOrigin: true,
      secure: false, // HTTPS 요청을 프록시할 때 false로 설정
    })
  );
};
