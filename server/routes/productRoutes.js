const express = require('express');
const pool = require('../database');
const router = express.Router();

// Create a Product
router.post('/', async (req, res) => {
    const { name, description, price, stock } = req.body;

    try {
        const newProduct = await pool.query(
            'INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, description, price, stock]
        );
        res.status(201).json(newProduct.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get All Products
router.get('/', async (req, res) => {
    try {
        const products = await pool.query('SELECT * FROM products');
        res.status(200).json(products.rows);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get Product by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        if (product.rows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Update Product
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;

    try {
        const updatedProduct = await pool.query(
            'UPDATE products SET name = $1, description = $2, price = $3, stock = $4 WHERE id = $5 RETURNING *',
            [name, description, price, stock, id]
        );

        if (updatedProduct.rows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(updatedProduct.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Delete Product
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

        if (deletedProduct.rows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
