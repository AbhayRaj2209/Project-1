// src/components/TermsOfService.jsx
import React from 'react';
import Modal from './Modal';

const TermsOfService = ({ onClose }) => (
    <Modal title="Terms of Service" onClose={onClose}>
        <h3>1. Terms</h3>
        <p>By accessing Smart Resume Builder, you agree to be bound by these terms of service and comply with all applicable laws and regulations.</p>

        <h3>2. Use license</h3>
        <p>Permission is granted to temporarily use Smart Resume Builder for personal, non-commercial resume creation purposes. This is the grant of a license, not a transfer of title.</p>

        <h3>3. Disclaimer</h3>
        <p>The materials on Smart Resume Builder are provided on an &lsquo;as is&rsquo; basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

        <h3>4. Limitations</h3>
        <p>In no event shall Smart Resume Builder or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use Smart Resume Builder.</p>

        <h3>5. User content</h3>
        <p>Users retain all rights to their resume content. We do not claim ownership of your personal information or resume content.</p>

        <h3>6. Service modifications</h3>
        <p>We reserve the right to modify or discontinue the service at any time without notice.</p>
    </Modal>
);

export default TermsOfService;
