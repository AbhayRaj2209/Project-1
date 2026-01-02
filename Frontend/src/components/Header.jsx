// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Layout.css';

const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <header className="app-header">
            <div className="header-container">
                <div className="logo-container">
                    <div className="custom-logo">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className="logo-primary" d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path className="logo-secondary" d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
                            <path className="logo-accent" d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
                        </svg>
                        <div className="logo-text-container">
                            <span className="logo-text">Smart Resume</span>
                            <span className="logo-text-sub">Builder</span>
                        </div>
                    </div>
                </div>
                <button className="mobile-menu-button" aria-expanded={mobileOpen} aria-label="Toggle menu" onClick={() => setMobileOpen(v => !v)}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <nav className={`main-nav ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)}>
                    <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Dashboard</NavLink>
                    <NavLink to="/templates" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Templates</NavLink>
                    <NavLink to="/ats-checker" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>ATS Checker</NavLink>
                    <NavLink to="/getting-started" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Getting Started</NavLink>
                    <Link to="/editor?template=classic" className="nav-link">Create Resume</Link>
                </nav>
                <div className="user-actions">
                    <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
                        {/* Sun Icon */}
                        <svg className="sun-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="5"></circle>
                            <line x1="12" y1="1" x2="12" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="23"></line>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                            <line x1="1" y1="12" x2="3" y2="12"></line>
                            <line x1="21" y1="12" x2="23" y2="12"></line>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                        </svg>
                        {/* Moon Icon */}
                        <svg className="moon-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                    </button>
                    <button onClick={handleLogout} className="logout-button-header">
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
