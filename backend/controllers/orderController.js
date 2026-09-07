const db = require('../config/db');

// Place New Order (Customer Checkout)
const createOrder = async (req, res) => {
  try {
    const { customer_name, customer_email, customer_phone, shipping_address, items, total_amount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in the cart' });
    }

    // 1. Save order into orders table
    const [result] = await db.query(
      `INSERT INTO orders (customer_name, customer_email, customer_phone, shipping_address, items, total_amount) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        customer_name, 
        customer_email, 
        customer_phone, 
        shipping_address, 
        JSON.stringify(items), // Items array ko JSON string mein convert karke save karna
        total_amount
      ]
    );

    const orderId = result.insertId;

    // 2. Optional: Reduce stock/quantity from products table if inventory exists
    for (const item of items) {
      if (item.id && item.quantity) {
        await db.query(
          `UPDATE products SET sold_out = sold_out + ? WHERE id = ?`,
          [item.quantity, item.id]
        );
      }
    }

    res.status(201).json({ 
      message: 'Order placed successfully', 
      orderId: orderId 
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Orders (For Admin Dashboard)
const getAllOrders = async (req, res) => {
  try {
    const [orders] = await db.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Order Status (Pending -> Processing -> Delivered)
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    res.json({ message: 'Order status updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createOrder, getAllOrders, updateOrderStatus };