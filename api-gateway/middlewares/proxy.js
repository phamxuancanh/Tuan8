// const { createProxyMiddleware } = require("http-proxy-middleware");
// const rateLimitAndTimeout = require("./rateLimit");
// const API_PREFIX = require("../utils/utils").API_PREFIX;

// module.exports = (app) => {
//   const RATE_LIMIT = 1000; // requests per minute
//   const TIMEOUT = 10 * 1000; // 10 seconds

//   // Hàm cấu hình proxy cho các dịch vụ
//   const createServiceProxy = (serviceName, serviceURL) => {
//     console.log("a", serviceName)
//     console.log("a", serviceURL)
//     return (path) => {
//       app.use(
//         `${API_PREFIX}/${serviceName}`,
//         rateLimitAndTimeout(`/${serviceName}`, RATE_LIMIT, TIMEOUT),
//         createProxyMiddleware({
//           target: `${serviceURL}/${serviceName}`,
//           changeOrigin: true,
//           pathRewrite: { [`^/${serviceName}`]: "" },
//         })
//       );
//     };
//   };

//   // Cấu hình các dịch vụ (Product, Order, Customer)
//   const services = [
//     { name: "products", url: process.env.PRODUCT_SERVICE_URL },
//     { name: "orders", url: process.env.ORDER_SERVICE_URL },
//     { name: "customers", url: process.env.CUSTOMER_SERVICE_URL }
//   ];

//   // Áp dụng cấu hình proxy cho mỗi dịch vụ
//   services.forEach(service => {
//     console.log(service.url)
//     createServiceProxy(service.name, service.url)();
//   });
// };
