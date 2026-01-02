// src/components/ResumeForm.jsx
import React from 'react';
import './ResumeForm.css';

const ResumeForm = ({ resumeData, setResumeData, onSave }) => {
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

    return (
        <div className="resume-form">
            <div className="form-header">
                <h2>Resume Builder</h2>
                <p>Fill in your information to create a professional resume</p>
            </div>

            <fieldset>
                <legend>📋 Personal Information</legend>
                <div className="form-group">
                    <label>Full Name *</label>
                    <input 
                        name="name" 
                        value={resumeData.name || ''} 
                        onChange={handleChange} 
                        placeholder="John Doe"
                        required
                    />
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Email *</label>
                        <input 
                            name="email" 
                            type="email" 
                            value={resumeData.email || ''} 
                            onChange={handleChange}
                            placeholder="john@example.com"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input 
                            name="phone" 
                            type="tel" 
                            value={resumeData.phone || ''} 
                            onChange={handleChange}
                            placeholder="+1 234 567 8900"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <input 
                        name="location" 
                        value={resumeData.location || ''} 
                        onChange={handleChange}
                        placeholder="City, State, Country"
                    />
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>LinkedIn URL</label>
                        <input 
                            name="linkedin" 
                            type="url" 
                            value={resumeData.linkedin || ''} 
                            onChange={handleChange}
                            placeholder="https://linkedin.com/in/yourprofile"
                        />
                    </div>
                    <div className="form-group">
                        <label>GitHub URL</label>
                        <input 
                            name="github" 
                            type="url" 
                            value={resumeData.github || ''} 
                            onChange={handleChange}
                            placeholder="https://github.com/yourusername"
                        />
                    </div>
                </div>
            </fieldset>

            <fieldset>
                <legend>💼 Professional Summary</legend>
                <div className="form-group">
                    <label>Summary</label>
                    <textarea 
                        name="summary" 
                        value={resumeData.summary || ''} 
                        onChange={handleChange} 
                        rows="4"
                        placeholder="Brief overview of your professional experience and key skills..."
                    />
                </div>
            </fieldset>

            <fieldset>
                <legend>🎓 Education</legend>
                <div className="form-group">
                    <label>Education Details</label>
                    <textarea 
                        name="education" 
                        value={resumeData.education || ''} 
                        onChange={handleChange} 
                        rows="5"
                        placeholder="University Name | Degree | GPA | Years"
                    />
                </div>
            </fieldset>

            <fieldset>
                <legend>💻 Work Experience</legend>
                <div className="form-group">
                    <label>Experience</label>
                    <textarea 
                        name="experience" 
                        value={resumeData.experience || ''} 
                        onChange={handleChange} 
                        rows="8"
                        placeholder="Company Name | Position | Duration&#10;• Responsibility/Achievement 1&#10;• Responsibility/Achievement 2"
                    />
                </div>
            </fieldset>

            <fieldset>
                <legend>🚀 Projects</legend>
                {(Array.isArray(resumeData.projects) ? resumeData.projects : []).map((proj, idx) => (
                    <div className="project-item" key={idx}>
                        <div className="project-header">
                            <h4>Project {idx + 1}</h4>
                            <button 
                                type="button" 
                                className="remove-btn" 
                                onClick={() => removeProject(idx)}
                                title="Remove Project"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="form-group">
                            <input
                                placeholder="Project Title"
                                value={proj.title || ''}
                                onChange={(e) => handleProjectChange(idx, 'title', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                placeholder="Project description and key features..."
                                value={proj.description || ''}
                                onChange={(e) => handleProjectChange(idx, 'description', e.target.value)}
                                rows="3"
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <input
                                    placeholder="Technologies used"
                                    value={proj.technologies || ''}
                                    onChange={(e) => handleProjectChange(idx, 'technologies', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    placeholder="Project link/GitHub URL"
                                    value={proj.link || ''}
                                    onChange={(e) => handleProjectChange(idx, 'link', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
                <button type="button" className="add-btn" onClick={addProject}>
                    + Add Project
                </button>
            </fieldset>

            <fieldset>
                <legend>⚡ Skills</legend>
                <div className="form-group">
                    <label>Technical Skills</label>
                    <textarea 
                        name="skills" 
                        value={resumeData.skills || ''} 
                        onChange={handleChange} 
                        rows="4"
                        placeholder="Languages: Python, JavaScript, Java&#10;Frameworks: React, Node.js, Django&#10;Tools: Git, Docker, AWS"
                    />
                </div>
            </fieldset>

            <fieldset>
                <legend>🏆 Additional Information</legend>
                <div className="form-group">
                    <label>Achievements & Awards</label>
                    <textarea 
                        name="achievements" 
                        value={resumeData.achievements || ''} 
                        onChange={handleChange} 
                        rows="4"
                        placeholder="• Won 1st prize in Hackathon 2024&#10;• Published research paper in XYZ Journal"
                    />
                </div>
                <div className="form-group">
                    <label>Certifications</label>
                    <textarea 
                        name="certifications" 
                        value={resumeData.certifications || ''} 
                        onChange={handleChange} 
                        rows="3"
                        placeholder="AWS Certified Solutions Architect&#10;Google Cloud Professional"
                    />
                </div>
                <div className="form-group">
                    <label>Languages</label>
                    <input 
                        name="languages" 
                        value={resumeData.languages || ''} 
                        onChange={handleChange}
                        placeholder="English (Fluent), Spanish (Intermediate)"
                    />
                </div>
            </fieldset>

            {onSave && (
                <div className="form-actions">
                    <button type="button" className="save-main-btn" onClick={onSave}>
                        💾 Save Resume
                    </button>
                </div>
            )}
        </div>
    );
};

export default ResumeForm;
