import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',

    
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('address')) {
            const addressField = name.split('.')[1];
            setFormData((prevData) => ({
                ...prevData,
                address: {
                    ...prevData.address,
                    [addressField]: value,
                },
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const validateForm = () => {
        let valid = true;
        let errors = {};

        if (!formData.username) {
            errors.username = 'Username is required';
            valid = false;
        }
        if (!formData.email) {
            errors.email = 'Email is required';
            valid = false;
        }
        if (!formData.password) {
            errors.password = 'Password is required';
            valid = false;
        }


        setErrors(errors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            await axios.post('http://localhost:5002/api/users/register', formData);
            setSuccessMessage('Registration successful!');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            console.error(error);
            setErrors({ server: 'Registration failed, please try again.' });
        }
    };

    return (
        <div className="container">
            <h1>Register Form</h1>
            <form onSubmit={handleSubmit}>
                {successMessage && <div className="success">{successMessage}</div>}
                
                <div className="section">
                    <h2>User Details</h2>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {errors.username && <div className="error">{errors.username}</div>}
                    
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <div className="error">{errors.email}</div>}
                    
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <div className="error">{errors.password}</div>}
                    

                </div>
                
                <div className="button-container">
                    <button type="submit">Register</button>
                </div>
                {errors.server && <div className="error">{errors.server}</div>}
            </form>
        </div>
    );
}

export default Register;
