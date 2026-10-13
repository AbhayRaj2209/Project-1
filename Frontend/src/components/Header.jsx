// src/components/Header.jsx
import React, { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Icon from './Icon';
import ThemeToggle from './ThemeToggle';
import { logout } from '../utils/auth';
import './Layout.css';

const navItems = [
    { to: '/', label: 'Dashboard', icon: 'home', end: true },
    { to: '/templates', label: 'Templates', icon: 'grid' },
    { to: '/ats-checker', label: 'ATS Checker', icon: 'target' },
    { to: '/getting-started', label: 'Getting Started', icon: 'compass' },
];

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    // Close the mobile menu whenever the route changes
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname, location.search]);

    useEffect(() => {
        if (!menuOpen) return undefined;
        const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [menuOpen]);

    const linkClass = ({ isActive }) => `app-nav-link${isActive ? ' is-active' : ''}`;

    return (
        <header className={`app-header${menuOpen ? ' menu-open' : ''}`}>
            <div className="app-header-inner">
                <Link to="/" className="app-brand" aria-label="Smart Resume Builder — home">
                    <span className="app-brand-mark">
                        <Icon name="logo" size={20} strokeWidth={2.2} />
                    </span>
                    <span className="app-brand-text">
                        Smart Resume<span>Builder</span>
                    </span>
                </Link>

                <nav className="app-nav" aria-label="Main">
                    {navItems.map((item) => (
                        <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="app-header-actions">
                    <ThemeToggle />
                    <Link to="/templates" className="ui-btn ui-btn--primary ui-btn--sm app-cta">
                        <Icon name="plus" size={16} />
                        <span>New resume</span>
                    </Link>
                    <button type="button" onClick={logout} className="ui-btn ui-btn--ghost ui-btn--sm app-logout">
                        <Icon name="logout" size={16} />
                        <span>Log out</span>
                    </button>
                    <button
                        type="button"
                        className="ui-icon-btn app-menu-btn"
                        aria-expanded={menuOpen}
                        aria-controls="app-mobile-nav"
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        onClick={() => setMenuOpen((v) => !v)}
                    >
                        <Icon name={menuOpen ? 'x' : 'menu'} size={20} />
                    </button>
                </div>
            </div>

            <div id="app-mobile-nav" className="app-mobile-nav" hidden={!menuOpen}>
                <nav aria-label="Mobile">
                    {navItems.map((item) => (
                        <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
                            <Icon name={item.icon} size={18} />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
                <div className="app-mobile-actions">
                    <Link to="/templates" className="ui-btn ui-btn--primary ui-btn--block">
                        <Icon name="plus" size={16} /> New resume
                    </Link>
                    <button type="button" onClick={logout} className="ui-btn ui-btn--secondary ui-btn--block">
                        <Icon name="logout" size={16} /> Log out
                    </button>
                </div>
            </div>
            {menuOpen && <div className="app-mobile-scrim" onClick={() => setMenuOpen(false)} aria-hidden="true" />}
        </header>
    );
};

export default Header;
