const express = require('express');
const router = express.Router();
const pool = require('../db');
const { authRequired, adminOnly } = require('../middlewares/auth');

// GET /api/products - list all active cupcakes
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, description, price, image_url FROM products WHERE is_active = TRUE'
    );

    const cupcakes = rows.map((row) => ({
      id: row.id,
      name: row.name,
      description: row.description,
      price: Number(row.price),
      image: row.image_url,
    }));

    res.json(cupcakes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// POST /api/products - create product (admin only)
router.post('/', authRequired, adminOnly, async (req, res) => {
  const { name, description, price, image, flavor, category, stock } = req.body;

  if (!name || !description || price == null) {
    return res.status(400).json({ message: 'name, description and price are required' });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO products 
       (name, description, price, flavor, category, image_url, stock, is_active) 
       VALUES (?, ?, ?, ?, ?, ?, ?, TRUE)`,
      [
        name,
        description,
        price,
        flavor || null,
        category || null,
        image || null,
        stock != null ? stock : 0,
      ]
    );

    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating product' });
  }
});

// PUT /api/products/:id - update product (admin only)
router.put('/:id', authRequired, adminOnly, async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image, flavor, category, stock, is_active } = req.body;

  try {
    await pool.query(
      `UPDATE products
       SET name = ?, description = ?, price = ?, flavor = ?, category = ?, 
           image_url = ?, stock = ?, is_active = ?
       WHERE id = ?`,
      [
        name,
        description,
        price,
        flavor || null,
        category || null,
        image || null,
        stock != null ? stock : 0,
        is_active != null ? !!is_active : true,
        id,
      ]
    );

    res.json({ message: 'Product updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating product' });
  }
});

// DELETE /api/products/:id - soft delete (admin only)
router.delete('/:id', authRequired, adminOnly, async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('UPDATE products SET is_active = FALSE WHERE id = ?', [id]);
    res.json({ message: 'Product deactivated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting product' });
  }
});

module.exports = router;
