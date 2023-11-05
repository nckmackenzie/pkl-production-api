const express = require('express');
const { createJobcard, getJobCards } = require('../controllers/jobcards');
const router = express.Router();

router.get('/', getJobCards);
router.post('/', createJobcard);

module.exports = router;
