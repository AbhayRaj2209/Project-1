// src/components/templates/OverleafTemplate.jsx
import React from 'react';
import './OverleafTemplate.css';

const OverleafTemplate = ({ resumeData = {} }) => {
    const {
        name = 'Your Name',
        email = '',
        phone = '',
        linkedin = '',
        github = '',
        location = '',
        summary = '',
        experience = '',
        education = '',
        skills = '',
        projects = [],
        achievements = '',
        logoUrl = '',
        themeColor = '#4f46e5',
        backgroundImage = ''
    } = resumeData;

    // Parse skills if it's a string
    const skillsArray = typeof skills === 'string' ? skills.split(',').map(s => s.trim()).filter(Boolean) : (Array.isArray(skills) ? skills : []);
    const achievementsArray = typeof achievements === 'string' ? achievements.split('\n').map(s => s.trim()).filter(Boolean) : (Array.isArray(achievements) ? achievements : []);
    const projectsArray = Array.isArray(projects) ? projects : [];

    return (
        <div className="overleaf-root" style={{ ['--ov-theme']: themeColor, backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none' }}>
            <aside className="ov-left">
                <div className="ov-left-inner">
                    <div className="ov-name">{name}</div>
                    {location && <div className="ov-title">{location}</div>}

                    <div className="ov-section">
                        <h4>Contact</h4>
                        {email && <p>{email}</p>}
                        {phone && <p>{phone}</p>}
                        {linkedin && <p><a href={linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>}
                        {github && <p><a href={github} target="_blank" rel="noopener noreferrer">GitHub</a></p>}
                    </div>

                    <div className="ov-section">
                        <h4>Skills</h4>
                        <ul className="ov-list">
                            {skillsArray.slice(0, 12).map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </div>

                    {achievementsArray.length > 0 && (
                        <div className="ov-section">
                            <h4>Achievements</h4>
                            <ul className="ov-list">
                                {achievementsArray.map((a, i) => <li key={i}>{a}</li>)}
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
                            {location && <div className="ov-header-title">{location}</div>}
                        </div>
                    </div>
                    {summary && (
                        <section className="ov-block">
                            <h3>Summary</h3>
                            <p>{summary}</p>
                        </section>
                    )}

                    {experience && (
                        <section className="ov-block">
                            <h3>Experience</h3>
                            <div className="section-text">
                                {experience.split('\n').map((line, idx) => (
                                    <p key={idx}>{line}</p>
                                ))}
                            </div>
                        </section>
                    )}

                    {projectsArray.length > 0 && (
                        <section className="ov-block">
                            <h3>Projects</h3>
                            {projectsArray.map((p, i) => (
                                <div className="proj-item" key={i}>
                                    <div className="proj-head">
                                        <strong>{p.title}</strong> 
                                        {p.link && <span className="proj-link"><a href={p.link} target="_blank" rel="noreferrer">Link</a></span>}
                                    </div>
                                    <p className="proj-desc">{p.description}</p>
                                    {p.technologies && <p className="proj-tech">{p.technologies}</p>}
                                </div>
                            ))}
                        </section>
                    )}

                    {education && (
                        <section className="ov-block">
                            <h3>Education</h3>
                            <div className="section-text">
                                {education.split('\n').map((line, idx) => (
                                    <p key={idx}>{line}</p>
                                ))}
                            </div>
                        </section>
                    )}
                    </section>
                </div>
            </main>
        </div>
    );
};

export default OverleafTemplate;
