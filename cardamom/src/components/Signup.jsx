import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const AuthForm = ({ type }) => {
  const isLogin = type === "login";
  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    isLogin
      ? { email: "", password: "" }
      : { name: "", email: "", phone: "", password: "", confirmPassword: "" }
  );
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const url = isLogin ? "http://localhost:5002/auth/login" : "http://localhost:5002/auth/signup";
      const res = await axios.post(url, formData);

      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        navigate(res.data.user.role === "admin" ? "/admindashboard" : "/clientdashboard");
      } else {
        alert("Signup successful! You can now log in.");
        setFormData({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Request failed");
    }
  };

  return (
    <div>
      <Navbar/>
    
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>{isLogin ? "LOGIN" : "SIGNUP"}</h2>
        {error && <p style={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input name="name" style={styles.inputField} value={formData.name} onChange={handleChange} placeholder="Name" required />
          )}
          <input name="email" style={styles.inputField} value={formData.email} onChange={handleChange} placeholder="Email" required />
          {!isLogin && (
            <input name="phone" style={styles.inputField} value={formData.phone} onChange={handleChange} placeholder="Phone" required />
          )}
          <input name="password" type="password" style={styles.inputField} value={formData.password} onChange={handleChange} placeholder="Password" required />
          {!isLogin && (
            <input name="confirmPassword" type="password" style={styles.inputField} value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
          )}
          <button type="submit" style={styles.button}>{isLogin ? "Login" : "Signup"}</button>
        </form>
      </div>
    </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(to bottom, #F7F9F7, #A8D5BA)",
    fontFamily: "'Montserrat', sans-serif",
  },
  formContainer: {
    background: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    padding: "3rem 2.5rem",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
    transition: "transform 0.3s ease-in-out",
    animation: "fadeIn 0.6s ease-in-out",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#2A5934",
    textTransform: "uppercase",
    marginBottom: "1.5rem",
    letterSpacing: "1px",
  },
  inputField: {
    width: "100%",
    padding: "1rem",
    margin: "0.5rem 0",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    background: "rgba(178, 123, 123, 0.6)",
    outline: "none",
    transition: "all 0.3s ease",
    boxShadow: "inset 0 0 8px rgba(0, 0, 0, 0.1)",
  },
  button: {
    width: "100%",
    padding: "1rem",
    color: "#fff",
    background: "linear-gradient(135deg, #5A945A, #3A6B3A)",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    fontSize: "1.2rem",
    fontWeight: "bold",
    transition: "all 0.3s ease",
    boxShadow: "0 5px 15px rgba(90, 148, 90, 0.3)",
  },
  errorMessage: {
    color: "red",
    fontSize: "0.9rem",
    fontWeight: "bold",
    textAlign: "center",
  },
};

export default AuthForm;
