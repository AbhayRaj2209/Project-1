import React from 'react';
import './ExecutiveTemplate.css';

const parseLines = (text) => {
    if (!text) return [];
    return text.split('\n').map(l => l.trim()).filter(Boolean);
};

const ExecutiveTemplate = ({ resumeData }) => {
    return (
        <div className="executive-resume">
            {/* Prestige Header Bar */}
            <div className="exec-prestige-bar"></div>
            
            <div className="exec-wrapper">
                {/* Left Column - Profile */}
                <aside className="exec-sidebar">
                    <div className="exec-profile">
                        <div className="exec-avatar">
                            {(resumeData.name || 'YN').charAt(0).toUpperCase()}
                        </div>
                        <h1>{resumeData.name || 'Your Name'}</h1>
                        <p className="exec-title">{resumeData.degree || 'Professional'}</p>
                    </div>

                    {/* Contact Section */}
                    <div className="exec-section">
                        <h3>Contact</h3>
                        {resumeData.email && <p>✉ <a href={`mailto:${resumeData.email}`}>{resumeData.email}</a></p>}
                        {resumeData.phone && <p>☎ {resumeData.phone}</p>}
                        {resumeData.location && <p>📍 {resumeData.location}</p>}
                    </div>

                    {/* Skills Section */}
                    {resumeData.skills && (
                        <div className="exec-section">
                            <h3>Core Competencies</h3>
                            <div className="exec-skills">
                                {resumeData.skills.split(',').map((skill, i) => (
                                    <span key={i} className="exec-skill-badge">{skill.trim()}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Links */}
                    <div className="exec-section">
                        <h3>Online Presence</h3>
                        {resumeData.linkedin && <p><a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn Profile</a></p>}
                        {resumeData.github && <p><a href={resumeData.github} target="_blank" rel="noopener noreferrer">GitHub Portfolio</a></p>}
                    </div>
                </aside>

                {/* Right Column - Content */}
                <main className="exec-content">
                    {/* Executive Summary */}
                    {resumeData.summary && (
                        <section className="exec-main-section">
                            <h2>Executive Summary</h2>
                            <div className="exec-divider"></div>
                            <p className="exec-summary-text">{resumeData.summary}</p>
                        </section>
                    )}

                    {/* Professional Experience */}
                    {resumeData.experience && (
                        <section className="exec-main-section">
                            <h2>Professional Experience</h2>
                            <div className="exec-divider"></div>
                            {resumeData.experience.split('\n').filter(Boolean).map((exp, i) => (
                                <div key={i} className="exec-exp-item">{exp}</div>
                            ))}
                        </section>
                    )}

                    {/* Education */}
                    {resumeData.education && (
                        <section className="exec-main-section">
                            <h2>Education</h2>
                            <div className="exec-divider"></div>
                            {resumeData.education.split('\n').filter(Boolean).map((edu, i) => (
                                <div key={i} className="exec-edu-item">{edu}</div>
                            ))}
                        </section>
                    )}

                    {/* Achievements */}
                    {resumeData.achievements && (
                        <section className="exec-main-section">
                            <h2>Key Achievements</h2>
                            <div className="exec-divider"></div>
                            <ul className="exec-achievements">
                                {parseLines(resumeData.achievements).map((a, i) => (
                                    <li key={i}>{a}</li>
                                ))}
                            </ul>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ExecutiveTemplate;
