// routes/orderRoutes.js

const express = require('express');
const { 
  createOrder, 
  getOrderById, 
  updateOrder, 
  cancelOrder,
  getOrdersByUserId
} = require('../controllers/orderController');

const router = express.Router();

// Tạo mới một đơn hàng
router.post('/orders', createOrder);

// Lấy thông tin đơn hàng theo ID
router.get('/orders/:id', getOrderById);

// Cập nhật thông tin đơn hàng (ví dụ: thay đổi trạng thái)
router.put('/orders/:id', updateOrder);

// Hủy đơn hàng
router.put('/orders/:id/cancel', cancelOrder);

// Lấy tất cả đơn hàng của người dùng
router.get('/orders/user/:user_id', getOrdersByUserId);

module.exports = router;
