const express = require('express');
const router = express.Router();
const db = require('../db');

// Middleware to validate input
const validateInput = (req, res, next) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({ message: 'Email, password, and name are required' });
    }
    next();
};

router.post('/', validateInput, async (req, res) => {
    const { email, password, name } = req.body;

    let connection;
    try {
        connection = await db.getConnection();

        const [existingUser ] = await connection.query('SELECT * FROM user WHERE email = ?', [email]);
        if (existingUser .length > 0) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        const [result] = await connection.query('INSERT INTO user (email, password, name) VALUES (?, ?, ?)', [email, password, name]);

        res.status(201).json({
            message: 'User  registered successfully',
            user: {
                id: result.insertId,
                email: email,
                name: name
            }
        });
    } catch (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    } finally {
        if (connection) connection.release();
    }
});

module.exports = router;