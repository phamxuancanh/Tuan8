// controllers/productController.js

const Product = require('../models/product');

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
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({ products });
  } catch (error) {
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
  createProduct, 
  getAllProducts, 
  getProductById, 
  updateProduct, 
  deleteProduct 
};
