import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import EditorControls from './components/EditorControls';
import ScaledPaper from './components/ScaledPaper';
import { ToastRegion } from './components/Toast';
import { useToast } from './components/useToast';
import { getTemplate } from './data/templates';
import { API_BASE_URL, authHeaders } from './utils/auth';
import './ResumeBuilder.css';

const ResumeBuilderPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const templateId = getTemplate(searchParams.get('template') || 'classic').id;
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
    const [saving, setSaving] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [dirty, setDirty] = useState(false);
    const [view, setView] = useState('edit');
    const previewRef = useRef(null);
    const { toasts, showToast } = useToast();

    // Wrap the setter so any edit from the form marks the resume as unsaved
    const updateResumeData = useCallback((updater) => {
        setResumeData(updater);
        setDirty(true);
    }, []);

    const fetchResume = useCallback(async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/api/resume/${id}`, {
                headers: authHeaders()
            });
            if (response.ok) {
                const data = await response.json();
                setResumeData(data);
                setDirty(false);
            } else {
                showToast('Could not load this resume', 'error');
            }
        } catch (error) {
            console.error('Error fetching resume:', error);
            showToast('Could not load this resume', 'error');
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    // Load existing resume if ID is provided
    useEffect(() => {
        if (resumeId) {
            fetchResume(resumeId);
        }
    }, [resumeId, fetchResume]);

    const handleTemplateChange = (nextId) => {
        const next = new URLSearchParams(searchParams);
        next.set('template', nextId);
        setSearchParams(next, { replace: true });
        if (resumeId) setDirty(true);
    };

    const handleSave = async () => {
        if (!resumeData.name?.trim() || !resumeData.email?.trim()) {
            showToast('Add your name and email before saving', 'error');
            setView('edit');
            return;
        }

        setSaving(true);
        try {
            const url = resumeId
                ? `${API_BASE_URL}/api/resume/${resumeId}`
                : `${API_BASE_URL}/api/resume/save`;

            const method = resumeId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: authHeaders({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({ ...resumeData, template: templateId })
            });

            if (response.ok) {
                const data = await response.json();
                setDirty(false);
                showToast(resumeId ? 'Resume updated' : 'Resume saved');
                if (!resumeId && data.resumeId) {
                    navigate(`/editor?id=${data.resumeId}&template=${templateId}`);
                }
            } else {
                const data = await response.json().catch(() => ({}));
                showToast(data.details || data.message || 'Failed to save resume', 'error');
            }
        } catch (error) {
            console.error('Save error:', error);
            showToast('Failed to save resume', 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleDownloadPdf = async () => {
        setDownloading(true);
        // On small screens the preview pane is hidden while editing; it must be
        // laid out to be captured, so show it and wait for layout.
        setView('preview');
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

        const input = previewRef.current;
        if (!input) {
            setDownloading(false);
            return;
        }

        try {
            const canvas = await html2canvas(input, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
                // The on-screen preview is scaled to fit. offsetWidth/Height ignore
                // transforms, so they give the true page size; the clone is un-scaled
                // to match (transform-origin is top-left, so the origin is unchanged).
                width: input.offsetWidth,
                height: input.offsetHeight,
                onclone: (doc) => {
                    doc.querySelectorAll('[data-preview-scale]').forEach((el) => {
                        el.style.transform = 'none';
                    });
                }
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${resumeData.name || 'resume'}.pdf`);
        } catch (error) {
            console.error('PDF error:', error);
            showToast('Could not generate the PDF', 'error');
        } finally {
            setDownloading(false);
        }
    };

    const status = loading
        ? { tone: 'idle', label: 'Loading…' }
        : saving
            ? { tone: 'idle', label: 'Saving…' }
            : dirty
                ? { tone: 'dirty', label: 'Unsaved changes' }
                : resumeId
                    ? { tone: 'saved', label: 'All changes saved' }
                    : { tone: 'idle', label: 'Not saved yet' };

    return (
        <div className={`ed ed--view-${view}`}>
            <EditorControls
                title={resumeData.name?.trim() || 'Untitled resume'}
                status={status}
                templateId={templateId}
                onTemplateChange={handleTemplateChange}
                onSave={handleSave}
                onDownload={handleDownloadPdf}
                onPrint={() => window.print()}
                saving={saving}
                downloading={downloading}
                view={view}
                onViewChange={setView}
            />

            <div className="ed-panes">
                <div className="ed-form-pane">
                    {loading ? (
                        <div className="ed-form-loading">
                            {[0, 1, 2, 3, 4].map((i) => (
                                <div key={i} className="ui-skeleton" style={{ height: i === 0 ? 220 : 68 }} />
                            ))}
                        </div>
                    ) : (
                        <ResumeForm
                            resumeData={resumeData}
                            setResumeData={updateResumeData}
                            onSave={handleSave}
                            saving={saving}
                        />
                    )}
                </div>

                <div className="ed-preview-pane" aria-label="Resume preview">
                    <div className="ed-preview-meta">
                        <span>
                            <span className="ed-preview-dot" style={{ background: getTemplate(templateId).color }} />
                            {getTemplate(templateId).name}
                        </span>
                        <span>Live preview</span>
                    </div>
                    <ScaledPaper paperRef={previewRef}>
                        <ResumePreview
                            resumeData={resumeData}
                            templateId={templateId}
                        />
                    </ScaledPaper>
                </div>
            </div>

            <ToastRegion toasts={toasts} />
        </div>
    );
};

export default ResumeBuilderPage;
