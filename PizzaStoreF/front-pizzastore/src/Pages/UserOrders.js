import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style/UserOrders.css';

const UserOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5002/api/orders/myorders', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching user orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="user-orders">
            <h1>Your Orders</h1>
            <div className="order-list">
                {orders.map(order => (
                    <div className="order-card" key={order._id}>
                        <h3>Order ID: {order._id}</h3>
                        <p>Status: {order.status}</p>
                        <p>Total Amount: ₹{order.totalAmount}</p>
                        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserOrders;
 