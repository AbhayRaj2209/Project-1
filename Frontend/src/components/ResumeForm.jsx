// src/components/ResumeForm.jsx
import React, { useState } from 'react';
import Icon from './Icon';
import './ResumeForm.css';

const Field = ({ id, label, required, hint, children }) => (
    <div className="ui-field">
        <label className="ui-label" htmlFor={id}>
            {label}
            {required && <span className="ui-req" aria-hidden="true">*</span>}
        </label>
        {children}
        {hint && <span className="ui-hint">{hint}</span>}
    </div>
);

const Section = ({ id, icon, title, description, complete, open, onToggle, children }) => (
    <section className={`rf-section${open ? ' is-open' : ''}`}>
        <h3 className="rf-section-heading">
            <button
                type="button"
                className="rf-section-head"
                aria-expanded={open}
                aria-controls={`rf-body-${id}`}
                onClick={onToggle}
            >
                <span className="rf-section-icon"><Icon name={icon} size={18} /></span>
                <span className="rf-section-title">
                    <span>{title}</span>
                    <small>{description}</small>
                </span>
                <span className={`rf-section-check${complete ? ' is-complete' : ''}`} title={complete ? 'Completed' : 'Not filled yet'}>
                    <Icon name="check" size={12} strokeWidth={3} />
                </span>
                <Icon name="chevronDown" size={18} className="rf-section-chevron" />
            </button>
        </h3>
        <div id={`rf-body-${id}`} className="rf-section-body" hidden={!open}>
            {children}
        </div>
    </section>
);

const filled = (...values) => values.some((v) => typeof v === 'string' && v.trim() !== '');

