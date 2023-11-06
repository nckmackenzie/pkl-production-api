const express = require('express');
const {
  createTask,
  getIncompleteTasks,
  actionTask,
} = require('../controllers/tasks');
const router = express.Router();

router.post('/', createTask);
router.get('/by-status', getIncompleteTasks);
router.patch('/:taskId', actionTask);

module.exports = router;
