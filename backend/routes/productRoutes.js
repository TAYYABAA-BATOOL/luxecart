const express = require('express');
const router = express.Router();
const { getAllProducts, addProduct, deleteProduct, updateProduct } = require('../controllers/productController');
const { verifyAdmin } = require('../middleware/authMiddleware');

router.get('/', getAllProducts);                  // Public
router.post('/', verifyAdmin, addProduct);          // Admin Add
router.delete('/:id', verifyAdmin, deleteProduct);  // Admin Delete
router.put('/:id', verifyAdmin, updateProduct);     // Admin Update

module.exports = router;