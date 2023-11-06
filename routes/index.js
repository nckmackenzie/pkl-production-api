const express = require('express');
const { getDepartments, getStaff } = require('../controllers/extras');
const router = express.Router();

router.get('/departments', getDepartments);
router.get('/staffs/:deptId', getStaff);

module.exports = router;
