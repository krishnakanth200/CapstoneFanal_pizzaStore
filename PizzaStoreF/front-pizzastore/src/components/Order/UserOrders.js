import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Orders.css'; // Ensure this CSS file is available

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5002/api/orders', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setOrders(response.data.orders); // Adjust based on your API response structure
        setLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders. Please try again later.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h1>My Orders</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && orders.length === 0 && <p>No orders found.</p>}
      <ul className="orders-list">
        {orders.map(order => (
          <li key={order._id} className="order-item">
            <h2>Order ID: {order._id}</h2>
            <p>Total Amount: ₹{order.totalAmount}</p>
            <p>Delivery Address: {order.address}</p>
            <p>Status: {order.status}</p>
            <p>Items:</p>
            <ul>
              {order.items.map(item => (
                <li key={item.product._id}>
                  {item.product.name} (x{item.quantity})
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
