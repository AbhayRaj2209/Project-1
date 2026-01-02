// src/TemplatePage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './TemplatePage.css';

const templates = [
    {
        id: 'classic',
        name: 'Classic Professional',
        description: 'Traditional layout perfect for corporate jobs',
        category: 'Professional',
        color: '#2563eb',
        icon: '📄'
    },
    {
        id: 'modern',
        name: 'Modern Minimalist',
        description: 'Clean and contemporary design',
        category: 'Modern',
        color: '#7c3aed',
        icon: '✨'
    },
    {
        id: 'creative',
        name: 'Creative Column',
        description: 'Stand out with a unique two-column layout',
        category: 'Creative',
        color: '#db2777',
        icon: '🎨'
    },
    {
        id: 'overleaf',
        name: 'Academic LaTeX',
        description: 'Professional academic and research style',
        category: 'Academic',
        color: '#059669',
        icon: '🎓'
    },
    {
        id: 'executive',
        name: 'Executive Elite',
        description: 'Premium design for senior positions',
        category: 'Executive',
        color: '#ea580c',
        icon: '👔'
    },
    {
        id: 'tech',
        name: 'Tech Stack',
        description: 'Optimized for software engineers',
        category: 'Tech',
        color: '#0891b2',
        icon: '💻'
    },
    {
        id: 'designer',
        name: 'Design Portfolio',
        description: 'Showcase your creative work',
        category: 'Creative',
        color: '#c026d3',
        icon: '🎭'
    },
    {
        id: 'simple',
        name: 'Simple & Clean',
        description: 'Minimalist approach with maximum impact',
        category: 'Modern',
        color: '#65a30d',
        icon: '📋'
    }
];

const categories = ['All', 'Professional', 'Modern', 'Creative', 'Academic', 'Executive', 'Tech'];

const TemplatePage = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [hoveredTemplate, setHoveredTemplate] = useState(null);

    const filteredTemplates = selectedCategory === 'All' 
        ? templates 
        : templates.filter(t => t.category === selectedCategory);

    const handleTemplateSelect = (templateId) => {
        // Navigate to the editor, passing the template ID
        navigate(`/editor?template=${templateId}`);
    };

    return (
        <div className="template-page-container">
            <div className="template-page-header">
                <div className="header-top">
                    <Link to="/" className="back-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Back to Dashboard
                    </Link>
                </div>
                <div className="header-content">
                    <h1>Choose Your Perfect Template</h1>
                    <p>Select from our collection of professionally designed resume templates</p>
                </div>
                
                {/* Category Filter */}
                <div className="category-filter">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="templates-count">
                {filteredTemplates.length} {filteredTemplates.length === 1 ? 'Template' : 'Templates'} Available
            </div>

            <div className="template-grid">
                {filteredTemplates.map((template) => (
                    <div 
                        key={template.id} 
                        className="template-card"
                        onMouseEnter={() => setHoveredTemplate(template.id)}
                        onMouseLeave={() => setHoveredTemplate(null)}
                        onClick={() => handleTemplateSelect(template.id)}
                    >
                        <div className="template-preview" style={{ borderColor: template.color }}>
                            <div className="template-icon" style={{ background: `linear-gradient(135deg, ${template.color}22, ${template.color}44)` }}>
                                <span style={{ fontSize: '4rem' }}>{template.icon}</span>
                            </div>
                            <div className="template-badge" style={{ backgroundColor: template.color }}>
                                {template.category}
                            </div>
                        </div>
                        <div className="template-info">
                            <h3>{template.name}</h3>
                            <p>{template.description}</p>
                            <button 
                                className="select-template-btn"
                                style={{ 
                                    backgroundColor: hoveredTemplate === template.id ? template.color : '#f3f4f6',
                                    color: hoveredTemplate === template.id ? 'white' : '#374151'
                                }}
                            >
                                {hoveredTemplate === template.id ? 'Use This Template →' : 'Select'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredTemplates.length === 0 && (
                <div className="no-templates">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <h3>No templates found</h3>
                    <p>Try selecting a different category</p>
                </div>
            )}
        </div>
    );
};

export default TemplatePage;
