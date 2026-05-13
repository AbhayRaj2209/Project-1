import React from 'react';
import './JakesTemplate.css';

const parseLines = (text) => {
    if (!text) return [];
    return text.split('\n').map(l => l.trim()).filter(Boolean);
};

const parseSectionText = (text) => {
    if (!text) return [];
    return text.split('\n').map(line => {
        const parts = line.split('|');
        return { left: parts[0]?.trim(), right: parts[1]?.trim() };
    });
};

const JakesTemplate = ({ resumeData }) => {
    return (
        <div className="jakes-resume">
            {/* Header Section */}
            <header className="jakes-header">
                <div className="jakes-name-section">
                    <h1 className="jakes-name">{resumeData.name || 'Your Name'}</h1>
                    <div className="jakes-header-divider"></div>
                    <div className="jakes-contact-info">
                        {resumeData.email && (
                            <span className="contact-item">
                                <strong>Email:</strong> <a href={`mailto:${resumeData.email}`}>{resumeData.email}</a>
                            </span>
                        )}
                        {resumeData.phone && (
                            <span className="contact-item">
                                <strong>Phone:</strong> <a href={`tel:${resumeData.phone}`}>{resumeData.phone}</a>
                            </span>
                        )}
                        {resumeData.location && (
                            <span className="contact-item">
                                <strong>Location:</strong> {resumeData.location}
                            </span>
                        )}
                    </div>
                    {(resumeData.linkedin || resumeData.github) && (
                        <div className="jakes-links">
                            {resumeData.linkedin && (
                                <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="link-badge">LinkedIn</a>
                            )}
                            {resumeData.github && (
                                <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className="link-badge">GitHub</a>
                            )}
                        </div>
                    )}
                </div>
            </header>

            <main className="jakes-main">
                {/* Professional Summary */}
                {resumeData.summary && (
                    <section className="jakes-section">
                        <h2 className="section-title">Professional Summary</h2>
                        <div className="section-content">{resumeData.summary}</div>
                    </section>
                )}

                {/* Experience */}
                {resumeData.experience && (
                    <section className="jakes-section">
                        <h2 className="section-title">Professional Experience</h2>
                        <div className="section-items">
                            {parseSectionText(resumeData.experience).map((item, index) => (
                                <div className="experience-item" key={index}>
                                    <div className="item-header">
                                        <span className="item-title">{item.left}</span>
                                        <span className="item-date">{item.right}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {resumeData.education && (
                    <section className="jakes-section">
                        <h2 className="section-title">Education</h2>
                        <div className="section-items">
                            {parseSectionText(resumeData.education).map((item, index) => (
                                <div className="education-item" key={index}>
                                    <div className="item-header">
                                        <span className="item-title">{item.left}</span>
                                        <span className="item-date">{item.right}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {resumeData.skills && (
                    <section className="jakes-section">
                        <h2 className="section-title">Technical Skills</h2>
                        <div className="skills-grid">
                            {resumeData.skills.split(',').map((skill, idx) => (
                                <span key={idx} className="skill-tag">{skill.trim()}</span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {resumeData.projects && (
                    <section className="jakes-section">
                        <h2 className="section-title">Projects</h2>
                        <div className="section-items">
                            {Array.isArray(resumeData.projects) ? (
                                resumeData.projects.map((p, i) => (
                                    <div key={i} className="project-item">
                                        <div className="item-header">
                                            <span className="item-title">{p.title || `Project ${i + 1}`}</span>
                                            {p.github && (
                                                <a href={p.github} target="_blank" rel="noopener noreferrer" className="github-link">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.11.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.52-2.56-.29-5.26-1.28-5.26-5.71 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.08 11.08 0 012.9-.39c.98.01 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.44-2.71 5.42-5.29 5.7.41.36.77 1.09.77 2.2 0 1.59-.01 2.87-.01 3.26 0 .3.2.66.79.55C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" />
                                                    </svg>
                                                </a>
                                            )}
                                        </div>
                                        {p.description && <div className="project-description">{p.description}</div>}
                                    </div>
                                ))
                            ) : (
                                <div className="section-content">{resumeData.projects}</div>
                            )}
                        </div>
                    </section>
                )}

                {/* Achievements */}
                {resumeData.achievements && (
                    <section className="jakes-section">
                        <h2 className="section-title">Achievements & Certifications</h2>
                        <ul className="achievements-list">
                            {parseLines(resumeData.achievements).map((a, idx) => (
                                <li key={idx}>{a}</li>
                            ))}
                        </ul>
                    </section>
                )}
            </main>
        </div>
    );
};

export default JakesTemplate;
