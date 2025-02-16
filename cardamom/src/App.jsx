import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Aboutus from "./components/Aboutus";
import AdminDashboard from "./components/AdminDashboard";
import ContactUs from "./components/Contactus";
import Navbar from "./components/Navbar"; // Import Navbar component
import ShopNow from "./components/ShopNow"; // Import your ShopNow component
import ClientDashboard from "./components/ClientDashboard";
import Cart from "./components/Cart";
import MyProfile from "./components/MyProfile";
import BuyNow from "./components/BuyNow";
import Payment from "./components/Payment";
import ProductList from "./components/ProductList";
import MyOrders from "./components/Myorders";

const App = () => {
  return (
    <Router>
      {/* <Navbar />  */}
      <Routes>
        {/* Home Page */}
        <Route path="/home" element={<Home />} />

        {/* Authentication Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* About Us Page */}
        <Route path="/about" element={<Aboutus />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* Dashboards */}
        <Route path="/admindashboard" element={<AdminDashboard />} />
      
        <Route path="/clientdashboard" element={<ClientDashboard/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/myprofile" element={<MyProfile/>} />
        <Route path="/buynow" element={<BuyNow/>} />
        <Route path="/payment" element={<Payment/>} />
        <Route path="/products" element={<ProductList/>} />
        <Route path="/order" element={<MyOrders/>} />

        
        <Route path="/shop" element={<ShopNow />} /> {/* Add the route for Shop Now */}
        
      </Routes>
    </Router>
    
  );
};

export default App;
