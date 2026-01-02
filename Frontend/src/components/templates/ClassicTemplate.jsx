// src/components/templates/ClassicTemplate.jsx
import React from 'react';
import './ClassicTemplate.css';

// Helper to parse text for the two-column layout in sections
const parseSectionText = (text) => {
    if (!text) return [];
    return text.split('\n').map(line => {
        const parts = line.split('|');
        return { left: parts[0]?.trim(), right: parts[1]?.trim() };
    });
};

const parseLines = (text) => {
    if (!text) return [];
    return text.split('\n').map(l => l.trim()).filter(Boolean);
}

const ClassicTemplate = ({ resumeData }) => {
    return (
        <div className="pro-resume">
            <header className="pro-header">
                <div className="header-left">
                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Rajiv_Gandhi_Institute_of_Petroleum_Technology_logo.png/220px-Rajiv_Gandhi_Institute_of_Petroleum_Technology_logo.png" alt="Institute Logo" className="logo-img" />
                    <div className="header-title">
                        <h1>{resumeData.name || 'Your Name'}</h1>
                        {resumeData.rollNo && <p>{resumeData.rollNo}</p>}
                        {resumeData.degree && <p>{resumeData.degree}</p>}
                        {resumeData.university && <p>{resumeData.university}</p>}
                        {resumeData.location && <p>{resumeData.location}</p>}
                    </div>
                </div>
                <div className="header-right">
                    {resumeData.phone && <p><a href={`tel:${resumeData.phone}`}>{resumeData.phone}</a></p>}
                    {resumeData.email && <p><a href={`mailto:${resumeData.email}`}>{resumeData.email}</a></p>}
                    {resumeData.github && <p><a href={resumeData.github} target="_blank" rel="noopener noreferrer">GitHub</a></p>}
                    {resumeData.linkedin && <p><a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>}
                </div>
            </header>

            <main className="pro-main">
                <section>
                    <h2>EDUCATION</h2>
                    <div className="divider" />
                    {parseSectionText(resumeData.education).map((item, index) => (
                        <div className="section-item" key={index}>
                            <span className="item-left">{item.left}</span>
                            <span className="item-right">{item.right}</span>
                        </div>
                    ))}
                </section>
                <section>
                    <h2>EXPERIENCE</h2>
                    <div className="divider" />
                     {parseSectionText(resumeData.experience).map((item, index) => (
                        <div className="section-item" key={index}>
                            <span className="item-left">{item.left}</span>
                            <span className="item-right">{item.right}</span>
                        </div>
                    ))}
                </section>
                <section>
                    <h2>PROJECTS</h2>
                    <div className="divider" />
                    <div className="section-content">
                        {/* If projects is an array, render structured projects with GitHub links */}
                        {Array.isArray(resumeData.projects) ? (
                            resumeData.projects.map((p, i) => (
                                <div key={i} style={{ marginBottom: 8 }}>
                                    <strong>{p.title || `Project ${i + 1}`}</strong>
                                    {p.github && (
                                        <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 8, verticalAlign: 'middle' }} aria-label="GitHub Link">
                                            {/* Inline GitHub SVG */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block' }}>
                                                <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.11.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.52-2.56-.29-5.26-1.28-5.26-5.71 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.08 11.08 0 012.9-.39c.98.01 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.44-2.71 5.42-5.29 5.7.41.36.77 1.09.77 2.2 0 1.59-.01 2.87-.01 3.26 0 .3.2.66.79.55C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" />
                                            </svg>
                                        </a>
                                    )}
                                    <div style={{ fontSize: 14, color: '#333' }}>{p.description}</div>
                                </div>
                            ))
                        ) : (
                            <div>{resumeData.projects}</div>
                        )}
                    </div>
                </section>

                <section>
                    <h2>ACHIEVEMENTS</h2>
                    <div className="divider" />
                    <div className="section-content">
                        <ul>
                            {parseLines(resumeData.achievements).map((a, idx) => (
                                <li key={idx}>{a}</li>
                            ))}
                        </ul>
                    </div>
                </section>
                 <section>
                    <h2>TECHNICAL SKILLS</h2>
                    <div className="divider" />
                    <div className="section-content">{resumeData.skills}</div>
                </section>
            </main>
        </div>
    );
};

export default ClassicTemplate;

