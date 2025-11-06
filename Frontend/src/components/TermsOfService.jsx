// src/components/TermsOfService.jsx
import React from 'react';
import './Layout.css';

const TermsOfService = ({ onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Terms of Service</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <h3>1. Terms</h3>
                    <p>By accessing Smart Resume Builder, you agree to be bound by these terms of service and comply with all applicable laws and regulations.</p>

                    <h3>2. Use License</h3>
                    <p>Permission is granted to temporarily use Smart Resume Builder for personal, non-commercial resume creation purposes. This is the grant of a license, not a transfer of title.</p>

                    <h3>3. Disclaimer</h3>
                    <p>The materials on Smart Resume Builder are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

                    <h3>4. Limitations</h3>
                    <p>In no event shall Smart Resume Builder or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use Smart Resume Builder.</p>

                    <h3>5. User Content</h3>
                    <p>Users retain all rights to their resume content. We do not claim ownership of your personal information or resume content.</p>

                    <h3>6. Service Modifications</h3>
                    <p>We reserve the right to modify or discontinue the service at any time without notice.</p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;