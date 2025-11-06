// src/components/PrivacyPolicy.jsx
import React from 'react';
import './Layout.css';

const PrivacyPolicy = ({ onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Privacy Policy</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <h3>Information We Collect</h3>
                    <p>We collect information you provide directly to us when creating your resume, including but not limited to:</p>
                    <ul>
                        <li>Personal information (name, email, phone number)</li>
                        <li>Professional experience</li>
                        <li>Educational background</li>
                        <li>Skills and qualifications</li>
                    </ul>

                    <h3>How We Use Your Information</h3>
                    <p>We use the information we collect to:</p>
                    <ul>
                        <li>Create and maintain your resume</li>
                        <li>Improve our services</li>
                        <li>Send important updates about our service</li>
                        <li>Respond to your requests and questions</li>
                    </ul>

                    <h3>Data Security</h3>
                    <p>We implement appropriate security measures to protect your personal information. Your data is encrypted and stored securely.</p>

                    <h3>Your Rights</h3>
                    <p>You have the right to:</p>
                    <ul>
                        <li>Access your personal data</li>
                        <li>Correct inaccurate data</li>
                        <li>Request deletion of your data</li>
                        <li>Export your data</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;