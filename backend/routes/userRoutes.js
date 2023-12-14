const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getMe, getUsers} = require("../controllers/userController");
const {protect} = require('../middleware/authMiddleware')


router.get('/', getUsers);
router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

module.exports = router
