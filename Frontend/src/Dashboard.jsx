// src/Dashboard.jsx
import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    // Fetch user's resumes
    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/resume/list', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setResumes(data.resumes || []);
            }
        } catch (error) {
            console.error('Error fetching resumes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteResume = async (id) => {
        if (!window.confirm('Are you sure you want to delete this resume?')) return;
        
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/resume/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                fetchResumes();
            }
        } catch (error) {
            console.error('Error deleting resume:', error);
        }
    };

    const filteredResumes = resumes.filter(resume =>
        resume.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h2>📄 Resume Builder</h2>
                </div>
                <nav className="sidebar-nav">
                    <Link to="/" className="nav-item active">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        </svg>
                        My Resumes
                    </Link>
                    <Link to="/templates" className="nav-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                        </svg>
                        Templates
                    </Link>
                    <Link to="/ats-checker" className="nav-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        ATS Score Checker
                    </Link>
                </nav>
                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="logout-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Logout
                    </button>
                </div>
            </aside>
            <main className="main-content">
                <header className="main-header">
                    <div className="header-content">
                        <div>
                            <h1>Welcome back! 👋</h1>
                            <p className="subtitle">Create and manage your professional resumes</p>
                        </div>
                        <Link to="/templates" className="create-new-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            Create New Resume
                        </Link>
                    </div>
                </header>

                {/* Statistics Cards */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon" style={{backgroundColor: '#e3f2fd'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2196f3" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                            </svg>
                        </div>
                        <div className="stat-info">
                            <h3>{resumes.length}</h3>
                            <p>Total Resumes</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon" style={{backgroundColor: '#f3e5f5'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9c27b0" strokeWidth="2">
                                <rect x="3" y="3" width="7" height="7"></rect>
                                <rect x="14" y="3" width="7" height="7"></rect>
                                <rect x="14" y="14" width="7" height="7"></rect>
                                <rect x="3" y="14" width="7" height="7"></rect>
                            </svg>
                        </div>
                        <div className="stat-info">
                            <h3>8</h3>
                            <p>Templates</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon" style={{backgroundColor: '#e8f5e9'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <div className="stat-info">
                            <h3>{resumes.filter(r => r.updatedAt).length}</h3>
                            <p>Recently Updated</p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions & Tips */}
                <div className="quick-widgets">
                    <div className="widget quick-tips">
                        <h3>💡 Resume Writing Tips</h3>
                        <ul>
                            <li>
                                <strong>Use action verbs:</strong> Start bullet points with strong verbs like "Developed," "Managed," "Led"
                            </li>
                            <li>
                                <strong>Quantify achievements:</strong> Include numbers and metrics to demonstrate impact
                            </li>
                            <li>
                                <strong>Tailor for each job:</strong> Customize your resume to match the job description
                            </li>
                            <li>
                                <strong>Keep it concise:</strong> Aim for 1-2 pages maximum
                            </li>
                        </ul>
                    </div>
                    <div className="widget export-options">
                        <h3>📤 Export & Share</h3>
                        <p>Your resumes can be exported in multiple formats:</p>
                        <div className="export-formats">
                            <div className="format-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                </svg>
                                <span>PDF Format</span>
                            </div>
                            <div className="format-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
                                    <polyline points="6 9 6 2 18 2 18 9"></polyline>
                                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                                    <rect x="6" y="14" width="12" height="8"></rect>
                                </svg>
                                <span>Print Ready</span>
                            </div>
                            <div className="format-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                                <span>Download</span>
                            </div>
                        </div>
                    </div>
                    <div className="widget resource-links">
                        <h3>🔗 Helpful Resources</h3>
                        <Link to="/ats-checker" className="resource-link ats-highlight">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            Check Your ATS Score
                        </Link>
                        <a href="https://www.linkedin.com/jobs/" target="_blank" rel="noopener noreferrer" className="resource-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            Job Boards
                        </a>
                        <a href="https://www.grammarly.com/" target="_blank" rel="noopener noreferrer" className="resource-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                            Grammar Check
                        </a>
                        <a href="https://www.linkedin.com/help/linkedin/answer/a507663" target="_blank" rel="noopener noreferrer" className="resource-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                            </svg>
                            Resume Writing Guide
                        </a>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="search-section">
                    <div className="search-bar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                        <input
                            type="text"
                            placeholder="Search resumes by name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Resume Grid */}
                <div className="resumes-section">
                    <h2>My Resumes</h2>
                    {loading ? (
                        <div className="loading-state">Loading resumes...</div>
                    ) : (
                        <div className="resume-grid">{filteredResumes.map((resume) => (
                                <div key={resume._id} className="resume-card">
                                    <div className="resume-preview-thumb">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                            <polyline points="14 2 14 8 20 8"></polyline>
                                            <line x1="16" y1="13" x2="8" y2="13"></line>
                                            <line x1="16" y1="17" x2="8" y2="17"></line>
                                            <polyline points="10 9 9 9 8 9"></polyline>
                                        </svg>
                                    </div>
                                    <div className="resume-info">
                                        <h3>{resume.name || 'Untitled Resume'}</h3>
                                        <p className="resume-date">
                                            Last updated: {resume.updatedAt 
                                                ? new Date(resume.updatedAt).toLocaleDateString() 
                                                : 'N/A'}
                                        </p>
                                    </div>
                                    <div className="resume-actions">
                                        <Link 
                                            to={`/editor?id=${resume._id}`} 
                                            className="action-btn edit-btn"
                                            title="Edit"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                            </svg>
                                        </Link>
                                        <button 
                                            onClick={() => handleDeleteResume(resume._id)} 
                                            className="action-btn delete-btn"
                                            title="Delete"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="3 6 5 6 21 6"></polyline>
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {!loading && filteredResumes.length === 0 && resumes.length > 0 && (
                        <div className="empty-state">
                            <p>No resumes found matching your search.</p>
                        </div>
                    )}
                    
                    {!loading && resumes.length === 0 && (
                        <div className="empty-state">
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                            </svg>
                            <h3>No resumes yet</h3>
                            <p>Create your first professional resume to get started</p>
                            <Link to="/templates" className="get-started-btn">Get Started</Link>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;