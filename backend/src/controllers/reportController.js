const Task = require("../models/taskModel");

async function generateDailyReport(req, res) {
  try {
    const today = new Date().toISOString().split("T")[0];
    const completedTasks = await Task.find({ status: "Completed", date: today });
    const pendingTasks = await Task.find({ status: "Pending" });

    res.status(200).json({
      date: today,
      completedTasks,
      pendingTasks,
    });
  } catch (error) {
    res.status(500).json({ message: "Error generating report", error });
  }
}

module.exports = { generateDailyReport };
