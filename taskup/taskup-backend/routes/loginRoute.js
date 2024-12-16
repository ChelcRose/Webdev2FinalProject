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

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    let connection;
    try {
        connection = await db.getConnection();
        const [results] = await connection.query(`
            SELECT user_id AS id, email, password, name FROM user WHERE email = ?
            UNION 
            SELECT admin_id AS id, email, password, admin_name AS name FROM admin WHERE email = ?`, 
            [email, email]
        );

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
                id: isAdmin ? user.id : user.id,
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

module.exports = router;