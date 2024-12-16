const express = require('express');
const router = express.Router();
const db = require('../db');

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

        const [existingUser ] = await connection.query('SELECT * FROM user WHERE email = ? UNION SELECT * FROM admin WHERE email = ?', [email, email]);
        if (existingUser .length > 0) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        const isAdmin = email.endsWith('@taskup.com');

        if (isAdmin) {
            const [result] = await connection.query('INSERT INTO admin (email, password, admin_name) VALUES (?, ?, ?)', [email, password, name]);
            res.status(201).json({
                message: 'Admin successfully registered',
                user: {
                    id: result.insertId,
                    email: email,
                    name: name,
                    isAdmin: true
                }
            });
        } else {
            const [result] = await connection.query('INSERT INTO user (email, password, name) VALUES (?, ?, ?)', [email, password, name]);
            res.status(201).json({
                message: 'User successfully registered',
                user: {
                    id: result.insertId,
                    email: email,
                    name: name,
                    isAdmin: false
                }
            });
        }
    } catch (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    } finally {
        if (connection) connection.release();
    }
});

module.exports = router;