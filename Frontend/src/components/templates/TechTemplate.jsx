import React from 'react';
import './TechTemplate.css';

const parseLines = (text) => {
    if (!text) return [];
    return text.split('\n').map(l => l.trim()).filter(Boolean);
};

const TechTemplate = ({ resumeData }) => {
    return (
        <div className="tech-resume">
            {/* Code-style header */}
            <div className="tech-header">
                <div className="tech-header-top">
                    <div className="tech-code-block">
                        <span className="tech-code-tag">{'<'}</span>
                        <span className="tech-code-name">developer</span>
                        <span className="tech-code-tag">{'>'}</span>
                    </div>
                    <h1 className="tech-name">{resumeData.name || 'Your Name'}</h1>
                    <p className="tech-role">{resumeData.degree || 'Full Stack Developer'}</p>
                </div>
                <div className="tech-contact-bar">
                    {resumeData.email && <span>📧 {resumeData.email}</span>}
                    {resumeData.phone && <span>📱 {resumeData.phone}</span>}
                    {resumeData.location && <span>📍 {resumeData.location}</span>}
                </div>
            </div>

            <div className="tech-main">
                {/* Left Column */}
                <aside className="tech-sidebar">
                    {/* Tech Skills */}
                    {resumeData.skills && (
                        <section className="tech-section">
                            <h2 className="tech-section-title">
                                <span className="tech-bracket">{'{}'}</span> Technologies
                            </h2>
                            <div className="tech-tag-cloud">
                                {resumeData.skills.split(',').map((skill, i) => (
                                    <span key={i} className="tech-tag">{skill.trim()}</span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Links */}
                    <section className="tech-section">
                        <h2 className="tech-section-title">
                            <span className="tech-bracket">[ ]</span> Links
                        </h2>
                        {resumeData.github && <p><a href={resumeData.github} target="_blank" rel="noopener noreferrer">→ GitHub</a></p>}
                        {resumeData.linkedin && <p><a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer">→ LinkedIn</a></p>}
                    </section>

                    {/* Languages */}
                    {resumeData.languages && (
                        <section className="tech-section">
                            <h2 className="tech-section-title">
                                <span className="tech-bracket">$ </span> Languages
                            </h2>
                            <p>{resumeData.languages}</p>
                        </section>
                    )}
                </aside>

                {/* Right Column */}
                <main className="tech-content">
                    {/* Summary */}
                    {resumeData.summary && (
                        <section className="tech-main-section">
                            <h2 className="tech-main-title">// About</h2>
                            <p className="tech-text">{resumeData.summary}</p>
                        </section>
                    )}

                    {/* Experience */}
                    {resumeData.experience && (
                        <section className="tech-main-section">
                            <h2 className="tech-main-title">// Work Experience</h2>
                            <div className="tech-list">
                                {resumeData.experience.split('\n').filter(Boolean).map((exp, i) => (
                                    <div key={i} className="tech-item">
                                        <span className="tech-indent">→</span> {exp}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {resumeData.education && (
                        <section className="tech-main-section">
                            <h2 className="tech-main-title">// Education</h2>
                            <div className="tech-list">
                                {resumeData.education.split('\n').filter(Boolean).map((edu, i) => (
                                    <div key={i} className="tech-item">
                                        <span className="tech-indent">→</span> {edu}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {resumeData.projects && (
                        <section className="tech-main-section">
                            <h2 className="tech-main-title">// Projects</h2>
                            <div className="tech-list">
                                {Array.isArray(resumeData.projects) ? (
                                    resumeData.projects.map((proj, i) => (
                                        <div key={i} className="tech-project">
                                            <span className="tech-indent">→</span>
                                            <strong>{proj.title}</strong>
                                            {proj.github && <a href={proj.github} target="_blank" rel="noopener noreferrer" className="tech-github-link">View</a>}
                                            <div className="tech-project-desc">{proj.description}</div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="tech-item"><span className="tech-indent">→</span> {resumeData.projects}</div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Achievements */}
                    {resumeData.achievements && (
                        <section className="tech-main-section">
                            <h2 className="tech-main-title">// Achievements</h2>
                            <ul className="tech-achievement-list">
                                {parseLines(resumeData.achievements).map((a, i) => (
                                    <li key={i}>{a}</li>
                                ))}
                            </ul>
                        </section>
                    )}
                </main>
            </div>

            {/* Footer */}
            <div className="tech-footer">
                <span className="tech-code-closing">{'</'}</span>
                <span className="tech-code-name">developer</span>
                <span className="tech-code-tag">{'>'}</span>
            </div>
        </div>
    );
};

export default TechTemplate;
