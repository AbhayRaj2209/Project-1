// src/components/ResumePreview.jsx
import React from 'react';
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import JakesTemplate from './templates/JakesTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';
import TechTemplate from './templates/TechTemplate';
import DesignerTemplate from './templates/DesignerTemplate';
import SimpleTemplate from './templates/SimpleTemplate';

const ResumePreview = ({ resumeData, templateId }) => {
    
    const renderTemplate = () => {
            switch (templateId) {
            case 'classic':
                return <ClassicTemplate resumeData={resumeData} />;
            case 'modern':
                return <ModernTemplate resumeData={resumeData} />;
            case 'creative':
                return <CreativeTemplate resumeData={resumeData} />;
            case 'jakes':
                return <JakesTemplate resumeData={resumeData} />;
            case 'executive':
                return <ExecutiveTemplate resumeData={resumeData} />;
            case 'tech':
                return <TechTemplate resumeData={resumeData} />;
            case 'designer':
                return <DesignerTemplate resumeData={resumeData} />;
            case 'simple':
                return <SimpleTemplate resumeData={resumeData} />;
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
