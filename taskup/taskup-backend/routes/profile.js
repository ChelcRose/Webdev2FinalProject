const express = require('express');
const router = express.Router();
const db = require('../db');

// Middleware for input validation
const validateInput = (req, res, next) => {
    const { user_id, admin_id, name, email, password } = req.body;
    if (!name || !email || (!user_id && !admin_id) || !password) {
        return res.status(400).json({ message: 'Name, email, password, and either User ID or Admin ID are required' });
    }
    next();
};

router.put('/updateProfile', validateInput, async (req, res) => {
    const { user_id, admin_id, name, email, password } = req.body;

    let connection;
    try {
        connection = await db.getConnection();

        if (admin_id) {
            const [results] = await connection.query('UPDATE admin SET name = ?, email = ?, password = ? WHERE admin_id = ?',
                [name, email, password, admin_id]);
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Admin not found' });
            }
            res.json({ message: 'Admin profile updated successfully' });
        } else if (user_id) {
            const [results] = await connection.query('UPDATE user SET name = ?, email = ?, password = ? WHERE user_id = ?',
                [name, email, password, user_id]);
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'User  not found' });
            }
            res.json({ message: 'User  profile updated successfully' });
        } else {
            return res.status(400).json({ message: 'User  ID or Admin ID is required' });
        }
    } catch (err) {
        console.error('Database update error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    } finally {
        if (connection) connection.release();
    }
});

module.exports = router;