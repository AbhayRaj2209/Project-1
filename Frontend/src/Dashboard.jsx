// src/Dashboard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; 

const actionVerbs = [
    'Achieved', 'Accelerated', 'Administered', 'Advised', 'Advocated', 'Analyzed', 'Authored', 'Budgeted', 'Built', 'Calculated', 'Championed', 'Coached', 'Collaborated', 'Conceptualized', 'Coordinated', 'Created', 'Cultivated', 'Decreased', 'Delivered', 'Demonstrated', 'Designed', 'Developed', 'Directed', 'Documented', 'Eliminated', 'Engineered', 'Enhanced', 'Established', 'Evaluated', 'Executed', 'Facilitated', 'Forecasted', 'Founded', 'Generated', 'Headed', 'Identified', 'Implemented', 'Improved', 'Increased', 'Influenced', 'Initiated', 'Innovated', 'Inspired', 'Instituted', 'Integrated', 'Introduced', 'Invented', 'Launched', 'Led', 'Maintained', 'Managed', 'Mentored', 'Modernized', 'Motivated', 'Negotiated', 'Operated', 'Orchestrated', 'Organized', 'Overhauled', 'Oversaw', 'Pioneered', 'Planned', 'Predicted', 'Prioritized', 'Produced', 'Promoted', 'Proposed', 'Proved', 'Provided', 'Raised', 'Recommended', 'Redesigned', 'Reduced', 'Re-engineered', 'Resolved', 'Restructured', 'Revamped', 'Saved', 'Scheduled', 'Secured', 'Simplified', 'Solved', 'Spearheaded', 'Standardized', 'Streamlined', 'Strengthened', 'Supervised', 'Supported', 'Synthesized', 'Systematized', 'Taught', 'Tested', 'Trained', 'Transformed', 'Unified', 'Upgraded', 'Utilized', 'Validated', 'Visualized', 'Won'
];


const Dashboard = () => {
    const [verbSearch, setVerbSearch] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    const filteredVerbs = verbSearch.length > 1 
        ? actionVerbs.filter(verb => verb.toLowerCase().startsWith(verbSearch.toLowerCase()))
        : [];

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h2>Smart Builder</h2>
                </div>
                <nav className="sidebar-nav">
                    <Link to="/" className="nav-item active">My Resumes</Link>
                </nav>
                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="logout-button">
                        Logout
                    </button>
                </div>
            </aside>
            <main className="main-content">
                <header className="main-header">
                    <h1>Dashboard</h1>
                </header>

                {/* --- NEW WIDGETS SECTION --- */}
                <div className="dashboard-widgets">
                    {/* Quick Actions Menu */}
                    <div className="widget-card quick-actions">
                        <h3>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                            </svg>
                            Quick Actions
                        </h3>
                        <div className="quick-actions-grid">
                            <Link to="/templates" className="quick-action-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                Create New
                            </Link>
                            <button className="quick-action-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                                Download PDF
                            </button>
                            <button className="quick-action-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                                Share
                            </button>
                            <button className="quick-action-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="3"></circle>
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                                </svg>
                                Settings
                            </button>
                        </div>
                    </div>

                    {/* Resume Statistics Widget */}
                    <div className="widget-card statistics">
                        <h3>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 20V10"></path>
                                <path d="M18 20V4"></path>
                                <path d="M6 20v-4"></path>
                            </svg>
                            Resume Statistics
                        </h3>
                        <div className="stats-grid">
                            <div className="stat-item">
                                <span className="stat-value">2</span>
                                <span className="stat-label">Active Resumes</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">15</span>
                                <span className="stat-label">Downloads</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">89%</span>
                                <span className="stat-label">Completion</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">5</span>
                                <span className="stat-label">Job Applications</span>
                            </div>
                        </div>
                    </div>

                    {/* Job Search Widget */}
                    <div className="widget-card">
                        <h3>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            Job Search
                        </h3>
                        <p>Find your next opportunity. Searches will open in a new tab.</p>
                        <form className="widget-form" action="https://www.google.com/search" method="GET" target="_blank">
                            <input type="hidden" name="q" value="software engineer jobs in Bangalore India" />
                            <div className="form-row">
                                <input type="text" name="q" placeholder="Job title, e.g., 'Software Engineer'" required />
                                <input type="text" name="l" placeholder="Location, e.g., 'Bangalore'" />
                            </div>
                            <button type="submit" className="widget-button">Search Jobs</button>
                        </form>
                    </div>

                    {/* Resume Score Widget */}
                    <div className="widget-card resume-score">
                        <h3>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            Resume Score
                        </h3>
                        <div className="score-container">
                            <div className="score-circle">
                                <svg viewBox="0 0 36 36" className="circular-chart">
                                    <path className="circle-bg" d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                                    <path className="circle" strokeDasharray="75, 100" d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                                    <text x="18" y="20.35" className="percentage">75%</text>
                                </svg>
                            </div>
                            <div className="score-details">
                                <p>Your resume is looking good! Here are some tips to improve:</p>
                                <ul className="score-tips">
                                    <li>Add more specific achievements</li>
                                    <li>Include relevant skills</li>
                                    <li>Proofread for grammar</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Action Verb Finder */}
                    <div className="widget-card">
                        <h3>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                                <path d="M2 2l7.586 7.586"></path>
                            </svg>
                            Action Verb Finder
                        </h3>
                        <p>Find powerful words to describe your impact.</p>
                        <form className="widget-form">
                            <input 
                                type="text" 
                                placeholder="Type to search verbs..." 
                                value={verbSearch}
                                onChange={(e) => setVerbSearch(e.target.value)}
                            />
                        </form>
                        <div className="verb-results">
                            {verbSearch.length > 1 && filteredVerbs.length > 0 && (
                                filteredVerbs.slice(0, 8).map(verb => <span key={verb} className="verb-tag">{verb}</span>)
                            )}
                        </div>
                    </div>

                    {/* Resume Tips Widget */}
                    <div className="widget-card tips-resources">
                        <h3>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                            </svg>
                            Resume Tips & Resources
                        </h3>
                        <div className="tips-list">
                            <div className="tip-item">
                                <h4>📝 Writing Tips</h4>
                                <p>Use action verbs and quantify achievements</p>
                            </div>
                            <div className="tip-item">
                                <h4>🎯 Industry Insights</h4>
                                <p>Trending skills in your field</p>
                            </div>
                            <div className="tip-item">
                                <h4>📚 Resources</h4>
                                <p>Resume guides and templates</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* --- END OF WIDGETS SECTION --- */}


                <header className="main-header" style={{ marginTop: '40px' }}>
                    <h1>My Resumes</h1>
                </header>
                <div className="resume-grid">
                    <Link to="/templates" className="resume-card new-resume-card">
                        <div className="plus-icon">+</div>
                        <p>New Resume</p>
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
