const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const { verifyAdmin } = require('../middleware/authMiddleware');

router.post('/', createOrder);                      // Public: Customer checkout
router.get('/', verifyAdmin, getAllOrders);         // Admin: View all orders
router.put('/:id', verifyAdmin, updateOrderStatus); // Admin: Update order status

module.exports = router;