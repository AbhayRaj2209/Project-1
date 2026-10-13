// src/components/TemplatePage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from './Icon';
import TemplateThumb from './TemplateThumb';
import { templates, categories } from '../data/templates';
import './TemplatePage.css';

const TemplatePage = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredTemplates = selectedCategory === 'All'
        ? templates
        : templates.filter((t) => t.category === selectedCategory);

    const handleTemplateSelect = (templateId) => {
        // Navigate to the editor, passing the template ID
        navigate(`/editor?template=${templateId}`);
    };

    return (
        <div className="ui-page tpl">
            <Link to="/" className="tpl-back">
                <Icon name="arrowLeft" size={16} /> Dashboard
            </Link>

            <header className="ui-page-head tpl-head">
                <div>
                    <span className="ui-eyebrow">Templates</span>
                    <h1>Choose a template</h1>
                    <p>Every template is ATS-friendly and fully editable. You can switch templates at any time from the editor.</p>
                </div>
            </header>

            <div className="tpl-toolbar">
                <div className="tpl-filters" role="group" aria-label="Filter by category">
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            className="ui-chip"
                            aria-pressed={selectedCategory === category}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <span className="tpl-count">
                    {filteredTemplates.length} {filteredTemplates.length === 1 ? 'template' : 'templates'}
                </span>
            </div>

            <div className="tpl-grid">
                {filteredTemplates.map((template, i) => (
                    <button
                        key={template.id}
                        type="button"
                        className="tpl-card tt-hover"
                        style={{ '--tpl-color': template.color, animationDelay: `${i * 40}ms` }}
                        onClick={() => handleTemplateSelect(template.id)}
                        aria-label={`Use ${template.name} template`}
                    >
                        <div className="tpl-preview">
                            <TemplateThumb layout={template.layout} color={template.color} />
                            <span className="tpl-use">
                                Use template <Icon name="arrowRight" size={16} />
                            </span>
                        </div>
                        <div className="tpl-info">
                            <div className="tpl-info-top">
                                <h3>{template.name}</h3>
                                <span className="tpl-category">
                                    <span className="tpl-dot" />
                                    {template.category}
                                </span>
                            </div>
                            <p>{template.description}</p>
                        </div>
                    </button>
                ))}
            </div>

            {filteredTemplates.length === 0 && (
                <div className="tpl-empty">
                    <Icon name="alert" size={28} />
                    <h3>No templates found</h3>
                    <p>Try selecting a different category.</p>
                </div>
            )}
        </div>
    );
};

export default TemplatePage;
