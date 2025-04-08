// models/order.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  total_price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending', // Trạng thái mặc định là "pending"
    allowNull: false
  },
  products: {
    type: DataTypes.JSONB, // Lưu trữ thông tin sản phẩm dưới dạng JSON
    allowNull: false
  }
}, {
  timestamps: true // Thêm các trường createdAt và updatedAt
});

module.exports = Order;
