import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem('userId'); // Get userId from localStorage
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5002/api/cart?userId=${userId}`)
        .then(res => setCartItems(res.data))
        .catch(err => console.error('Error fetching cart items:', err));
    } else {
      setCartItems(JSON.parse(localStorage.getItem('cart')) || []);
    }
  }, [userId]);

  const handleRemoveFromCart = async (id) => {
    if (userId) {
      try {
        await axios.delete(`http://localhost:5002/api/cart/${id}`);
        setCartItems(cartItems.filter(item => item._id !== id));
      } catch (err) {
        console.error('Error removing item from cart:', err);
      }
    } else {
      const updatedCart = cartItems.filter(item => item._id !== id);
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const handleProceedToCheckout = (item) => {
    console.log("Redirecting to /buynow with item:", item); // Debugging log
    navigate('/buynow', { state: { product: item } }); // Pass the selected product
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          cartItems.map((item, index) => (
            <div className="cart-item" key={item._id || index}> {/* Ensuring unique key */}
              <div className="cart-item-info">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div>
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>
                  <p>Weight: {item.weight}</p>
                </div>
              </div>
              <button
                className="remove-item-btn"
                onClick={() => handleRemoveFromCart(item._id)}
              >
                Remove
              </button>
              <button 
                className="checkout-btn" 
                onClick={() => handleProceedToCheckout(item)} // Pass the item
              >
                Buy Now
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;
