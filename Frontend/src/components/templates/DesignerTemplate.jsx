import React from 'react';
import './DesignerTemplate.css';

const parseLines = (text) => {
    if (!text) return [];
    return text.split('\n').map(l => l.trim()).filter(Boolean);
};

const DesignerTemplate = ({ resumeData }) => {
    return (
        <div className="designer-resume">
            {/* Colorful header section */}
            <header className="designer-header">
                <div className="designer-accent-line"></div>
                <div className="designer-header-content">
                    <div className="designer-title-section">
                        <h1 className="designer-name">{resumeData.name || 'Your Name'}</h1>
                        <p className="designer-subtitle">{resumeData.degree || 'Creative Professional'}</p>
                    </div>
                    <div className="designer-contact">
                        {resumeData.email && <span>{resumeData.email}</span>}
                        {resumeData.phone && <span>{resumeData.phone}</span>}
                        {resumeData.location && <span>{resumeData.location}</span>}
                    </div>
                </div>
                <div className="designer-accent-bars">
                    <div className="bar" style={{ backgroundColor: '#c026d3' }}></div>
                    <div className="bar" style={{ backgroundColor: '#0891b2' }}></div>
                    <div className="bar" style={{ backgroundColor: '#ea580c' }}></div>
                    <div className="bar" style={{ backgroundColor: '#06b6d4' }}></div>
                </div>
            </header>

            <div className="designer-body">
                {/* Left Column - Featured Skills */}
                <aside className="designer-sidebar">
                    {resumeData.skills && (
                        <section className="designer-skill-section">
                            <h3 className="designer-section-title">Creative Skills</h3>
                            <div className="designer-skill-matrix">
                                {resumeData.skills.split(',').map((skill, i) => (
                                    <div key={i} className="designer-skill-item">
                                        <span className="designer-skill-dot"></span>
                                        {skill.trim()}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {(resumeData.linkedin || resumeData.github) && (
                        <section className="designer-links-section">
                            <h3 className="designer-section-title">Connect</h3>
                            {resumeData.linkedin && <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="designer-link">🎨 LinkedIn</a>}
                            {resumeData.github && <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className="designer-link">🔗 Portfolio</a>}
                        </section>
                    )}
                </aside>

                {/* Right Column - Main Content */}
                <main className="designer-main">
                    {/* Summary */}
                    {resumeData.summary && (
                        <section className="designer-section">
                            <h2 className="designer-main-title">About</h2>
                            <div className="designer-title-underline"></div>
                            <p className="designer-text">{resumeData.summary}</p>
                        </section>
                    )}

                    {/* Projects - Featured */}
                    {resumeData.projects && (
                        <section className="designer-section">
                            <h2 className="designer-main-title">Featured Projects</h2>
                            <div className="designer-title-underline"></div>
                            <div className="designer-projects">
                                {Array.isArray(resumeData.projects) ? (
                                    resumeData.projects.map((proj, i) => (
                                        <div key={i} className="designer-project-card">
                                            <div className="designer-project-header">
                                                <h4>{proj.title}</h4>
                                                {proj.github && (
                                                    <a href={proj.github} target="_blank" rel="noopener noreferrer" className="designer-project-link">→</a>
                                                )}
                                            </div>
                                            <p className="designer-project-desc">{proj.description}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="designer-text">{resumeData.projects}</p>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Experience */}
                    {resumeData.experience && (
                        <section className="designer-section">
                            <h2 className="designer-main-title">Experience</h2>
                            <div className="designer-title-underline"></div>
                            <div className="designer-timeline">
                                {resumeData.experience.split('\n').filter(Boolean).map((exp, i) => (
                                    <div key={i} className="designer-timeline-item">
                                        <div className="designer-timeline-dot"></div>
                                        <p>{exp}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {resumeData.education && (
                        <section className="designer-section">
                            <h2 className="designer-main-title">Education</h2>
                            <div className="designer-title-underline"></div>
                            <div className="designer-timeline">
                                {resumeData.education.split('\n').filter(Boolean).map((edu, i) => (
                                    <div key={i} className="designer-timeline-item">
                                        <div className="designer-timeline-dot"></div>
                                        <p>{edu}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Achievements */}
                    {resumeData.achievements && (
                        <section className="designer-section">
                            <h2 className="designer-main-title">Highlights</h2>
                            <div className="designer-title-underline"></div>
                            <ul className="designer-highlight-list">
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

export default DesignerTemplate;
