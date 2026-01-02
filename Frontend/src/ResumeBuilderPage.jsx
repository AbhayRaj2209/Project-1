
import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import EditorControls from './components/EditorControls';
import './index.css';

const ResumeBuilderPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const templateId = searchParams.get('template') || 'classic';
    const resumeId = searchParams.get('id');
    
    const [resumeData, setResumeData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        github: '',
        summary: '',
        education: '',
        experience: '',
        skills: '',
        projects: [],
        achievements: '',
        certifications: '',
        languages: '',
        template: templateId
    });
    
    const [loading, setLoading] = useState(false);
    const previewRef = useRef(null);

    // Load existing resume if ID is provided
    useEffect(() => {
        if (resumeId) {
            fetchResume(resumeId);
        }
    }, [resumeId]);

    const fetchResume = async (id) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/resume/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setResumeData(data);
            }
        } catch (error) {
            console.error('Error fetching resume:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            const url = resumeId 
                ? `http://localhost:5000/api/resume/${resumeId}`
                : 'http://localhost:5000/api/resume/save';
            
            const method = resumeId ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ...resumeData, template: templateId })
            });

            if (response.ok) {
                const data = await response.json();
                alert(resumeId ? 'Resume updated successfully!' : 'Resume saved successfully!');
                if (!resumeId && data.resumeId) {
                    navigate(`/editor?id=${data.resumeId}&template=${templateId}`);
                }
            } else {
                alert('Failed to save resume');
            }
        } catch (error) {
            console.error('Save error:', error);
            alert('Failed to save resume');
        }
    };

    const handleDownloadPdf = () => {
        const input = previewRef.current;
        if (input) {
            html2canvas(input, {
                scale: 2,
                useCORS: true 
            }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save(`${resumeData.name || 'resume'}.pdf`);
            });
        }
    };

    if (loading) {
        return <div style={{ padding: '40px', textAlign: 'center' }}>Loading resume...</div>;
    }

    return (
        <div className="container">
            <div className="form-section">
                <ResumeForm
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                    onSave={handleSave}
                />
            </div>
            <div className="preview-section">
                <EditorControls onDownload={handleDownloadPdf} onSave={handleSave} />
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
