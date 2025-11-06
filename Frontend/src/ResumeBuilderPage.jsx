
import React, { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import EditorControls from './components/EditorControls'; // Import the new controls
import './index.css';

const ResumeBuilderPage = () => {
    const [searchParams] = useSearchParams();
    const templateId = searchParams.get('template') || 'classic';
    const [resumeData, setResumeData] = useState({ /* ... your existing state ... */ });
    
    // Create a ref to target the preview element for the screenshot
    const previewRef = useRef(null);

    const handleDownloadPdf = () => {
        const input = previewRef.current;
        if (input) {
            html2canvas(input, {
                scale: 2, // Increase scale for better quality
                useCORS: true 
            }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                // A4 paper dimensions: 210mm x 297mm
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save(`${resumeData.name || 'resume'}.pdf`);
            });
        }
    };

    return (
        <div className="container">
            <div className="form-section">
                <ResumeForm
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                />
            </div>
            <div className="preview-section">
                {/* Add the controls above the preview */}
                <EditorControls onDownload={handleDownloadPdf} />

                {/* The ref is attached to this div */}
                <div ref={previewRef}>
                    <ResumePreview
                        resumeData={resumeData}
                        templateId={templateId}
                    />
                </div>
            </div>
        </div>
    );
};

export default ResumeBuilderPage;
