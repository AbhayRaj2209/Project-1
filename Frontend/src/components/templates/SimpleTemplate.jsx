import React from 'react';
import './SimpleTemplate.css';

const parseLines = (text) => {
    if (!text) return [];
    return text.split('\n').map(l => l.trim()).filter(Boolean);
};

const SimpleTemplate = ({ resumeData }) => {
    return (
        <div className="simple-resume">
            {/* Header */}
            <header className="simple-header">
                <h1 className="simple-name">{resumeData.name || 'Your Name'}</h1>
                <div className="simple-contact-line">
                    {resumeData.email && <span>{resumeData.email}</span>}
                    {resumeData.phone && <span>•</span>}
                    {resumeData.phone && <span>{resumeData.phone}</span>}
                    {resumeData.location && <span>•</span>}
                    {resumeData.location && <span>{resumeData.location}</span>}
                </div>
                {(resumeData.linkedin || resumeData.github) && (
                    <div className="simple-links">
                        {resumeData.linkedin && <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
                        {resumeData.linkedin && resumeData.github && <span>|</span>}
                        {resumeData.github && <a href={resumeData.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="simple-content">
                {/* Summary */}
                {resumeData.summary && (
                    <section className="simple-section">
                        <h2 className="simple-section-title">Professional Summary</h2>
                        <p className="simple-text">{resumeData.summary}</p>
                    </section>
                )}

                {/* Experience */}
                {resumeData.experience && (
                    <section className="simple-section">
                        <h2 className="simple-section-title">Experience</h2>
                        {resumeData.experience.split('\n').filter(Boolean).map((exp, i) => (
                            <div key={i} className="simple-entry">{exp}</div>
                        ))}
                    </section>
                )}

                {/* Education */}
                {resumeData.education && (
                    <section className="simple-section">
                        <h2 className="simple-section-title">Education</h2>
                        {resumeData.education.split('\n').filter(Boolean).map((edu, i) => (
                            <div key={i} className="simple-entry">{edu}</div>
                        ))}
                    </section>
                )}

                {/* Skills */}
                {resumeData.skills && (
                    <section className="simple-section">
                        <h2 className="simple-section-title">Skills</h2>
                        <p className="simple-text">{resumeData.skills}</p>
                    </section>
                )}

                {/* Projects */}
                {resumeData.projects && (
                    <section className="simple-section">
                        <h2 className="simple-section-title">Projects</h2>
                        {Array.isArray(resumeData.projects) ? (
                            resumeData.projects.map((proj, i) => (
                                <div key={i} className="simple-entry">
                                    <strong>{proj.title}</strong>
                                    {proj.description && <span className="simple-detail"> - {proj.description}</span>}
                                    {proj.github && <a href={proj.github} target="_blank" rel="noopener noreferrer" className="simple-link">[Link]</a>}
                                </div>
                            ))
                        ) : (
                            <p className="simple-text">{resumeData.projects}</p>
                        )}
                    </section>
                )}

                {/* Achievements */}
                {resumeData.achievements && (
                    <section className="simple-section">
                        <h2 className="simple-section-title">Achievements</h2>
                        <ul className="simple-list">
                            {parseLines(resumeData.achievements).map((a, i) => (
                                <li key={i}>{a}</li>
                            ))}
                        </ul>
                    </section>
                )}
            </main>
        </div>
    );
};

export default SimpleTemplate;
