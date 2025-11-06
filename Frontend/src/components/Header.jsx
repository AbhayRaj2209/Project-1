// src/components/Header.jsx
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Layout.css'; // We will create this CSS file next

const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <header className="app-header">
            <div className="header-container">
                <div className="logo-container">
                    {/* Modern Custom Logo */}
                    <div className="custom-logo">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className="logo-primary" d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path className="logo-secondary" d="M2 17L12 22L22 17" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path className="logo-accent" d="M2 12L12 17L22 12" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div className="logo-text-container">
                            <span className="logo-text">Smart Resume</span>
                            <span className="logo-text-sub">Builder</span>
                        </div>
                    </div>
                </div>
                <button className="mobile-menu-button" aria-expanded={mobileOpen} aria-label="Toggle menu" onClick={() => setMobileOpen(v => !v)}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6h16M4 12h16M4 18h16" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <nav className={`main-nav ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)}>
                    <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Dashboard</NavLink>
                    <NavLink to="/templates" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Templates</NavLink>
                    <NavLink to="/getting-started" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Getting Started</NavLink>
                    <Link to="/editor?template=classic" className="nav-link">Create Resume</Link>
                </nav>
                <div className="user-actions">
                    <button onClick={handleLogout} className="logout-button-header">
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
