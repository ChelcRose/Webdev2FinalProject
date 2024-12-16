const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/user', async (req, res) => {
  const userId = req.user.id; 
  try {
    const [user] = await db.query('SELECT * FROM user WHERE user_id = ?', [userId]);
    if (user.length === 0) {
      return res.status(404).json({ message: 'User  not found' });
    }
    res.json(user[0]);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/updateProfile', async (req, res) => {
  const { user_id, name, username, email, phone, profileImage } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE user SET name = ?, username = ?, email = ?, phone = ?, profileImage = ? WHERE user_id = ?`,
      [name, username, email, phone, profileImage, user_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User  not found' });
    }

    res.json({ message: 'User  profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;