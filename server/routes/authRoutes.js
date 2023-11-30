// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const authenticationMiddleware = require('../middleware/authenticationMiddleware');

const router = express.Router();

// Rute registrasi
router.post('/register', authController.register);

// Rute login
router.post('/login', authController.login);

// Rute contoh yang memerlukan otentikasi
router.get('/profile', authenticationMiddleware.authenticateToken, (req, res) => {
  // Handler untuk rute profile
  // ...
  res.json({ user: req.user });
});

module.exports = router;
