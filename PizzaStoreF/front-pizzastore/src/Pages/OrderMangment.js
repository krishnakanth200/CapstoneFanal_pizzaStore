import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style/OrderManagement.css';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5002/api/orders', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, status) => {
        try {
            await axios.put(`http://localhost:5002/api/orders/${orderId}/status`, null, {
                params: { status },
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setOrders(orders.map(order =>
                order._id === orderId ? { ...order, status } : order
            ));
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    return (
        <div className="order-management">
            <h1>Order Management</h1>
            <div className="status-filter">
                <select onChange={e => setStatusFilter(e.target.value)}>
                    <option value="">All Orders</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>
            <div className="order-list">
                {orders.filter(order => !statusFilter || order.status === statusFilter).map(order => (
                    <div className="order-card" key={order._id}>
                        <h3>Order ID: {order._id}</h3>
                        <p>Status: {order.status}</p>
                        <p>Total Amount: ₹{order.totalAmount}</p>
                        <button onClick={() => handleStatusChange(order._id, 'accepted')}>Accept</button>
                        <button onClick={() => handleStatusChange(order._id, 'rejected')}>Reject</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderManagement;
