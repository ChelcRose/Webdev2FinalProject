const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

router.post('/', (req, res) => {
    res.send('User added successfully!');
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];

        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.json({ message: 'Login successful', user: { id: user.id, email: user.email } });
    });
});

router.get('/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ id: userId, name: `User ${userId}` });
});


module.exports = router;