// Importing constants
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

// Management of login routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Module export
module.exports = router;