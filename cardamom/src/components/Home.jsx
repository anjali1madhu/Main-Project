import React from "react";
import "./Home.css";
import {
  FaCartPlus,
  FaLeaf,
  FaAward,
  FaShippingFast,
  FaHandsHelping,
  FaUsers,
  FaLock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Import the Navbar component

const Home = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    const isAuthenticated = localStorage.getItem("userToken"); // Check if user is logged in
    if (isAuthenticated) {
      navigate("/shop");
    } else {
      navigate("/login", { state: { from: "/shop" } }); // Redirect to login first
    }
  };

  const products = [
    {
      id: 1,
      image: "public/img5.jpg",
      label: "Best Seller",
      title: "8MM Cardamom",
    },
    {
      id: 2,
      image: "public/img7.jpg",
      label: "New Arrival",
      title: "7MM Cardamom",
    },
    {
      id: 3,
      image: "public/img4.jpg",
      label: "Limited Stock",
      title: "6MM Cardamom",
    },
    {
      id: 4,
      image: "public/img8.jpg",
      label: "On Sale",
      title: "Organic Cardamom",
    },
    {
      id: 5,
      image: "public/img9.jpg",
      label: "Featured",
      title: "Premium Cardamom",
    },
  ];

  return (
    <div className="home-container">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Discover the Finest Cardamom</h1>
          <p className="hero-description">
            Premium handpicked cardamom to elevate your culinary and health
            journey. Experience nature's best!
          </p>
          <button className="shop-now-btn" onClick={handleShopNow}>
            Shop Now <FaCartPlus style={{ marginLeft: "10px" }} />
          </button>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <h2>Our Premium Range</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <span className="product-label">{product.label}</span>
              <img src={product.image} alt={product.title} />
              <p>{product.title}</p>
              <button className="product-btn" onClick={handleShopNow}>
                Shop Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>Why Choose Us?</h2>
        <p>
          We offer high-quality, sustainably sourced cardamom, delivering
          unmatched freshness and taste. Here's why we stand out:
        </p>
        <div className="about-icons">
          <div className="about-icon">
            <FaLeaf />
            <p>Eco-Friendly</p>
          </div>
          <div className="about-icon">
            <FaAward />
            <p>Premium Quality</p>
          </div>
          <div className="about-icon">
            <FaShippingFast />
            <p>Fast Delivery</p>
          </div>
          <div className="about-icon">
            <FaHandsHelping />
            <p>Community Focused</p>
          </div>
          <div className="about-icon">
            <FaUsers />
            <p>Customer-Centric</p>
          </div>
          <div className="about-icon">
            <FaLock />
            <p>Secure Shopping</p>
          </div>
        </div>
        <div className="about-details">
          <h3>Our Commitments:</h3>
          <ul>
            <li>
              <strong>Unmatched Freshness:</strong> We ensure every cardamom pod
              is fresh and packed with flavor.
            </li>
            <li>
              <strong>Ethical Sourcing:</strong> We support sustainable farming
              practices and work closely with farmers.
            </li>
            <li>
              <strong>Affordable Pricing:</strong> Enjoy premium cardamom at
              reasonable prices without compromising quality.
            </li>
            <li>
              <strong>Reliable Customer Service:</strong> Our team is always
              ready to assist with any inquiries or issues.
            </li>
            <li>
              <strong>Global Shipping:</strong> No matter where you are, we
              deliver your order quickly and safely to your doorstep.
            </li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 GreenCapsule. All rights reserved.</p>
        <div className="social-icons">
          <a href="#!" aria-label="Shop">
            <FaCartPlus />
          </a>
          <a href="#!" aria-label="Eco-Friendly">
            <FaLeaf />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
