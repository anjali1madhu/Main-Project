import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import Cart from "./Cart";
import MyProfile from "./MyProfile"; 
import "./ClientDashboard.css";

const ClientDashboard = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null); // Initialize user state
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart items from localStorage on component mount
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  
    // Fetch user details from localStorage safely
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser); // Set the user only if parsing is successful
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${product.name} has been added to the cart!`);
    navigate("/cart"); 
  };

  const handleLogout = () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("user"); // Clear user data on logout
    setUser(null); // Reset user state
    navigate("/home"); 
  };

  const products = [
    { id: 1, name: "6MM", price: 500, image: "img5.jpg" },
    { id: 2, name: "7MM", price: 750, image: "img6.jpg" },
    { id: 3, name: "8MM", price: 1200, image: "img7.jpg" },
    { id: 4, name: "Combo", price: 3000, image: "combo.webp"},
  ];

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Client Dashboard</h2>
        <ul>
          <li className="active">Dashboard</li>
          <li>
            <Link to="/cart">Cart ({cart.length})</Link>
          </li>
          <li>
            <Link to="/shop">Explore Products</Link>
          </li>
          <li> 
            <Link to="/order">My Orders</Link>
            </li>
          <li>
            <Link to="/myprofile">My Profile</Link>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </li>
        </ul>
      </div>
     
     
      <div className="main-content">
        <header>
          <div>
          <h1>Welcome, {user?.name ||"Client"}</h1>
          <p>Your one-stop shop for premium products!</p>
          </div>
        </header>

        <section className="featured-products">
          <h2>Most Popular Products</h2>
          <div className="product-list">
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <h3>{product.name}</h3>
                <p>₹{product.price}</p>
                <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                  Add to Cart 🛒
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="cta-container">
          <Link to="/shop" className="shop-now-btn">Shop Now</Link>
        </div>

        <Routes>
          <Route path="/cart" element={<Cart cart={cart} />} />
          <Route path="/shop" element={<div className="shop-page">Welcome to the Shop Now Page!</div>} />
          <Route path="/myprofile" element={<MyProfile />} />
        </Routes>
      </div>
    </div>
  );
};

export default ClientDashboard;
