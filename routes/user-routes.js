const express = require('express');
const { createUser, login, getLoggedUser } = require('../controllers/users');
const router = express.Router();

router.post('/', createUser);
router.post('/login', login);
router.get('/me', getLoggedUser);

module.exports = router;
