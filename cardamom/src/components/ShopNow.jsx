import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ShopNow.css';

const ShopNow = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Get userId for API requests

  // Fetch products from the server
  useEffect(() => {
    axios.get('http://localhost:5002/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const handleAddToCart = async (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    if (userId) {
      try {
        await axios.post('http://localhost:5002/api/cart', { userId, product });
      } catch (error) {
        console.error('Error adding item to the server:', error);
      }
    }

    alert(`${product.name} has been added to the cart!`);
    navigate('/cart');
  };

  const handleBuyNow = (product) => {
    navigate('/buynow', { state: { product } });
  };

  return (
    <div className="shop-now-container">
      <h2 className="shop-now-title">Our Premium Cardamom Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">₹{product.price}</p>
            <p className="product-weight">Weight: {product.weight}</p>
            <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
              Add to Cart 🛒
            </button>
            <button
              className="buy-now-btn"
              onClick={() => handleBuyNow(product)}
              style={{ backgroundColor: 'orange' }}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopNow;
