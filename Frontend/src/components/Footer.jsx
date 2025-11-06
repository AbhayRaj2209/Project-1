// src/components/Footer.jsx
import React, { useState } from 'react';
import './Layout.css';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';

const Footer = () => {
    const [showPrivacy, setShowPrivacy] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [showContact, setShowContact] = useState(false);

    return (
        <footer className="app-footer">
            <div className="footer-container">
                <div className="footer-content">
                    <p>&copy; {new Date().getFullYear()} Smart Resume Builder. All Rights Reserved.</p>
                    <div className="footer-links">
                        <a href="#" onClick={(e) => { e.preventDefault(); setShowPrivacy(true); }}>Privacy Policy</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); setShowTerms(true); }}>Terms of Service</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); setShowContact(true); }}>Contact</a>
                    </div>
                </div>
                
                <div className="footer-contact">
                    <div className="contact-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 2L11 13"></path>
                            <path d="M22 2L15 22L11 13L2 9L22 2z"></path>
                        </svg>
                        <a href="mailto:abhayraj3051@gmail.com">abhayraj3051@gmail.com</a>
                    </div>
                    <div className="contact-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <a href="tel:+919076906408">+91 907-690-6408</a>
                    </div>
                </div>
            </div>

            {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
            {showTerms && <TermsOfService onClose={() => setShowTerms(false)} />}
            {showContact && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Contact Information</h2>
                            <button className="close-button" onClick={() => setShowContact(false)}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="contact-details">
                                <div className="contact-section">
                                    <h3>Email</h3>
                                    <p><a href="mailto:abhayraj3051@gmail.com">abhayraj3051@gmail.com</a></p>
                                </div>
                                <div className="contact-section">
                                    <h3>Phone</h3>
                                    <p><a href="tel:+919076906408">+91 907-690-6408</a></p>
                                </div>
                                <div className="contact-section">
                                    <h3>Working Hours</h3>
                                    <p>Monday - Friday: 9:00 AM - 6:00 PM (IST)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </footer>
    );
};

export default Footer;
