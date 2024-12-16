const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    let connection;
    try {
        connection = await db.getConnection();
        const [rows] = await connection.query('SELECT name, email, phone, profileImage FROM user WHERE user_id = ?', [req.user.id]); 
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User  not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    } finally {
        if (connection) connection.release();
    }
});

router.put('/:userId', async (req, res) => {
    const { userId } = req.params;
    const { name, email, phone, password, profileImage } = req.body;

    let connection;
    try {
        connection = await db.getConnection();
        
        const queryParams = [name, email, phone, profileImage, userId];
        let query = `
            UPDATE user SET name = ?, email = ?, phone = ?, profileImage = ? WHERE user_id = ?`;

        if (password) {
            query = `
                UPDATE user SET name = ?, email = ?, phone = ?, password = ?, profileImage = ? WHERE user_id = ?`;
            queryParams.splice(3, 0, password);
        }

        const [result] = await connection.query(query, queryParams);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User  not found' });
        }

        res.json({ message: 'Profile updated successfully' });
    } catch (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    } finally {
        if (connection) connection.release();
    }
});

module.exports = router;