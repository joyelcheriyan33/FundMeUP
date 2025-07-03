const express = require('express');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/dashboard', protect, (req, res) => {
  res.json({ message: 'This is protected data', user: req.user });
});

module.exports = router;
