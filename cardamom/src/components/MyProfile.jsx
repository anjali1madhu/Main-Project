import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./MyProfile.css";

const MyProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user")) || null;
    if (savedUser) {
      setUser(savedUser);
    } else {
      navigate("/login"); // Redirect to login if no user is found
    }
  }, [navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/"); // Redirect to home after logout
  };

  return (
    <div className="profile-container">
      <div className="sidebar">
        <h2>My Profile</h2>
        <ul>
          <li>
            <Link to="/clientdashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/order">My Orders</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </li>
        </ul>
      </div>

      <div className="profile-content">
        <header>
          <h1>Welcome, {user.name || "User"}</h1>
          <p>Manage your personal details and settings here.</p>
        </header>

        <div className="profile-details">
          <div className="profile-row">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profile-row">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profile-row">
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="profile-actions">
            {!isEditing ? (
              <button onClick={handleEdit} className="edit-btn">
                Edit Profile
              </button>
            ) : (
              <button onClick={handleSave} className="save-btn">
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
