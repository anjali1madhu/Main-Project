import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    upiId: '',
    netBankingId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    const paymentData = {
      paymentMethod: selectedPaymentMethod,
      ...formData,
      amount: 100, // Example amount, modify as needed
    };

    try {
      const response = await fetch('http://localhost:5002/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });
      const result = await response.json();
      alert(result.message); // Show success message
    } catch (error) {
      console.error('Payment Error:', error);
      alert('Payment Failed! Please try again ');
    } finally {
      navigate('/home'); // Redirect to home in both success and failure cases
    }
  };

  return (
    <div className="payment-container">
      <h2>Choose Payment Method</h2>
      <p>Select your preferred payment method:</p>
      
      {/* Payment Method Options */}
      <div className="payment-methods">
        <button 
          className={`payment-method-btn ${selectedPaymentMethod === 'Credit Card' ? 'active' : ''}`} 
          onClick={() => setSelectedPaymentMethod('Credit Card')}
        >
          Credit/Debit Card
        </button>
        <button 
          className={`payment-method-btn ${selectedPaymentMethod === 'UPI' ? 'active' : ''}`} 
          onClick={() => setSelectedPaymentMethod('UPI')}
        >
          UPI
        </button>
        <button 
          className={`payment-method-btn ${selectedPaymentMethod === 'Net Banking' ? 'active' : ''}`} 
          onClick={() => setSelectedPaymentMethod('Net Banking')}
        >
          Net Banking
        </button>
      </div>

      {/* Form based on selected payment method */}
      {selectedPaymentMethod && (
        <form onSubmit={handlePayment} className="payment-form">
          {/* Credit/Debit Card Form */}
          {selectedPaymentMethod === 'Credit Card' && (
            <div className="form-group">
              <label htmlFor="cardName">Cardholder Name</label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
              <label htmlFor="cardNumber">Card Number (16 Digits)</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9876 5432"
                maxLength="19"
                required
              />
              <label htmlFor="expirationDate">Expiration Date</label>
              <input
                type="month"
                id="expirationDate"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleChange}
                required
              />
              <label htmlFor="cvv">CVV</label>
              <input
                type="password"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="123"
                maxLength="3"
                required
              />
            </div>
          )}

          {/* UPI Form */}
          {selectedPaymentMethod === 'UPI' && (
            <div className="form-group">
              <label htmlFor="upiId">Enter UPI ID</label>
              <input
                type="text"
                id="upiId"
                name="upiId"
                value={formData.upiId}
                onChange={handleChange}
                placeholder="example@upi"
                required
              />
            </div>
          )}

          {/* Net Banking Form */}
          {selectedPaymentMethod === 'Net Banking' && (
            <div className="form-group">
              <label htmlFor="netBankingId">Enter Net Banking ID</label>
              <input
                type="text"
                id="netBankingId"
                name="netBankingId"
                value={formData.netBankingId}
                onChange={handleChange}
                placeholder="Your Net Banking ID"
                required
              />
            </div>
          )}

          <button type="submit" className="pay-now-btn">Complete Payment</button>
        </form>
      )}
    </div>
  );
};

export default Payment;
