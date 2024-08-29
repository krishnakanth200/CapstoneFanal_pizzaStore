import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
    const { token } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        console.log('Token in NotificationProvider:', token); // Debug log to check token presence

        const fetchNotifications = async () => {
            if (!token) {
                console.error('No token found'); // Added error log for missing token
                return;
            }

            try {
                const response = await axios.get('http://localhost:5002/api/notifications/mynotifications', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log('Notifications fetched:', response.data); // Log the fetched notifications
                setNotifications(response.data);
                setUnreadCount(response.data.filter(notification => !notification.read).length);
            } catch (error) {
                console.error('Failed to fetch notifications:', error.response ? error.response.data : error.message);
            }
        };

        fetchNotifications();
    }, [token]);

    const markAsRead = async (notificationId) => {
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            await axios.put(`http://localhost:5002/api/notifications/${notificationId}/read`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotifications(notifications.map(notification =>
                notification._id === notificationId ? { ...notification, read: true } : notification
            ));
            setUnreadCount(unreadCount - 1);
        } catch (error) {
            console.error('Failed to mark notification as read:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead }}>
            {children}
        </NotificationContext.Provider>
    );
};

const useNotificationContext = () => useContext(NotificationContext);

export { NotificationContext, NotificationProvider, useNotificationContext };
