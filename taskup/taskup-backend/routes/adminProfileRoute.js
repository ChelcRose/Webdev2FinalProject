const express = require('express');
const router = express.Router();
const db = require('../db');

router.put('/:adminId', async (req, res) => {
    const { adminId } = req.params;
    const { name, email, phone, password, confirmPassword, profileImage } = req.body;

    let connection;
    try {
        connection = await db.getConnection();
        const [result] = await connection.query(`
            UPDATE admin SET admin_name = ?, email = ?, phone = ?, password = ?, confirmPassword = ?, profileImage = ? WHERE admin_id = ?`,
            [name, email, phone, password, confirmPassword, profileImage, adminId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Admin not found' });
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