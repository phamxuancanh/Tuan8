// controllers/orderController.js

const Order = require('../models/order');

// Tạo mới một đơn hàng
const createOrder = async (req, res) => {
  try {
    const { user_id, total_price, products } = req.body;
    
    const newOrder = await Order.create({
      user_id,
      total_price,
      status: 'pending', // Mặc định đơn hàng sẽ có trạng thái pending
      products,
    });

    res.status(201).json({ message: 'Order created successfully!', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

// Lấy thông tin một đơn hàng theo ID
const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
};

// Cập nhật thông tin đơn hàng (ví dụ: thay đổi trạng thái đơn hàng)
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status, total_price, products } = req.body;

  try {
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Cập nhật thông tin trạng thái, giá trị tổng cộng, sản phẩm
    order.status = status || order.status;
    order.total_price = total_price || order.total_price;
    order.products = products || order.products;

    await order.save();

    res.status(200).json({ message: 'Order updated successfully!', order });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error: error.message });
  }
};

// Hủy một đơn hàng
const cancelOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status === 'canceled') {
      return res.status(400).json({ message: 'Order is already canceled' });
    }

    order.status = 'canceled';  // Đổi trạng thái đơn hàng thành "canceled"
    await order.save();

    res.status(200).json({ message: 'Order canceled successfully!', order });
  } catch (error) {
    res.status(500).json({ message: 'Error canceling order', error: error.message });
  }
};

// Lấy tất cả đơn hàng của người dùng (ví dụ: theo user_id)
const getOrdersByUserId = async (req, res) => {
  const { user_id } = req.params;
  
  try {
    const orders = await Order.findAll({ where: { user_id } });

    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

module.exports = { 
  createOrder, 
  getOrderById, 
  updateOrder, 
  cancelOrder, 
  getOrdersByUserId 
};
