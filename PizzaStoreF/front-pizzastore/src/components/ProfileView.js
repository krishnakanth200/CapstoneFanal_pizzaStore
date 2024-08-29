import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        role: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const { data } = await axios.get(`http://localhost:5002/api/users/profile/${userId}`, config);
                setProfile(data);
            } catch (error) {
                setError('Failed to load profile');
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios.put('http://localhost:5002/api/users/profile', profile, config);
            setMessage('Profile updated successfully');
        } catch (error) {
            setError('Failed to update profile');
        }
    };

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            {message && <p className="message">{message}</p>}
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        required
                        disabled // Optional: Disable email if you don't want it to be editable
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <input
                        type="text"
                        id="role"
                        name="role"
                        value={profile.role}
                        onChange={handleChange}
                        disabled // Role should not be editable by the user
                    />
                </div>
                <button type="submit" className="btn-submit">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;
