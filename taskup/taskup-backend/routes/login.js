const express = require('express');
const router = express.Router();
const db = require('../db');

const validateInput = (req, res, next) => {
    const { email, password, name } = req.body;
    if (!email || !password || (req.path === '/signup' && !name)) {
        return res.status(400).json({ message: 'Email, password, and name are required' });
    }
    next();
};

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    let connection;
    try {
        connection = await db.getConnection();
        const [results] = await connection.query('SELECT * FROM user WHERE email = ? UNION SELECT * FROM admin WHERE email = ?', [email, email]);

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];

        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isAdmin = user.email.endsWith('@taskup.com');

        res.json({
            message: 'Login successful',
            user: {
                id: isAdmin ? user.admin_id : user.user_id,
                email: user.email,
                isAdmin: isAdmin
            }
        });
    } catch (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    } finally {
        if (connection) connection.release();
    }
});

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const isAdmin = email.endsWith('@taskup.com');

    try {
        const connection = await db.getConnection();

        const [existingUser] = await connection.query('SELECT * FROM user WHERE email = ? UNION SELECT * FROM admin WHERE email = ?', [email, email]);

        if (existingUser.length > 0) {
            connection.release();
            return res.status(409).json({ message: 'Email already in use' });
        }

        if (isAdmin) {
            await connection.query('INSERT INTO admin (name, email, password) VALUES (?, ?, ?)',
                [name, email, password]);
            res.status(201).json({ message: 'Admin registered successfully' });
        } else {
            await connection.query('INSERT INTO user (name, email, password) VALUES (?, ?, ?)',
                [name, email, password]);
            res.status(201).json({ message: 'User  registered successfully' });
        }

        connection.release();
    } catch (err) {
        console.error('Signup error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;