const ResumeForm = ({ resumeData, setResumeData, onSave, saving = false }) => {
    const [openSections, setOpenSections] = useState({ personal: true });

    const toggle = (key) => setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setResumeData(prev => ({ ...prev, [name]: newValue }));
    };

    const handleProjectChange = (index, field, value) => {
        setResumeData(prev => {
            const projects = Array.isArray(prev.projects) ? [...prev.projects] : [];
            projects[index] = { ...(projects[index] || {}), [field]: value };
            return { ...prev, projects };
        });
    };

    const addProject = () => {
        setResumeData(prev => ({
            ...prev,
            projects: [...(Array.isArray(prev.projects) ? prev.projects : []), { title: '', description: '', technologies: '', link: '' }]
        }));
    };

    const removeProject = (index) => {
        setResumeData(prev => {
            const projects = Array.isArray(prev.projects) ? [...prev.projects] : [];
            projects.splice(index, 1);
            return { ...prev, projects };
        });
    };

    const projects = Array.isArray(resumeData.projects) ? resumeData.projects : [];

    const input = (name, props = {}) => (
        <input
            id={`rf-${name}`}
            name={name}
            className="ui-input"
            value={resumeData[name] || ''}
            onChange={handleChange}
            {...props}
        />
    );

    const textarea = (name, props = {}) => (
        <textarea
            id={`rf-${name}`}
            name={name}
            className="ui-textarea"
            value={resumeData[name] || ''}
            onChange={handleChange}
            {...props}
        />
    );

    const sections = {
        personal: filled(resumeData.name) && filled(resumeData.email),
        summary: filled(resumeData.summary),
        experience: filled(resumeData.experience),
        education: filled(resumeData.education),
        projects: projects.some((p) => filled(p?.title)),
        skills: filled(resumeData.skills),
        additional: filled(resumeData.achievements, resumeData.certifications, resumeData.languages),
    };
    const completed = Object.values(sections).filter(Boolean).length;
    const total = Object.keys(sections).length;

    return (
        <div className="resume-form rf">
            <div className="rf-intro">
                <div>
                    <h2>Resume details</h2>
                    <p>Changes appear in the preview instantly.</p>
                </div>
                <div className="rf-progress" aria-label={`${completed} of ${total} sections completed`}>
                    <span className="rf-progress-text">{completed}/{total}</span>
                    <span className="rf-progress-bar">
                        <span style={{ width: `${(completed / total) * 100}%` }} />
                    </span>
                </div>
            </div>

            <Section
                id="personal"
                icon="user"
                title="Personal information"
                description="Name, contact details and links"
                complete={sections.personal}
                open={!!openSections.personal}
                onToggle={() => toggle('personal')}
            >
                <Field id="rf-name" label="Full name" required>
                    {input('name', { placeholder: 'John Doe', required: true, autoComplete: 'name' })}
                </Field>
                <div className="rf-row">
                    <Field id="rf-email" label="Email" required>
                        {input('email', { type: 'email', placeholder: 'john@example.com', required: true, autoComplete: 'email' })}
                    </Field>
                    <Field id="rf-phone" label="Phone">
                        {input('phone', { type: 'tel', placeholder: '+1 234 567 8900', autoComplete: 'tel' })}
                    </Field>
                </div>
                <Field id="rf-location" label="Location">
                    {input('location', { placeholder: 'City, State, Country' })}
                </Field>
                <div className="rf-row">
                    <Field id="rf-linkedin" label="LinkedIn URL">
                        {input('linkedin', { type: 'url', placeholder: 'https://linkedin.com/in/yourprofile' })}
                    </Field>
                    <Field id="rf-github" label="GitHub URL">
                        {input('github', { type: 'url', placeholder: 'https://github.com/yourusername' })}
                    </Field>
                </div>
            </Section>

            <Section
                id="summary"
                icon="file"
                title="Professional summary"
                description="A short pitch about who you are"
                complete={sections.summary}
                open={!!openSections.summary}
                onToggle={() => toggle('summary')}
            >
                <Field id="rf-summary" label="Summary" hint="2–4 sentences highlighting your experience, strengths and goals.">
                    {textarea('summary', { rows: 4, placeholder: 'Brief overview of your professional experience and key skills...' })}
                </Field>
            </Section>

            <Section
                id="experience"
                icon="briefcase"
                title="Work experience"
                description="Roles, companies and achievements"
                complete={sections.experience}
                open={!!openSections.experience}
                onToggle={() => toggle('experience')}
            >
                <Field id="rf-experience" label="Experience" hint="One role per block. Separate company, position and dates with “|”, then list achievements with “•”.">
                    {textarea('experience', {
                        rows: 8,
                        placeholder: 'Company Name | Position | Duration\n• Responsibility/Achievement 1\n• Responsibility/Achievement 2',
                    })}
                </Field>
            </Section>

            <Section
                id="education"
                icon="graduation"
                title="Education"
                description="Degrees, institutions and grades"
                complete={sections.education}
                open={!!openSections.education}
                onToggle={() => toggle('education')}
            >
                <Field id="rf-education" label="Education details" hint="One entry per line. Separate details with “|”.">
                    {textarea('education', { rows: 5, placeholder: 'University Name | Degree | GPA | Years' })}
                </Field>
            </Section>

            <Section
                id="projects"
                icon="folder"
                title="Projects"
                description={projects.length ? `${projects.length} project${projects.length === 1 ? '' : 's'}` : 'Showcase what you’ve built'}
                complete={sections.projects}
                open={!!openSections.projects}
                onToggle={() => toggle('projects')}
            >
                {projects.length === 0 && (
                    <p className="rf-empty">No projects yet. Add one to highlight hands-on work.</p>
                )}
                {projects.map((proj, idx) => (
                    <div className="rf-project" key={idx}>
                        <div className="rf-project-head">
                            <span className="rf-project-num">{idx + 1}</span>
                            <h4>{proj.title?.trim() || `Project ${idx + 1}`}</h4>
                            <button
                                type="button"
                                className="ui-icon-btn ui-icon-btn--plain ui-icon-btn--danger"
                                onClick={() => removeProject(idx)}
                                aria-label={`Remove project ${idx + 1}`}
                                title="Remove project"
                            >
                                <Icon name="trash" size={16} />
                            </button>
                        </div>
                        <Field id={`rf-project-${idx}-title`} label="Title">
                            <input
                                id={`rf-project-${idx}-title`}
                                className="ui-input"
                                placeholder="Project Title"
                                value={proj.title || ''}
                                onChange={(e) => handleProjectChange(idx, 'title', e.target.value)}
                            />
                        </Field>
                        <Field id={`rf-project-${idx}-description`} label="Description">
                            <textarea
                                id={`rf-project-${idx}-description`}
                                className="ui-textarea"
                                placeholder="Project description and key features..."
                                value={proj.description || ''}
                                onChange={(e) => handleProjectChange(idx, 'description', e.target.value)}
                                rows="3"
                            />
                        </Field>
                        <div className="rf-row">
                            <Field id={`rf-project-${idx}-technologies`} label="Technologies">
                                <input
                                    id={`rf-project-${idx}-technologies`}
                                    className="ui-input"
                                    placeholder="React, Node.js, MongoDB"
                                    value={proj.technologies || ''}
                                    onChange={(e) => handleProjectChange(idx, 'technologies', e.target.value)}
                                />
                            </Field>
                            <Field id={`rf-project-${idx}-link`} label="Link">
                                <input
                                    id={`rf-project-${idx}-link`}
                                    className="ui-input"
                                    placeholder="Project link/GitHub URL"
                                    value={proj.link || ''}
                                    onChange={(e) => handleProjectChange(idx, 'link', e.target.value)}
                                />
                            </Field>
                        </div>
                    </div>
                ))}
                <button type="button" className="ui-btn ui-btn--soft rf-add" onClick={addProject}>
                    <Icon name="plus" size={16} /> Add project
                </button>
            </Section>

            <Section
                id="skills"
                icon="zap"
                title="Skills"
                description="Languages, frameworks and tools"
                complete={sections.skills}
                open={!!openSections.skills}
                onToggle={() => toggle('skills')}
            >
                <Field id="rf-skills" label="Technical skills" hint="Group related skills on a line, e.g. “Languages: …”.">
                    {textarea('skills', {
                        rows: 4,
                        placeholder: 'Languages: Python, JavaScript, Java\nFrameworks: React, Node.js, Django\nTools: Git, Docker, AWS',
                    })}
                </Field>
            </Section>

            <Section
                id="additional"
                icon="award"
                title="Additional information"
                description="Achievements, certifications, languages"
                complete={sections.additional}
                open={!!openSections.additional}
                onToggle={() => toggle('additional')}
            >
                <Field id="rf-achievements" label="Achievements & awards">
                    {textarea('achievements', {
                        rows: 4,
                        placeholder: '• Won 1st prize in Hackathon 2024\n• Published research paper in XYZ Journal',
                    })}
                </Field>
                <Field id="rf-certifications" label="Certifications">
                    {textarea('certifications', {
                        rows: 3,
                        placeholder: 'AWS Certified Solutions Architect\nGoogle Cloud Professional',
                    })}
                </Field>
                <Field id="rf-languages" label="Languages">
                    {input('languages', { placeholder: 'English (Fluent), Spanish (Intermediate)' })}
                </Field>
            </Section>

            {onSave && (
                <div className="rf-actions">
                    <button type="button" className="ui-btn ui-btn--primary ui-btn--lg ui-btn--block" onClick={onSave} disabled={saving}>
                        {saving ? <span className="ui-spinner" /> : <Icon name="save" size={18} />}
                        Save resume
                    </button>
                </div>
            )}
        </div>
    );
};

export default ResumeForm;
