import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css'; // External CSS for better separation

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("userId"); // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem("userId"); // Remove userId from localStorage to log out
    navigate("/home"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="logo">GreenCapsule</Link>
      </div>
      <ul className="navbar-links">
        {["Home", "About", "Contact" ].map((item) => (
          <li key={item}>
            <Link to={`/${item.toLowerCase()}`} className="navbar-link">
              {item}
            </Link>
          </li>
        ))}
        {!isAuthenticated ? (
          <>
            <li>
              <Link to="/login" className="navbar-link">Login</Link>
            </li>
            <li>
              <Link to="/signup" className="navbar-link">Signup</Link>
            </li>
          </>
        ) : (
          <li>
            <button onClick={handleLogout} className="navbar-link" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
