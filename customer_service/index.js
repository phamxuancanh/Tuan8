// app.js

require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const customerRoutes = require('./routes/customerRoutes');  // Thêm vào đây

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware để parse JSON request body

app.use('/api', customerRoutes);  // Đảm bảo các route customer được định nghĩa

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
