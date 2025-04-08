// app.js

require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const orderRoutes = require('./routes/orderRoutes');  // Thêm vào đây

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json()); // Middleware để parse JSON request body

// Đăng ký các route
app.use('/api', orderRoutes);  // Đảm bảo các route order được định nghĩa

// Đồng bộ hóa database (kết nối PostgreSQL)
sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
