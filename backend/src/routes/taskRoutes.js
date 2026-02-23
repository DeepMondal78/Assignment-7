const express = require('express');
const router = express.Router();

const {
  featchAllTaks,
  getSingleByIdTask,
  deleteTask,
  markascompleteTask,
  createTask,
  updateTask,
 
} = require('../controllers/taskController');

// create task
router.post('/task', createTask);

// get all tasks
router.get('/task', featchAllTaks);



// get single task
router.get('/task/:id', getSingleByIdTask);

// delete task
router.delete('/task/:id', deleteTask);

// update task
router.put('/task/:id', updateTask);

// mark complete
router.patch('/task/:id/complete', markascompleteTask);

module.exports = router;