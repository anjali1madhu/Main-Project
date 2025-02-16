import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyOrders.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId"); // Get user ID from localStorage

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/api/orders/${userId}`)
        .then((response) => setOrders(response.data))
        .catch((error) => console.error("Error fetching orders:", error));
    }
  }, [userId]);

  return (
    <div className="orders-container">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  {order.items.map((item) => (
                    <p key={item.productId}>{item.name}</p>
                  ))}
                </td>
                <td>
                  {order.items.map((item) => (
                    <p key={item.productId}>{item.quantity}</p>
                  ))}
                </td>
                <td>₹{order.totalAmount}</td>
                <td className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyOrders;
