// src/GettingStartedPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GettingStartedPage.css'; // We'll create this next

const GettingStartedPage = () => {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/'); // Navigate to the main dashboard
    };

    return (
        <div className="getting-started-container">
            <div className="getting-started-content">
                <h1>Here's what you need to know</h1>
                
                <div className="steps-container">
                    {/* Step 1 */}
                    <div className="step">
                        <div className="step-icon-wrapper">
                            <svg className="step-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        </div>
                        <h3>Step 1</h3>
                        <p>Check out our pre-designed templates and guided steps, allowing you to create a polished resume faster.</p>
                    </div>

                    <div className="step-connector"></div>

                    {/* Step 2 */}
                    <div className="step">
                        <div className="step-icon-wrapper">
                            <svg className="step-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        </div>
                        <h3>Step 2</h3>
                        <p>Get the right words to describe what you do. Search by job title and find pre-written content for your skills.</p>
                    </div>

                    <div className="step-connector"></div>

                    {/* Step 3 */}
                    <div className="step">
                        <div className="step-icon-wrapper">
                             <svg className="step-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        </div>
                        <h3>Step 3</h3>
                        <p>We'll help you fine-tune the details, quickly generate each section, and download your new resume.</p>
                    </div>
                </div>

                <button onClick={handleContinue} className="continue-button">
                    Continue
                </button>
            </div>
        </div>
    );
};

export default GettingStartedPage;
