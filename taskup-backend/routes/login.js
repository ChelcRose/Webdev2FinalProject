const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];

        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isAdmin = email.endsWith('@taskup.com');

        res.json({
            message: 'Login successful',
            user: {
                user_id: user.user_id,
                email: user.email,
                isAdmin: isAdmin
            }
        });
    });
});

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err, results) => {
            if (err) {
                console.error('Database insert error:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            res.status(201).json({ message: 'User  registered successfully' });
        });
    });
});

module.exports = router;