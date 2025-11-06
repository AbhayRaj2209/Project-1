import React from 'react';
import './ModernTemplate.css';

const parseLines = (text) => {
    if (!text) return [];
    return text.split('\n').map(l => l.trim()).filter(Boolean);
}

const ModernTemplate = ({ resumeData }) => {
    return (
        <div className="modern-resume">
            <aside className="modern-side">
                <div className="side-profile">
                    <div className="side-name">{resumeData.name || 'Your Name'}</div>
                    <div className="side-role">{resumeData.degree || ''}</div>
                </div>

                <div className="side-block">
                    <h4>Contact</h4>
                    <p>{resumeData.phone}</p>
                    <p>{resumeData.email}</p>
                    {resumeData.github && <p><a href={resumeData.github} target="_blank" rel="noopener noreferrer">GitHub</a></p>}
                    {resumeData.linkedin && <p><a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>}
                </div>

                <div className="side-block">
                    <h4>Skills</h4>
                    <div className="skill-list">{(resumeData.skills || '').split(',').map((s,i)=> <span key={i} className="skill-pill">{s.trim()}</span>)}</div>
                </div>
            </aside>

            <main className="modern-main">
                <header className="modern-header">
                    <h1>{resumeData.name || 'Your Name'}</h1>
                    <p className="subtle">{resumeData.university || ''} — {resumeData.rollNo || ''}</p>
                </header>

                <section>
                    <h3>Summary</h3>
                    <div className="section-content">{resumeData.summary || ''}</div>
                </section>

                <section>
                    <h3>Experience</h3>
                    <div className="section-content">
                        {(resumeData.experience || '').split('\n').map((line, idx) => <div key={idx}>{line}</div>)}
                    </div>
                </section>

                <section>
                    <h3>Projects</h3>
                    <div className="section-content">
                        {Array.isArray(resumeData.projects) ? resumeData.projects.map((p, i) => (
                            <div key={i} className="proj-row">
                                <strong>{p.title}</strong>
                                {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="proj-link">Repo</a>}
                                <div className="proj-desc">{p.description}</div>
                            </div>
                        )) : <div>{resumeData.projects}</div>}
                    </div>
                </section>

                <section>
                    <h3>Achievements</h3>
                    <ul>
                        {parseLines(resumeData.achievements).map((a, i) => <li key={i}>{a}</li>)}
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default ModernTemplate;
