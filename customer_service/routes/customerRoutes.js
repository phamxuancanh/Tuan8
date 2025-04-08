// routes/customerRoutes.js

const express = require('express');
const { 
  createCustomer, 
  getCustomerById, 
  updateCustomer, 
  deleteCustomer,
  getAllCustomers
} = require('../controllers/customerController');

const router = express.Router();

// Tạo mới một khách hàng
router.post('/customers', createCustomer);

// Lấy thông tin khách hàng theo ID
router.get('/customers/:id', getCustomerById);

// Cập nhật thông tin khách hàng
router.put('/customers/:id', updateCustomer);

// Xóa khách hàng
router.delete('/customers/:id', deleteCustomer);

// Lấy tất cả khách hàng
router.get('/customers', getAllCustomers);

module.exports = router;
