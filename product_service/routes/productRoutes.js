// routes/productRoutes.js

const express = require('express');
const { 
  apiTestCircuitBreaker,
  retry,
  createProduct, 
  getAllProducts, 
  getProductById, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');

const router = express.Router();

// Tạo mới một sản phẩm
router.post('/products', createProduct);
router.get('/products/apiTestCircuitBreaker', apiTestCircuitBreaker)
router.get('/products/retry', retry)

// Lấy tất cả sản phẩm
router.get('/products', getAllProducts);

// Lấy sản phẩm theo ID
router.get('/products/:id', getProductById);

// Cập nhật thông tin sản phẩm
router.put('/products/:id', updateProduct);

// Xóa sản phẩm
router.delete('/products/:id', deleteProduct);

module.exports = router;
