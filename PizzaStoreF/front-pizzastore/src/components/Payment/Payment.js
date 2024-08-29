import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    paymentMethod: 'credit_card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    amount: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const totalAmount = location.state?.totalAmount || '0';

    setPaymentDetails(prevDetails => ({
      ...prevDetails,
      amount: totalAmount
    }));
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentDetails(prevDetails => ({
      ...prevDetails,
      paymentMethod: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { paymentMethod, cardNumber, expiryDate, cvv, address } = paymentDetails;

    if (!paymentMethod || !address || (paymentMethod !== 'paypal' && (!cardNumber || !expiryDate || !cvv))) {
      setError('Please fill out all required fields.');
      return;
    }

    setSuccess('Payment processed successfully!');
    setError('');

    // After successful payment, navigate to My Orders
    setTimeout(() => {
      navigate('/myorders');
    }, 1000);
  };

  return (
    <div className="payment-container">
      <h1>Payment</h1>
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method:</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={paymentDetails.paymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <option value="credit_card">Credit Card</option>
            <option value="debit_card">Debit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        {(paymentDetails.paymentMethod === 'credit_card' || paymentDetails.paymentMethod === 'debit_card') && (
          <>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number:</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date:</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={paymentDetails.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
              />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV:</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={paymentDetails.cvv}
                onChange={handleChange}
                placeholder="123"
              />
            </div>
          </>
        )}

        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={paymentDetails.amount}
            placeholder="Amount in ₹"
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Delivery Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={paymentDetails.address}
            onChange={handleChange}
            placeholder="Enter delivery address"
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <button type="submit" className="payment-button">Pay Now</button>
      </form>
    </div>
  );
};

export default Payment;
