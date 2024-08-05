const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const { authenticateToken }= require('../middleware/authMiddleware')

router.get('/', authenticateToken, userController.validateToken)
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;