const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
});

module.exports = mongoose.model('Task', taskSchema);
