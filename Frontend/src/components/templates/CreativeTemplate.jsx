import React from 'react';
import './CreativeTemplate.css';

const twoColParse = (text) => {
    if (!text) return [];
    return text.split('\n').map(l => l.trim()).filter(Boolean);
}

const CreativeTemplate = ({ resumeData }) => {
    const summary = resumeData.summary && resumeData.summary.trim()
        ? resumeData.summary
        : `${resumeData.degree || 'Aspiring professional'} from ${resumeData.university || ''}`;

    return (
        <div className="creative-resume">
            <div className="accent" />
            <div className="creative-main">
                <header className="creative-header">
                    <div className="creative-title">
                        <h1>{resumeData.name || 'Your Name'}</h1>
                        <p className="meta">{resumeData.degree || ''} {resumeData.rollNo ? `• ${resumeData.rollNo}` : ''}</p>
                        <p className="meta uni">{resumeData.university || ''}</p>
                    </div>

                    <div className="creative-contacts">
                        {resumeData.phone && <a href={`tel:${resumeData.phone}`} className="contact-link">{resumeData.phone}</a>}
                        {resumeData.email && <a href={`mailto:${resumeData.email}`} className="contact-link">{resumeData.email}</a>}
                        {resumeData.github && <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className="contact-link">GitHub</a>}
                        {resumeData.linkedin && <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">LinkedIn</a>}
                    </div>
                </header>

                <div className="creative-summary">
                    <h4>Professional Summary</h4>
                    <p>{summary}</p>
                </div>

                <div className="creative-sections">
                    <section className="left-col">
                        <h4>Projects</h4>
                        {Array.isArray(resumeData.projects) ? resumeData.projects.map((p,i)=> (
                            <div key={i} className="c-proj">
                                <div className="proj-head">
                                    <strong className="proj-title">{p.title || `Project ${i+1}`}</strong>
                                    {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="c-git" aria-label="GitHub link">🔗</a>}
                                </div>
                                <div className="c-desc">{p.description}</div>
                            </div>
                        )) : <div>{resumeData.projects}</div>}

                        <h4>Skills</h4>
                        <div className="c-skills">{(resumeData.skills||'').split(',').map((s,i)=>(<span key={i} className="tag">{s.trim()}</span>))}</div>

                        <h4>Education</h4>
                        <div className="edu-block">
                            <strong>{resumeData.university || 'University / Institute'}</strong>
                            <div>{resumeData.degree || ''} {resumeData.rollNo ? `• ${resumeData.rollNo}` : ''}</div>
                        </div>
                    </section>

                    <section className="right-col">
                        <h4>Experience</h4>
                        <div className="exp-list">{twoColParse(resumeData.experience).map((e,i)=>(<div key={i}>{e}</div>))}</div>

                        <h4>Achievements</h4>
                        <ul>
                            {(resumeData.achievements||'').split('\n').map((a,i)=> a && a.trim() ? <li key={i}>{a}</li> : null)}
                        </ul>

                        <h4>Additional</h4>
                        <div className="additional">
                            <div>Languages: {(resumeData.languages || 'English').toString()}</div>
                            <div>Certifications: {(resumeData.certifications || '—')}</div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CreativeTemplate;
