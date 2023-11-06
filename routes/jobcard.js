const express = require('express');
const {
  createJobcard,
  getJobCards,
  getOpenJobCards,
  createTask,
} = require('../controllers/jobcards');
const router = express.Router();

router.get('/', getJobCards);
router.post('/', createJobcard);
router.get('/open', getOpenJobCards);
// router.post('/:jobcard/task', createTask);

module.exports = router;
