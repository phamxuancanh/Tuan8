// controllers/customerController.js

const Customer = require('../models/customer');

// Tạo mới một khách hàng
const createCustomer = async (req, res) => {
  try {
    const { name, email, phone_number, address } = req.body;
    
    const newCustomer = await Customer.create({
      name,
      email,
      phone_number,
      address,
    });

    res.status(201).json({ message: 'Customer created successfully!', customer: newCustomer });
  } catch (error) {
    res.status(500).json({ message: 'Error creating customer', error: error.message });
  }
};

// Lấy thông tin một khách hàng theo ID
const getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json({ customer });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customer', error: error.message });
  }
};

// Cập nhật thông tin khách hàng
const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone_number, address } = req.body;

  try {
    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    customer.name = name || customer.name;
    customer.email = email || customer.email;
    customer.phone_number = phone_number || customer.phone_number;
    customer.address = address || customer.address;

    await customer.save();

    res.status(200).json({ message: 'Customer updated successfully!', customer });
  } catch (error) {
    res.status(500).json({ message: 'Error updating customer', error: error.message });
  }
};

// Xóa khách hàng
const deleteCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    await customer.destroy();

    res.status(200).json({ message: 'Customer deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting customer', error: error.message });
  }
};

// Lấy tất cả khách hàng
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json({ customers });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers', error: error.message });
  }
};

module.exports = { 
  createCustomer, 
  getCustomerById, 
  updateCustomer, 
  deleteCustomer,
  getAllCustomers 
};
