import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import "./loginpage.css";

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
const API_ORIGIN = new URL(API_BASE_URL).origin;

axios.defaults.baseURL = API_BASE_URL;

function AuthPage() {
    const location = useLocation();
    const [isLoginView, setIsLoginView] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showForgotForm, setShowForgotForm] = useState(false);
    const [resetToken, setResetToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [resetEmail, setResetEmail] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        if (token) {
            localStorage.setItem('token', token);
            window.history.replaceState({}, '', '/getting-started');
            window.location.href = '/getting-started';
        }

        const resetParam = new URLSearchParams(location.search).get('reset');
        if (resetParam) {
            setResetToken(resetParam);
            setShowForgotForm(false);
            setIsLoginView(true);
        }
    }, [location.search]);

    const clearState = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setMessage('');
        setIsError(false);
        setShowPassword(false);
        setShowConfirmPassword(false);
        setResetEmail('');
        setNewPassword('');
        setResetToken('');
    };

    const handleSocialLogin = (provider) => {
        const authUrl = `${API_BASE_URL}/api/auth/${provider}`;
        const authWindow = window.open(authUrl, '_blank', 'width=500,height=600');

        if (!authWindow) {
            window.location.href = authUrl;
            return;
        }

        const handleMessage = (event) => {
            if (event.origin !== API_ORIGIN) {
                return;
            }
            const { token } = event.data || {};
            if (token) {
                localStorage.setItem('token', token);
                window.removeEventListener('message', handleMessage);
                authWindow.close();
                window.location.href = '/getting-started';
            }
        };

        window.addEventListener('message', handleMessage);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setIsError(true);
            setMessage('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post('/api/signup', { email, password });
            setMessage(response.data.message);
            setIsError(false);
            setIsLoginView(true);
        } catch (error) {
            setIsError(true);
            setMessage(error.response?.data?.message || 'Signup failed.');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', { email, password });
            localStorage.setItem('token', response.data.token);
            window.location.href = '/getting-started'; 
        } catch (error) {
            setIsError(true);
            setMessage(error.response?.data?.message || 'Login failed.');
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/forgot-password', { email: resetEmail });
            setMessage(response.data.message);
            setIsError(false);
        } catch (error) {
            setIsError(true);
            setMessage(error.response?.data?.message || 'Unable to send reset email.');
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/reset-password', { token: resetToken, password: newPassword });
            setMessage(response.data.message);
            setIsError(false);
            setResetToken('');
            setNewPassword('');
        } catch (error) {
            setIsError(true);
            setMessage(error.response?.data?.message || 'Password reset failed.');
        }
    };

    return (
        <div className="login-page-container">
            <div className="info-panel">
                <div className="info-content">
                    <h1>{isLoginView ? 'Welcome Back!' : 'Join Us!'}</h1>
                    <p>{isLoginView ? 'Sign in to access your resumes.' : 'Create an account to build your career.'}</p>
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

                    {showForgotForm ? (
                        <form onSubmit={handleForgotPassword}>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={resetEmail}
                                    onChange={(e) => setResetEmail(e.target.value)}
                                    placeholder="you@example.com"
                                />
                            </div>
                            <button type="submit" className="submit-btn">Send Reset Link</button>
                            <p className="toggle-view">
                                <button type="button" onClick={() => setShowForgotForm(false)}>
                                    Back to login
                                </button>
                            </p>
                        </form>
                    ) : resetToken ? (
                        <form onSubmit={handleResetPassword}>
                            <div className="form-group">
                                <label>New Password</label>
                                <div className="password-input-wrapper">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle-btn"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            </div>
                            <button type="submit" className="submit-btn">Reset Password</button>
                        </form>
                    ) : (
                        <form onSubmit={isLoginView ? handleLogin : handleSignup}>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <div className="password-input-wrapper">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle-btn"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            </div>

                            {!isLoginView && (
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <div className="password-input-wrapper">
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            className="password-toggle-btn"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                                        >
                                            {showConfirmPassword ? 'Hide' : 'Show'}
                                        </button>
                                    </div>
                                </div>
                            )}

                            <button type="submit" className="submit-btn">
                                {isLoginView ? 'Sign In' : 'Sign Up'}
                            </button>
                        </form>
                    )}

                    {!showForgotForm && !resetToken && (
                        <div className="toggle-view">
                            <p>
                                {isLoginView ? "Don't have an account? " : 'Already have an account? '}
                                <button onClick={() => { setIsLoginView(!isLoginView); clearState(); }}>
                                    {isLoginView ? 'Sign Up' : 'Sign In'}
                                </button>
                            </p>
                            {isLoginView && (
                                <p>
                                    <button type="button" onClick={() => { setShowForgotForm(true); clearState(); }}>
                                        Forgot password?
                                    </button>
                                </p>
                            )}
                        </div>
                    )}

                    <div className="separator"><span>OR continue with</span></div>

                    {/* Social Login Buttons */}
                    <div className="social-login-group">
                        <button type="button" onClick={() => handleSocialLogin('google')} className="social-btn google" role="button">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            Google
                        </button>
                        <button type="button" onClick={() => handleSocialLogin('github')} className="social-btn github" role="button">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            GitHub
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;