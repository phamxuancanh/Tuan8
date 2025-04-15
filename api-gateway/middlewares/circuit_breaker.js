// const breakerOptions = {
//     timeout: 2000, // request timeout in ms
//     errorThresholdPercentage: 50, // % thất bại để mở circuit
//     resetTimeout: 5000, // thời gian chờ để thử lại sau khi mở (ms)
//     rollingCountTimeout: 10000, // cửa sổ thời gian thống kê
//     rollingCountBuckets: 10, // 10 buckets cho rolling count
//     volumeThreshold: 2, // Cần ít nhất 2 yêu cầu để đánh giá lỗi
// };

// const callService = async (url, method = 'get', data = null) => {
//     return await axios({ url, method, data, timeout });
//   };
  
//   // Cấu hình Circuit Breaker
//   const breaker = new CircuitBreaker(callService, breakerOptions);
  
//   breaker.on('open', () => console.warn('[CIRCUIT BREAKER] OPEN - requests are now blocked'));
//   breaker.on('halfOpen', () => console.log('[CIRCUIT BREAKER] HALF-OPEN - trial request allowed'));
//   breaker.on('close', () => console.log('[CIRCUIT BREAKER] CLOSED - requests are allowed again'));
//   breaker.on('reject', () => console.warn('[CIRCUIT BREAKER] REJECTED - breaker is open'));
//   breaker.on('timeout', () => console.warn('[CIRCUIT BREAKER] TIMEOUT - request took too long'));
//   breaker.on('success', () => console.log('[CIRCUIT BREAKER] SUCCESS - service responded'));
//   breaker.on('failure', () => console.warn('[CIRCUIT BREAKER] FAILURE - service failed'));
  
//   // Fallback: Khi Circuit Breaker kích hoạt, trả về thông báo lỗi
//   breaker.fallback((err) => {
//     return { data: { message: 'Service temporarily unavailable', error: err.message } };
//   });