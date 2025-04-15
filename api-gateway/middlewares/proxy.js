const { createProxyMiddleware } = require("http-proxy-middleware");
const rateLimiter = require("./rateLimit");
const timeLimiter = require("./timeLimit");
const retryProxy = require("./retry")
const CircuitBreaker = require("opossum");  // Giả sử bạn đang sử dụng thư viện 'opossum' cho Circuit Breaker
const API_PREFIX = require("../utils/utils").API_PREFIX;

const timeout = 2000; // request timeout in ms

module.exports = (app) => {
  const RATE_LIMIT = 7; // requests per minute
  const TIMEOUT = 10 * 1000 * 6; // 60s timeout

  const FAILURE_THRESHOLD = 3;     // Circuit breaker: số lần lỗi liên tiếp để mở mạch
  const COOLDOWN_PERIOD = 10000;   // Circuit breaker: thời gian nghỉ trước khi thử lại
  const SUCCESS_THRESHOLD = 1;     // Circuit breaker: số lần thành công để đóng mạch lại

  const RETRY_COUNT = 3;           // Retry: số lần thử lại
  const RETRY_DELAY = 1000;        // Retry: độ trễ giữa các lần thử lại (ms)

  const breakerOptions = {
    timeout: 2000, // request timeout in ms
    errorThresholdPercentage: 50, // % thất bại để mở circuit
    resetTimeout: 5000, // thời gian chờ để thử lại sau khi mở (ms)
    rollingCountTimeout: 10000, // cửa sổ thời gian thống kê
    rollingCountBuckets: 10, // 10 buckets cho rolling count
    volumeThreshold: 2, // Cần ít nhất 2 yêu cầu để đánh giá lỗi
  };

  const callService = async (url, method = 'get', data = null) => {
    return await axios({ url, method, data, timeout });
  };
  
  // Cấu hình Circuit Breaker
  const breaker = new CircuitBreaker(callService, breakerOptions);

  breaker.on('open', () => console.warn('[CIRCUIT BREAKER] OPEN - requests are now blocked'));
  breaker.on('halfOpen', () => console.log('[CIRCUIT BREAKER] HALF-OPEN - trial request allowed'));
  breaker.on('close', () => console.log('[CIRCUIT BREAKER] CLOSED - requests are allowed again'));
  breaker.on('reject', () => console.warn('[CIRCUIT BREAKER] REJECTED - breaker is open'));
  breaker.on('timeout', () => console.warn('[CIRCUIT BREAKER] TIMEOUT - request took too long'));
  breaker.on('success', () => console.log('[CIRCUIT BREAKER] SUCCESS - service responded'));
  breaker.on('failure', () => console.warn('[CIRCUIT BREAKER] FAILURE - service failed'));

  // Fallback: Khi Circuit Breaker kích hoạt, trả về thông báo lỗi
  breaker.fallback((err) => {
    return { data: { message: 'Service temporarily unavailable', error: err.message } };
  });

  // Hàm cấu hình proxy cho các dịch vụ
  const createServiceProxy = (serviceName, serviceURL) => {
    return () => {
      const routePath = `${API_PREFIX}/${serviceName}`;
      app.use(
        routePath,
        rateLimiter(RATE_LIMIT),
        timeLimiter(TIMEOUT),
        // (req, res, next) => {
        //   breaker.fire(`${serviceURL}/${serviceName}${req.originalUrl.replace(routePath, "")}`, req.method, req.body)
        //     .then(response => {
        //       res.status(response.status).json(response.data);
        //     })
        //     .catch(err => {
        //       res.status(500).json({
        //         message: "Service temporarily unavailable",
        //         error: err.message
        //       });
        //     });
        // },
        retryProxy(serviceURL, RETRY_COUNT, RETRY_DELAY)
      );
    };
  };

  // Cấu hình các dịch vụ (Product, Order, Customer)
  const services = [
    { name: "products", url: process.env.PRODUCT_SERVICE_URL },
    { name: "orders", url: process.env.ORDER_SERVICE_URL },
    { name: "customers", url: process.env.CUSTOMER_SERVICE_URL }
  ];

  // Áp dụng cấu hình proxy cho mỗi dịch vụ
  services.forEach(service => {
    createServiceProxy(service.name, service.url)();
  });
};
