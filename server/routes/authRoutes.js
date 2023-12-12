const express = require('express');
const authController = require('../controllers/authController');
const authenticationMiddleware = require('../middleware/authenticationMiddleware');

const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/logout', authenticationMiddleware.authenticateToken, authController.logout);

router.get('/profile', authenticationMiddleware.authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
