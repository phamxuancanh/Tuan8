function timeLimiter(timeout) {
    return (req, res, next) => {
      const ip = req.ip;
  
      const timeoutId = setTimeout(() => {
        console.warn(`[TIMEOUT] Request from IP: ${ip} exceeded ${timeout}ms`);
        if (!res.headersSent) {
          res.status(504).json({
            code: 504,
            message: 'Gateway timeout. The service is taking too long to respond.',
          });
        }
      }, timeout);
  
      const start = Date.now();
      res.on('finish', () => {
        clearTimeout(timeoutId);
        const duration = Date.now() - start;
        console.log(`[DONE] Request from IP: ${ip} completed in ${duration}ms`);
      });
  
      next();
    };
  }
  
  module.exports = timeLimiter;
  