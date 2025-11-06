// src/TemplatePage.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './TemplatePage.css';

// --- UPDATED with new, stable image URLs ---
const templates = [
    {
        id: 'classic',
        name: 'Classic Professional',
        imageUrl: 'https://d.novoresume.com/images/doc/functional-resume-template.png'
    },
    {
        id: 'modern',
        name: 'Modern Minimalist',
        imageUrl: 'https://cultivatedculture.com/wp-content/themes/x5-child/assets/images/templates/template5.jpg'
    },
    {
        id: 'creative',
        name: 'Creative Column',
        imageUrl: 'https://website.cdn.novoresume.com/static/resume-templates/skill-based-resume-template.png?auto=format&fit=max&w=1920&q=80'
    }
];

const TemplatePage = () => {
    const navigate = useNavigate();

    const handleTemplateSelect = (templateId) => {
        // Navigate to the editor, passing the template ID
        navigate(`/editor?template=${templateId}`);
    };

    return (
        <div className="template-page-container">
            <header className="template-header">
                <h1>Choose Your Template</h1>
                <p>Select a layout to get started. You can customize it later.</p>
                <Link to="/" className="back-to-dashboard-link">← Back to Dashboard</Link>
            </header>
            <div className="template-grid">
                {templates.map((template) => (
                    <div key={template.id} className="template-card">
                        <img src={template.imageUrl} alt={template.name} className="template-image" />
                        <div className="template-overlay">
                            <h3>{template.name}</h3>
                            <button 
                                onClick={() => handleTemplateSelect(template.id)} 
                                className="use-template-btn"
                            >
                                Use This Template
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TemplatePage;
