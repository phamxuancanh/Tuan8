// controllers/productController.js

const Product = require('../models/product');
// tạo api lỗi để test circuitBreaker
const apiTestCircuitBreaker = async (req, res) => {
  console.log('TEST CIRCRUIT')
  res.status(500).send('Internal Server Error');
};
let count = 0;

const retry = async (req, res) => {
  count++;
  if (count < 3) {
    console.log(`❌ Service fail ${count}`);
    res.status(500).json({ message: "Simulated failure" });
  } else {
    console.log(`✅ Service success ${count}`);
    res.json({ message: "Recovered success" });
  }
};
// Tạo mới một sản phẩm
const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    
    const newProduct = await Product.create({
      name,
      description,
      price,
      stock,
    });

    res.status(201).json({ message: 'Product created successfully!', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

// Lấy tất cả sản phẩm
// const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.findAll();
//     res.status(200).json({ products });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching products', error: error.message });
//   }
// };
const getAllProducts = async (req, res) => {
  try {
    // Đây là một mảng sản phẩm mẫu để trả về
    const products = [
      { id: 1, name: 'Product 1', price: 100, description: 'This is a sample product 1' },
      { id: 2, name: 'Product 2', price: 200, description: 'This is a sample product 2' },
      { id: 3, name: 'Product 3', price: 300, description: 'This is a sample product 3' },
      { id: 4, name: 'Product 4', price: 400, description: 'This is a sample product 4' },
      { id: 5, name: 'Product 5', price: 500, description: 'This is a sample product 5' }
    ];

    // Trả về sản phẩm mẫu dưới dạng JSON
    res.status(200).json({ products });
  } catch (error) {
    // Nếu có lỗi, trả về thông báo lỗi
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};


// Lấy sản phẩm theo ID
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

// Cập nhật thông tin sản phẩm
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;
  
  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock || product.stock;

    await product.save();

    res.status(200).json({ message: 'Product updated successfully!', product });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

// Xóa sản phẩm
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  
  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();

    res.status(200).json({ message: 'Product deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

module.exports = { 
  retry,
  apiTestCircuitBreaker,
  createProduct, 
  getAllProducts, 
  getProductById, 
  updateProduct, 
  deleteProduct 
};
