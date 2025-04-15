const axios = require("axios");

function retryMiddleware(baseURL, maxRetries = 3, retryDelay = 1000) {
    return async (req, res, next) => {
        const method = req.method;
        const data = req.body;
        const headers = req.headers;

        let attempt = 0;

        async function tryRequest() {
            try {
                // Thêm log để kiểm tra URL
                console.log(`Making request to: ${baseURL}${req.originalUrl.replace('/api/v1', '')}`);

                // Tạo request bằng axios
                const response = await axios({
                    method,
                    url: `${baseURL}${req.originalUrl.replace('/api/v1', '')}`,
                    data,
                    headers,
                    timeout: 5000, // timeout trong 5s
                });

                console.log(`✅ Gateway got response: ${response.status}`);
                return res.status(response.status).json(response.data);
            } catch (err) {
                attempt++;
                console.warn(`❌ Error on attempt ${attempt}: ${err.message}`);

                if (attempt <= maxRetries) {
                    console.warn(`🔁 Retry ${attempt}/${maxRetries} for ${req.originalUrl}`);
                    // Đợi một thời gian trước khi thử lại
                    setTimeout(tryRequest, retryDelay);
                } else {
                    console.error(`❌ Failed after ${maxRetries} retries`);
                    return res.status(err.response?.status || 500).json({
                        code: err.response?.status || 500,
                        message: "Service unavailable after retries",
                    });
                }
            }
        }

        await tryRequest(); // Sử dụng await thay vì setTimeout trực tiếp
    };
}

module.exports = retryMiddleware;
