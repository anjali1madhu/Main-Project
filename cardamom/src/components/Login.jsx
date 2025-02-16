import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar"; // Importing the Navbar component

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5002/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate(res.data.user.role === "admin" ? "/admindashboard" : "/clientdashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <h2 style={styles.title}>LOGIN</h2>
          {error && <p style={styles.errorMessage}>{error}</p>}
          <form onSubmit={handleLogin}>
            <input 
              style={styles.inputField} 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Email" 
              required 
            />
            <input 
              type="password" 
              style={styles.inputField} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password" 
              required 
            />
            <button type="submit" style={styles.button}>Login</button>
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
    margin: 0,
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
    boxSizing: "border-box",
    background: "rgba(172, 124, 124, 0.6)",
    backdropFilter: "blur(8px)",
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
    marginTop: "-0.5rem",
    fontWeight: "bold",
    textAlign: "center",
  },
};

export default Login;
