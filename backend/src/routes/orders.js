const express = require('express');
const router = express.Router();
const pool = require('../db');
const { authRequired } = require('../middlewares/auth');

// POST /api/orders - create order (customer)
router.post('/', authRequired, async (req, res) => {
  const { items, shippingName, shippingAddress, shippingCity, shippingZip } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Order items are required' });
  }

  if (!shippingName || !shippingAddress || !shippingCity || !shippingZip) {
    return res.status(400).json({ message: 'Shipping data is required' });
  }

  try {
    // Calculate total based on DB prices (more seguro)
    const productIds = items.map((i) => i.id);
    const [rows] = await pool.query(
      `SELECT id, price FROM products WHERE id IN (${productIds.map(() => '?').join(',')})`,
      productIds
    );

    const priceMap = new Map(rows.map((r) => [r.id, Number(r.price)]));

    let total = 0;
    const orderItems = items.map((item) => {
      const unitPrice = priceMap.get(item.id);
      if (unitPrice == null) {
        throw new Error(`Product not found: ${item.id}`);
      }
      const subtotal = unitPrice * item.quantity;
      total += subtotal;
      return {
        productId: item.id,
        quantity: item.quantity,
        unitPrice,
        subtotal,
      };
    });

    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      const [orderResult] = await conn.query(
        `INSERT INTO orders 
         (user_id, total_amount, status, shipping_name, shipping_address, shipping_city, shipping_zip)
         VALUES (?, ?, 'Pending Payment', ?, ?, ?, ?)`,
        [
          req.user.id,
          total,
          shippingName,
          shippingAddress,
          shippingCity,
          shippingZip,
        ]
      );

      const orderId = orderResult.insertId;

      for (const oi of orderItems) {
        await conn.query(
          `INSERT INTO order_items 
           (order_id, product_id, quantity, unit_price, subtotal)
           VALUES (?, ?, ?, ?, ?)`,
          [orderId, oi.productId, oi.quantity, oi.unitPrice, oi.subtotal]
        );
      }

      await conn.commit();

      res.status(201).json({ orderId, totalAmount: total });
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating order' });
  }
});

module.exports = router;
