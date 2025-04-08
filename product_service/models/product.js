// models/product.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Định nghĩa model Product
const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,  // Tên sản phẩm là bắt buộc
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,  // Mô tả sản phẩm là bắt buộc
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,  // Giá sản phẩm là bắt buộc
    validate: {
      min: 0, // Giá phải là một số dương
    },
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,  // Số lượng tồn kho là bắt buộc
    validate: {
      min: 0, // Tồn kho phải là một số dương
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,  // Thời gian tạo sản phẩm
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,  // Thời gian cập nhật sản phẩm
  },
});

module.exports = Product;
