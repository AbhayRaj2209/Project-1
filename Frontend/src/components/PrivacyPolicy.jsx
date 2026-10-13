// src/components/PrivacyPolicy.jsx
import React from 'react';
import Modal from './Modal';

const PrivacyPolicy = ({ onClose }) => (
    <Modal title="Privacy Policy" onClose={onClose}>
        <h3>Information we collect</h3>
        <p>We collect information you provide directly to us when creating your resume, including but not limited to:</p>
        <ul>
            <li>Personal information (name, email, phone number)</li>
            <li>Professional experience</li>
            <li>Educational background</li>
            <li>Skills and qualifications</li>
        </ul>

        <h3>How we use your information</h3>
        <p>We use the information we collect to:</p>
        <ul>
            <li>Create and maintain your resume</li>
            <li>Improve our services</li>
            <li>Send important updates about our service</li>
            <li>Respond to your requests and questions</li>
        </ul>

        <h3>Data security</h3>
        <p>We implement appropriate security measures to protect your personal information. Your data is encrypted and stored securely.</p>

        <h3>Your rights</h3>
        <p>You have the right to:</p>
        <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Export your data</li>
        </ul>
    </Modal>
);

export default PrivacyPolicy;
