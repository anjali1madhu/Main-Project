import React, { useState } from 'react';
import './WorkerDashboard.css';

const WorkerDashboard = () => {
  // Sample data for tasks and worker info
  const [workerName, setWorkerName] = useState('John Doe');
  const [tasks, setTasks] = useState([
    { id: 1, taskName: 'Task 1', status: 'In Progress' },
    { id: 2, taskName: 'Task 2', status: 'Pending' },
    { id: 3, taskName: 'Task 3', status: 'Completed' },
  ]);

  return (
    <div className="worker-dashboard">
      <header className="dashboard-header">
        <div className="worker-info">
          <img src="profile-pic.jpg" alt="Worker Profile" className="profile-img" />
          <h2>{workerName}</h2>
          <button className="logout-btn">Logout</button>
        </div>
      </header>

      <div className="dashboard-main">
        <aside className="sidebar">
          <ul>
            <li>Home</li>
            <li>Tasks</li>
            <li>Reports</li>
            <li>Profile Settings</li>
            <li>Notifications</li>
          </ul>
        </aside>

        <section className="task-list">
          <h3>Assigned Tasks</h3>
          <ul>
            {tasks.map(task => (
              <li key={task.id} className={`task ${task.status.toLowerCase()}`}>
                <h4>{task.taskName}</h4>
                <p>Status: {task.status}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <footer className="footer">
        <p>&copy; 2025 Green Capsule. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WorkerDashboard;
