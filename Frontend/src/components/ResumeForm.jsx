// src/components/ResumeForm.jsx
import React from 'react';
import './ResumeForm.css';

const ResumeForm = ({ resumeData, setResumeData }) => {
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
            projects: [...(Array.isArray(prev.projects) ? prev.projects : []), { title: '', description: '', github: '' }]
        }));
    };

    const removeProject = (index) => {
        setResumeData(prev => {
            const projects = Array.isArray(prev.projects) ? [...prev.projects] : [];
            projects.splice(index, 1);
            return { ...prev, projects };
        });
    };

    return (
        <div className="resume-form">
            <fieldset>
                <legend>Header Details</legend>
                <div className="form-group">
                    <label>Full Name</label>
                    <input name="name" value={resumeData.name || ''} onChange={handleChange} placeholder="e.g., Abhay Raj" />
                </div>
                <div className="form-group">
                    <label>University / Institute Name</label>
                    <input name="university" value={resumeData.university || ''} onChange={handleChange} placeholder="e.g., Rajiv Gandhi Institute of Petroleum Technology" />
                </div>
                 <div className="form-group">
                    <label>Degree & Branch</label>
                    <input name="degree" value={resumeData.degree || ''} onChange={handleChange} placeholder="e.g., Bachelor of Technology, Information Technology" />
                </div>
                 <div className="form-group">
                    <label>Roll Number</label>
                    <input name="rollNo" value={resumeData.rollNo || ''} onChange={handleChange} placeholder="e.g., 23IT3001" />
                </div>
                <div className="form-group">
                    <label>
                        <input type="checkbox" name="showLogo" checked={!!resumeData.showLogo} onChange={handleChange} />
                        {' '}Show Institute / Personal Logo
                    </label>
                    {resumeData.showLogo && (
                        <input name="logoUrl" value={resumeData.logoUrl || ''} onChange={handleChange} placeholder="Logo image URL (optional)" />
                    )}
                </div>
                <div className="form-group">
                    <label>Classic Template Accent Color</label>
                    <select name="templateColor" value={resumeData.templateColor || 'default'} onChange={handleChange}>
                        <option value="default">Default (neutral)</option>
                        <option value="navy">Navy</option>
                        <option value="charcoal">Charcoal</option>
                        <option value="teal">Teal</option>
                        <option value="maroon">Maroon</option>
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <legend>Contact Information</legend>
                <div className="form-group">
                    <label>Email</label>
                    <input name="email" type="email" value={resumeData.email || ''} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input name="phone" type="tel" value={resumeData.phone || ''} onChange={handleChange} />
                </div>
                 <div className="form-group">
                    <label>LinkedIn Profile URL</label>
                    <input name="linkedin" value={resumeData.linkedin || ''} onChange={handleChange} />
                </div>
                 <div className="form-group">
                    <label>GitHub Profile URL</label>
                    <input name="github" value={resumeData.github || ''} onChange={handleChange} />
                </div>
            </fieldset>

            <fieldset>
                <legend>Main Sections</legend>
                <div className="form-group">
                    <label>Education</label>
                    <textarea name="education" value={resumeData.education || ''} onChange={handleChange} rows="5" placeholder="e.g., Rajiv Gandhi Institute... | Jais, Amethi | 2023-27"/>
                </div>
                <div className="form-group">
                    <label>Experience</label>
                    <textarea name="experience" value={resumeData.experience || ''} onChange={handleChange} rows="7" placeholder="e.g., Girl Script Summer of Code | Contributor | Remote..."/>
                </div>
                <div className="form-group">
                    <label>Projects</label>

                    {(Array.isArray(resumeData.projects) ? resumeData.projects : []).map((proj, idx) => (
                        <div className="project-item" key={idx}>
                            <input
                                placeholder="Project Title"
                                value={proj.title || ''}
                                onChange={(e) => handleProjectChange(idx, 'title', e.target.value)}
                            />
                            <textarea
                                placeholder="Short description"
                                value={proj.description || ''}
                                onChange={(e) => handleProjectChange(idx, 'description', e.target.value)}
                                rows="3"
                            />
                            <input
                                placeholder="GitHub URL (optional)"
                                value={proj.github || ''}
                                onChange={(e) => handleProjectChange(idx, 'github', e.target.value)}
                            />
                            <div className="project-actions">
                                <button type="button" className="small-btn" onClick={() => removeProject(idx)}>Remove</button>
                            </div>
                        </div>
                    ))}
                    <div style={{ marginTop: 8 }}>
                        <button type="button" onClick={addProject}>+ Add Project</button>
                    </div>
                </div>
                <div className="form-group">
                    <label>Achievements (one per line)</label>
                    <textarea name="achievements" value={resumeData.achievements || ''} onChange={handleChange} rows="4" placeholder="e.g., Won 1st prize in Hackathon - 2024"/>
                </div>
                <div className="form-group">
                    <label>Technical Skills</label>
                    <textarea name="skills" value={resumeData.skills || ''} onChange={handleChange} rows="4" />
                </div>
            </fieldset>
        </div>
    );
};

export default ResumeForm;
