// src/GettingStartedPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GettingStartedPage.css';

const GettingStartedPage = () => {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/');
    };

    const features = [
        {
            icon: '🎨',
            title: 'Professional Templates',
            description: 'Choose from multiple ATS-friendly templates designed by experts'
        },
        {
            icon: '🤖',
            title: 'AI-Powered Analysis',
            description: 'Get instant ATS score and actionable improvement suggestions'
        },
        {
            icon: '📱',
            title: 'Export Anywhere',
            description: 'Download as PDF or share directly with recruiters'
        }
    ];

    return (
        <div className="getting-started-container">
            <div className="gs-hero-section">
                <div className="gs-badge">✨ Welcome to Smart Resume Builder</div>
                <h1 className="gs-title">
                    Build Your <span className="gradient-text">Dream Resume</span> in Minutes
                </h1>
                <p className="gs-subtitle">
                    Create professional, ATS-optimized resumes with our easy-to-use builder. 
                    Stand out from the crowd and land your dream job.
                </p>
            </div>

            <div className="gs-steps-section">
                <h2 className="gs-section-title">How It Works</h2>
                <div className="steps-container">
                    <div className="step-card">
                        <div className="step-number">1</div>
                        <div className="step-icon-wrapper">
                            <svg className="step-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </div>
                        <h3>Choose Template</h3>
                        <p>Pick from our collection of professionally designed, ATS-friendly resume templates.</p>
                    </div>

                    <div className="step-connector">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12h14m-4-4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>

                    <div className="step-card">
                        <div className="step-number">2</div>
                        <div className="step-icon-wrapper">
                            <svg className="step-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </div>
                        <h3>Fill Your Details</h3>
                        <p>Add your experience, skills, and education with our guided form and AI suggestions.</p>
                    </div>

                    <div className="step-connector">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12h14m-4-4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>

                    <div className="step-card">
                        <div className="step-number">3</div>
                        <div className="step-icon-wrapper">
                            <svg className="step-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </div>
                        <h3>Download & Apply</h3>
                        <p>Export your polished resume as PDF and start applying to your dream jobs!</p>
                    </div>
                </div>
            </div>

            <div className="gs-features-section">
                <h2 className="gs-section-title">Why Choose Us?</h2>
                <div className="features-grid">
                    {features.map((feature, idx) => (
                        <div key={idx} className="feature-card">
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="gs-cta-section">
                <button onClick={handleContinue} className="continue-button">
                    <span>Get Started Now</span>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12h14m-4-4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <p className="gs-cta-note">No credit card required • Free to start</p>
            </div>
        </div>
    );
};

export default GettingStartedPage;
