const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 6868;

// CORS Middleware: Để xử lý CORS, dùng cors package thay vì tự viết các header CORS
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Chạy các middleware khác sau CORS
require("./middlewares/proxy")(app);

// Health check endpoint cho việc kiểm tra trạng thái của API Gateway
app.get("/health", (req, res) => {
  res.send("API Gateway is up and running!");
});

// Endpoint chính
app.get("/", (req, res) => {
  res.send("API Gateway đang hoạt động");
});

// Error Handling Middleware: Bắt lỗi bất kỳ và trả về phản hồi cho client
app.use((err, req, res, next) => {
  console.error(err); // In ra lỗi để kiểm tra
  res.status(500).json({
    message: "Đã xảy ra lỗi. Vui lòng thử lại sau.",
  });
});

app.listen(PORT, () => {
  console.log(`API Gateway đang chạy tại cổng ${PORT}`);
});
