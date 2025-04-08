// config/database.js

require('dotenv').config();
const { Sequelize } = require('sequelize');

// Sử dụng biến môi trường DATABASE_URL để lấy thông tin kết nối từ Render (hoặc bạn có thể thay thế bằng chuỗi kết nối trực tiếp nếu cần)
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgresql://sa:dyF4Z478rGOvg7bkAx7wO8ngNMiAq1zA@dpg-cvqh52muk2gs73d5rfpg-a.singapore-postgres.render.com/tuan8_bt_db_3u8n', {
  dialect: 'postgres',
  logging: false, // Tắt logging SQL
  dialectOptions: {
    ssl: {
      require: true, // Chỉ cần SSL cho kết nối an toàn
      rejectUnauthorized: false, // Dành cho trường hợp SSL tự ký (tùy chỉnh)
    },
  },
});

module.exports = sequelize;
