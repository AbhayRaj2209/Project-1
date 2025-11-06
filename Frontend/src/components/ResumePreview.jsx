// src/components/ResumePreview.jsx
import React from 'react';
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import CreativeTemplate from './templates/CreativeTemplate';

const ResumePreview = ({ resumeData, templateId }) => {
    
    const renderTemplate = () => {
            switch (templateId) {
            case 'classic':
                return <ClassicTemplate resumeData={resumeData} />;
            case 'modern':
                return <ModernTemplate resumeData={resumeData} />;
            case 'creative':
                return <CreativeTemplate resumeData={resumeData} />;
            default:
                // If no template is specified, default to the classic one
                return <ClassicTemplate resumeData={resumeData} />;
        }
    };

    return (
        <div className="resume-preview-container">
            {renderTemplate()}
        </div>
    );
};

export default ResumePreview;
