// const express = require("express");
// const cors = require("cors");

// const app = express();
// const PORT = 6868;

// // CORS Middleware: Để xử lý CORS, dùng cors package thay vì tự viết các header CORS
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// // Chạy các middleware khác sau CORS
// require("./middlewares/proxy")(app);

// // Health check endpoint cho việc kiểm tra trạng thái của API Gateway
// app.get("/health", (req, res) => {
//   res.send("API Gateway is up and running!");
// });

// // Endpoint chính
// app.get("/", (req, res) => {
//   res.send("API Gateway đang hoạt động");
// });

// // Error Handling Middleware: Bắt lỗi bất kỳ và trả về phản hồi cho client
// app.use((err, req, res, next) => {
//   console.error(err); // In ra lỗi để kiểm tra
//   res.status(500).json({
//     message: "Đã xảy ra lỗi. Vui lòng thử lại sau.",
//   });
// });

// app.listen(PORT, () => {
//   console.log(`API Gateway đang chạy tại cổng ${PORT}`);
// });
require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 6868;
console.log(PORT);

// Proxy configuration
const proxyOptions = [
  { context: '/products', target: process.env.PRODUCT_SERVICE_URL + '/products' },
  { context: '/orders', target: process.env.ORDER_SERVICE_URL + '/orders' },
  { context: '/customers', target: process.env.CUSTOMER_SERVICE_URL + '/customers'},
];

// Apply proxy middleware
proxyOptions.forEach(({ context, target }) => {
    console.log(`Proxying ${context} => ${target}`);
    app.use(context, createProxyMiddleware({ target, changeOrigin: true }));
  });

// Start the server
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});