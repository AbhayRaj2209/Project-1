// src/AuthPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css'; // Make sure you copy this CSS file into your src folder

// --- THIS IS THE FIX ---
// Tell axios that all requests should go to your backend server
axios.defaults.baseURL = 'http://localhost:5000';
// --------------------

function AuthPage() {
    // State to toggle between Login and Signup views
    const [isLoginView, setIsLoginView] = useState(true);

    // Form state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Messaging state
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    // Function to clear form fields and messages
    const clearState = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setMessage('');
        setIsError(false);
    };

    // --- Signup Handler ---
    const handleSignup = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        if (password !== confirmPassword) {
            setIsError(true);
            setMessage('Passwords do not match.');
            return;
        }

        try {
            // The request will now correctly go to http://localhost:5000/api/signup
            const response = await axios.post('/api/signup', { email, password });
            setIsError(false);
            setMessage(response.data.message);
            setIsLoginView(true);
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            setIsError(true);
            setMessage(error.response?.data?.message || 'Signup failed.');
        }
    };

    // --- Login Handler ---
    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);
        try {
            // The request will now correctly go to http://localhost:5000/api/login
            const response = await axios.post('/api/login', { email, password });
            localStorage.setItem('token', response.data.token);
            window.location.href = '/getting-started'; 
        } catch (error) {
            setIsError(true);
            setMessage(error.response?.data?.message || 'Login failed.');
        }
    };

    const formToSubmit = isLoginView ? handleLogin : handleSignup;

    const toggleView = () => {
        setIsLoginView(!isLoginView);
        clearState();
    };

    return (
        <div className="login-page-container">
            <div className="info-panel">
                <div className="info-content">
                    <h1>{isLoginView ? 'Welcome Back!' : 'Join Us!'}</h1>
                    <p>
                        {isLoginView
                            ? 'Sign in to access the Smart Resume Builder.'
                            : 'Create an account to get started.'}
                    </p>
                </div>
            </div>

            <div className="form-panel">
                <div className="form-container">
                    <h2>{isLoginView ? 'Login' : 'Create Account'}</h2>

                    {message && (
                        <div className={`message ${isError ? 'error' : 'success'}`}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={formToSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>

                        {!isLoginView && (
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    required={!isLoginView}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                />
                            </div>
                        )}

                        <button type="submit" className="submit-btn">
                            {isLoginView ? 'Sign In' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="forgot-password">
                        <button onClick={toggleView}>
                            {isLoginView
                                ? "Don't have an account? Sign Up"
                                : 'Already have an account? Sign In'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;

