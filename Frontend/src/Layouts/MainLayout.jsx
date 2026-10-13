// src/Layouts/MainLayout.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../components/Layout.css';

const MainLayout = ({ children, hideFooter = false }) => (
    <div className="app-shell">
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        <main id="main" className="app-main">
            {children}
        </main>
        {!hideFooter && <Footer />}
    </div>
);

export default MainLayout;
