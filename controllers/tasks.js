const { QueryTypes } = require('sequelize');

const Jobcardtask = require('../models/jobcardTask');
const Jobcardtaskuser = require('../models/jobcardTaskUser');
const Jobcardtasktime = require('../models/jobcardTaskTime');

const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catch-async');
const db = require('../utils/database');
const { getTasksByStatus } = require('../models/raw_queries/jobcards');

const createTask = catchAsync(async (req, res, next) => {
  //   const { jobcard } = req.params;
  //   if (!jobcard) return next(new AppError('Jobcard not provided', 400));

  const { jobcard_id, department_id, started, remarks, staffs } = req.body;

  if (!department_id || !started || !staffs)
    return next(new AppError('Provide all required fields', 400));

  try {
    await db.transaction(async t => {
      const task = await Jobcardtask.create(
        {
          jobcard_id,
          department_id,
          started,
          comment:
            remarks && remarks.toString().trim().length > 0
              ? remarks.toLowerCase()
              : null,
        },
        { transaction: t }
      );

      staffs.forEach(async staff => {
        await Jobcardtaskuser.create(
          {
            task_id: task.id,
            staff_id: staff,
          },
          { transaction: t }
        );
      });

      await Jobcardtasktime.create(
        {
          task_id: task.id,
          paused_on: started,
          resumed_on: started,
          is_start: true,
        },
        { transaction: t }
      );

      return task;
    });

    res.status(201).json({ status: 'success' });
  } catch (error) {
    throw new AppError('Task not saved!', 500);
  }
});

const getIncompleteTasks = catchAsync(async (req, res, next) => {
  const { status, department } = req.query;
  if (!status) return next(new AppError('Status not provided', 400));
  let sql = getTasksByStatus();

  if (!department) {
    sql += `ORDER BY t.created_at DESC`;
  } else {
    sql += `AND t.department_id = ?`;
  }

  const tasks = await db.query(sql, {
    replacements: !department ? [status] : [status, department],
    type: QueryTypes.SELECT,
  });

  res.status(200).json({ status: 'success', data: tasks });
});

const actionTask = catchAsync(async (req, res, next) => {
  // get task
  const { taskId } = req.params;
  if (!taskId) return next(new AppError('Task not provided'));

  const { actionType, transactionDate, remarks } = req.body;
  const updatedRemarks =
    remarks && remarks.toString().trim().length > 0
      ? remarks.toString().trim().toLowerCase()
      : null;

  //update task based on status
  if (actionType === 'complete') {
    await Jobcardtask.update(
      {
        completed: true,
        completed_on: transactionDate,
        status: 'completed',
        comment: updatedRemarks,
      },
      { where: { id: taskId } }
    );
    res.status(200).json({ status: 'success' });
  }

  if (actionType === 'pause') {
    const updatedTask = await Jobcardtask.update(
      { status: 'paused' },
      { where: { id: taskId } }
    );

    if (updatedTask) {
      await Jobcardtasktime.create({
        task_id: taskId,
        paused_on: transactionDate,
        remarks: updatedRemarks,
      });
    }
    res.status(200).json({ status: 'success' });
  }

  if (actionType === 'resume') {
    await Jobcardtask.update({ status: 'ongoing' }, { where: { id: taskId } });

    //find Task
    const foundTask = await Jobcardtasktime.findOne({
      where: { task_id: taskId, resumed_on: null },
    });

    if (foundTask) {
      await Jobcardtasktime.update(
        {
          resumed_on: transactionDate,
          remarks: updatedRemarks,
        },
        { where: { task_id: taskId, resumed_on: null } }
      );
    }
    res.status(200).json({ status: 'success' });
  }
});

module.exports = { createTask, getIncompleteTasks, actionTask };
