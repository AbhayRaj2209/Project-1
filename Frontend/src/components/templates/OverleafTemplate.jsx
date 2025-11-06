// src/components/templates/OverleafTemplate.jsx
import React from 'react';
import './OverleafTemplate.css';

const OverleafTemplate = ({ resumeData = {} }) => {
    const {
        name = 'Your Name',
        title = 'Professional Title',
        contact = {},
        summary = '',
        experience = [],
        education = [],
        skills = [],
        projects = [],
        achievements = []
        , logoUrl = '',
        themeColor = '#4f46e5',
        backgroundImage = ''
    } = resumeData;

    return (
        <div className="overleaf-root" style={{ ['--ov-theme']: themeColor, backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none' }}>
            <aside className="ov-left">
                <div className="ov-left-inner">
                    <div className="ov-name">{name}</div>
                    <div className="ov-title">{title}</div>

                    <div className="ov-section">
                        <h4>Contact</h4>
                        <p>{contact.email}</p>
                        <p>{contact.phone}</p>
                        {contact.website && <p>{contact.website}</p>}
                    </div>

                    <div className="ov-section">
                        <h4>Skills</h4>
                        <ul className="ov-list">
                            {skills.slice(0, 12).map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </div>

                    {achievements.length > 0 && (
                        <div className="ov-section">
                            <h4>Achievements</h4>
                            <ul className="ov-list">
                                {achievements.map((a, i) => <li key={i}>{a}</li>)}
                            </ul>
                        </div>
                    )}
                </div>
            </aside>

            <main className="ov-right">
                <div className="ov-right-inner">
                    {/* Header area inside template (customizable) */}
                    <div className="ov-header">
                        <div className="ov-header-left">
                            {logoUrl ? (
                                <img src={logoUrl} alt="logo" className="ov-template-logo" />
                            ) : (
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ov-template-logo">
                                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M2 17L12 22L22 17" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            )}
                        </div>
                        <div className="ov-header-right">
                            <div className="ov-header-name">{name}</div>
                            <div className="ov-header-title">{title}</div>
                        </div>
                    </div>
                    {summary && (
                        <section className="ov-block">
                            <h3>Summary</h3>
                            <p>{summary}</p>
                        </section>
                    )}

                    <section className="ov-block">
                        <h3>Experience</h3>
                        {experience.length === 0 && <p className="muted">No experience added yet</p>}
                        {experience.map((exp, idx) => (
                            <div className="exp-item" key={idx}>
                                <div className="exp-head">
                                    <strong>{exp.role}</strong>
                                    <span className="exp-date">{exp.period}</span>
                                </div>
                                <div className="exp-company">{exp.company}</div>
                                <p className="exp-desc">{exp.description}</p>
                            </div>
                        ))}
                    </section>

                    <section className="ov-block">
                        <h3>Projects</h3>
                        {projects.map((p, i) => (
                            <div className="proj-item" key={i}>
                                <div className="proj-head"><strong>{p.name}</strong> <span className="proj-link">{p.github && <a href={p.github} target="_blank" rel="noreferrer">Git</a>}</span></div>
                                <p className="proj-desc">{p.summary}</p>
                            </div>
                        ))}
                    </section>

                    <section className="ov-block">
                        <h3>Education</h3>
                        {education.map((ed, i) => (
                            <div className="edu-item" key={i}>
                                <div className="edu-head"><strong>{ed.degree}</strong> <span className="edu-date">{ed.period}</span></div>
                                <div className="edu-school">{ed.institution}</div>
                            </div>
                        ))}
                    </section>
                </div>
            </main>
        </div>
    );
};

export default OverleafTemplate;
