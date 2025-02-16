import React, { useState, useEffect } from 'react';
import './Admin.css'; // Custom CSS for Admin Dashboard

const Admin = () => {
  const [tasks, setTasks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch tasks, orders, and users data from your API or backend
    // This is just an example using mock data
    setTasks([
      { id: 1, name: 'Fertilizer Application', date: '2025-01-25', status: 'Pending' },
      { id: 2, name: 'Plucking', date: '2025-02-05', status: 'Completed' },
      // Add more tasks
    ]);
    setOrders([
      { id: 1, customer: 'John Doe', status: 'Pending', date: '2025-01-10' },
      { id: 2, customer: 'Jane Smith', status: 'Shipped', date: '2025-01-12' },
      // Add more orders
    ]);
    setUsers([
      { id: 1, name: 'Worker 1', role: 'Worker' },
      { id: 2, name: 'Worker 2', role: 'Worker' },
      // Add more users
    ]);
  }, []);

  const handleMarkTaskComplete = (taskId) => {
    // Handle task completion (API call or state update)
    setTasks(prevTasks => 
      prevTasks.map(task => task.id === taskId ? { ...task, status: 'Completed' } : task)
    );
  };

  const handleOrderStatusChange = (orderId, status) => {
    // Handle order status change (API call or state update)
    setOrders(prevOrders => 
      prevOrders.map(order => order.id === orderId ? { ...order, status } : order)
    );
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <ul>
          <li><a href="#task-management">Task Management</a></li>
          <li><a href="#order-management">Order Management</a></li>
          <li><a href="#user-management">User Management</a></li>
          <li><a href="#reports">Reports</a></li>
        </ul>
      </div>

      <div className="main-content">
        <h1>Admin Dashboard</h1>

        {/* Task Management */}
        <section id="task-management">
          <h2>Task Management</h2>
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id}>
                  <td>{task.name}</td>
                  <td>{task.date}</td>
                  <td>{task.status}</td>
                  <td>
                    {task.status === 'Pending' && (
                      <button onClick={() => handleMarkTaskComplete(task.id)}>
                        Mark as Complete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Order Management */}
        <section id="order-management">
          <h2>Order Management</h2>
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.customer}</td>
                  <td>{order.date}</td>
                  <td>{order.status}</td>
                  <td>
                    <button onClick={() => handleOrderStatusChange(order.id, 'Shipped')}>
                      Mark as Shipped
                    </button>
                    <button onClick={() => handleOrderStatusChange(order.id, 'Delivered')}>
                      Mark as Delivered
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* User Management */}
        <section id="user-management">
          <h2>User Management</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>
                    {/* Here you can add actions like promote, deactivate, etc. */}
                    <button>Promote</button>
                    <button>Deactivate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Reports */}
        <section id="reports">
          <h2>Reports</h2>
          {/* You can add report charts here */}
          <p>Graphs/Charts for task completion and sales reports can be added here.</p>
        </section>
      </div>
    </div>
  );
};

export default Admin;
