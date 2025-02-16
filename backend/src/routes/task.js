const express = require('express');
const router = express.Router();
const { addTask, getAllTasks, updateTask, deleteTask } = require('../controllers/taskController');

// Add a new task
router.post('/add', addTask);

// Get all tasks
router.get('/', getAllTasks);

// Update a task
router.put('/:id', updateTask);

// Delete a task
router.delete('/:id', deleteTask);

module.exports = router;
