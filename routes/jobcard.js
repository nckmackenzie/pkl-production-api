const express = require('express');
const { createJobcard } = require('../controllers/jobcards');
const router = express.Router();

router.post('/', createJobcard);

module.exports = router;
