const db = require('../config/db');

// 1. Get All Products (Public)
exports.getAllProducts = async (req, res) => {
  try {
    const [products] = await db.query('SELECT * FROM products ORDER BY id DESC');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 2. Add New Product (Admin Only)
exports.addProduct = async (req, res) => {
  try {
    const { name, category, price, image, description, sold_out } = req.body;

    await db.query(
      'INSERT INTO products (name, category, price, image, description, sold_out) VALUES (?, ?, ?, ?, ?, ?)',
      [name, category || 'New Arrivals', price, image || '', description || '', sold_out || false]
    );

    res.status(201).json({ message: 'Product added successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 3. Update Product (Admin Only)
exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, category, price, description, image } = req.body;

        const query = "UPDATE products SET name = ?, category = ?, price = ?, description = ?, image = ? WHERE id = ?";
        
        await db.query(query, [
          name, 
          category || 'New Arrivals', 
          price, 
          description || '', 
          image || '', 
          productId
        ]);

        res.json({ success: true, message: "Product updated successfully!" });
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ success: false, message: "Failed to save product", error: error.message });
    }
};

// 4. Delete Product (Admin Only)
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM products WHERE id = ?', [id]);
    res.json({ message: 'Product deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};