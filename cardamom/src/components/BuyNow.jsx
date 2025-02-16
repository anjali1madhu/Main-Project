import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BuyNow.css';

const BuyNow = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(state?.product || {});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!state?.product) {
      navigate('/shop'); // Redirect to shop if no product details
    }
  }, [state, navigate]);

  const handlePurchase = () => {
    setLoading(true);
    try {
      console.log('Product purchased:', product);
      setTimeout(() => {
        navigate('/payment');
      }, 1000);
    } catch (error) {
      console.error('Error during purchase:', error);
      setError('An error occurred while processing your purchase.');
    } finally {
      setLoading(false);
    }
  };

  const handleExploreMore = () => {
    navigate('/shop');
  };

  return (
    <div className="buy-now-container">
      <h2>Buy Now</h2>
      {product.name ? (
        <div className="product-details">
          <img src={product.image} alt={product.name} className="product-image" />
          <h3>{product.name}</h3>
          <p>Weight: {product.weight}</p>
          <p className="product-price">₹{product.price}</p>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}

      <div className="button-group">
        <button 
          className="purchase-btn" 
          onClick={handlePurchase} 
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Complete Purchase'}
        </button>
        <button className="explore-more-btn" onClick={handleExploreMore}>
          Explore More
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default BuyNow;
