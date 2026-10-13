// src/components/ATSScoreChecker.jsx
import React, { useRef, useState } from 'react';
import Icon from './Icon';
import { API_BASE_URL, authHeaders } from '../utils/auth';
import './ATSScoreChecker.css';

const MAX_SIZE_MB = 10;

const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const getScoreTone = (score) => {
    if (score >= 80) return 'good';
    if (score >= 60) return 'fair';
    return 'poor';
};

const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs improvement';
};

const getScoreSummary = (score) => {
    if (score >= 80) return 'Your resume is well-optimized for applicant tracking systems.';
    if (score >= 60) return 'A solid base — a few targeted changes will improve your chances.';
    return 'Several issues may stop ATS software from reading your resume correctly.';
};

const ScoreRing = ({ score }) => {
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const clamped = Math.max(0, Math.min(100, Number(score) || 0));
    const offset = circumference * (1 - clamped / 100);
    return (
        <div className={`ats-ring ats-ring--${getScoreTone(clamped)}`}>
            <svg viewBox="0 0 128 128" aria-hidden="true">
                <circle className="ats-ring-track" cx="64" cy="64" r={radius} />
                <circle
                    className="ats-ring-value"
                    cx="64"
                    cy="64"
                    r={radius}
                    strokeDasharray={circumference}
                    style={{ '--ring-offset': offset, '--ring-full': circumference }}
                />
            </svg>
            <div className="ats-ring-label">
                <strong>{clamped}</strong>
                <span>/ 100</span>
            </div>
        </div>
    );
};

const ResultList = ({ items, empty }) => (
    <ul className="ats-list">
        {items?.length > 0
            ? items.map((item, idx) => <li key={idx}>{item}</li>)
            : <li className="ats-list-empty">{empty}</li>}
    </ul>
);

const ATSScoreChecker = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [error, setError] = useState('');
    const [dragging, setDragging] = useState(false);
    const inputRef = useRef(null);

    const selectFile = (file) => {
        if (!file) return;
        setError('');

        const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
        if (!isPdf) {
            setError('Please upload a PDF file only.');
            return;
        }
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            setError(`That file is ${formatSize(file.size)}. The maximum size is ${MAX_SIZE_MB} MB.`);
            return;
        }
        setPdfFile(file);
        setResult(null);
    };

    const clearFile = () => {
        setPdfFile(null);
        setResult(null);
        setError('');
        if (inputRef.current) inputRef.current.value = '';
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        selectFile(e.dataTransfer.files?.[0]);
    };

    const handleCheck = async () => {
        if (!pdfFile) {
            setError('Please upload your resume first.');
            return;
        }

        setLoading(true);
        setResult(null);
        setError('');

        try {
            const formData = new FormData();
            formData.append('resume', pdfFile);

            const response = await fetch(`${API_BASE_URL}/api/ats/check`, {
                method: 'POST',
                headers: authHeaders(),
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setResult(data.atsScore);
                requestAnimationFrame(() => {
                    document.getElementById('ats-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            } else {
                setError(`Failed to analyze resume: ${data.message || 'Unknown error'}`);
            }
        } catch (err) {
            console.error('Error checking ATS score:', err);
            setError('An error occurred while analyzing your resume. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ui-page ats">
            <header className="ui-page-head ats-head">
                <div>
                    <span className="ui-eyebrow">ATS Score Checker</span>
                    <h1>How well will your resume parse?</h1>
                    <p>Upload your resume as a PDF to get an AI-powered compatibility score, plus strengths and specific fixes.</p>
                </div>
            </header>

            <div className="ats-upload-card ui-card">
                <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={(e) => selectFile(e.target.files?.[0])}
                    id="resume-file"
                    className="sr-only"
                />

                {!pdfFile ? (
                    <label
                        htmlFor="resume-file"
                        className={`ats-drop${dragging ? ' is-dragging' : ''}`}
                        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={handleDrop}
                    >
                        <span className="ats-drop-icon"><Icon name="upload" size={26} /></span>
                        <strong>
                            <span className="ats-drop-cta">Click to upload</span> or drag and drop
                        </strong>
                        <span className="ats-drop-hint">PDF only · up to {MAX_SIZE_MB} MB</span>
                    </label>
                ) : (
                    <div className="ats-file">
                        <span className="ats-file-icon"><Icon name="file" size={22} /></span>
                        <div className="ats-file-meta">
                            <strong title={pdfFile.name}>{pdfFile.name}</strong>
                            <span>{formatSize(pdfFile.size)} · Ready to analyze</span>
                        </div>
                        <button
                            type="button"
                            className="ui-icon-btn ui-icon-btn--plain"
                            onClick={clearFile}
                            aria-label="Remove file"
                            title="Remove file"
                            disabled={loading}
                        >
                            <Icon name="x" size={18} />
                        </button>
                    </div>
                )}

                {error && (
                    <div className="ui-alert ui-alert--error" role="alert">
                        <Icon name="alert" size={18} />
                        <span>{error}</span>
                    </div>
                )}

                <div className="ats-upload-foot">
                    <p className="ats-privacy">
                        <Icon name="shield" size={15} /> Your file is only used to generate this analysis.
                    </p>
                    <button
                        type="button"
                        className="ui-btn ui-btn--primary ui-btn--lg"
                        onClick={handleCheck}
                        disabled={loading || !pdfFile}
                    >
                        {loading ? (
                            <>
                                <span className="ui-spinner" /> Analyzing…
                            </>
                        ) : (
                            <>
                                <Icon name="sparkles" size={18} /> Get ATS score
                            </>
                        )}
                    </button>
                </div>
            </div>

            {loading && (
                <div className="ats-loading ui-card" aria-live="polite">
                    <span className="ui-spinner ui-spinner--lg" />
                    <div>
                        <strong>Reading your resume…</strong>
                        <p>Our AI is checking structure, keywords and formatting. This usually takes a few seconds.</p>
                    </div>
                </div>
            )}

            {result && (
                <section id="ats-results" className="ats-results" aria-label="ATS analysis results">
                    <div className={`ats-summary ui-card ats-summary--${getScoreTone(result.score)}`}>
                        <ScoreRing score={result.score} />
                        <div className="ats-summary-text">
                            <span className="ats-score-badge">{getScoreLabel(result.score)}</span>
                            <h2>Your ATS score is {result.score}</h2>
                            <p>{getScoreSummary(result.score)}</p>
                            <button type="button" className="ui-btn ui-btn--secondary ui-btn--sm" onClick={clearFile}>
                                <Icon name="refresh" size={15} /> Check another resume
                            </button>
                        </div>
                    </div>

                    <div className="ats-grid">
                        <div className="ats-panel ats-panel--good ui-card">
                            <h3><span><Icon name="checkCircle" size={18} /></span> Strengths</h3>
                            <ResultList items={result.strengths} empty="Upload a complete resume for detailed analysis." />
                        </div>

                        <div className="ats-panel ats-panel--warn ui-card">
                            <h3><span><Icon name="alert" size={18} /></span> Areas for improvement</h3>
                            <ResultList items={result.improvements} empty="Great job! No major improvements needed." />
                        </div>

                        {result.formatAnalysis && (
                            <div className="ats-panel ats-panel--info ats-panel--wide ui-card">
                                <h3><span><Icon name="file" size={18} /></span> Format analysis</h3>
                                <p className="ats-panel-text">{result.formatAnalysis}</p>
                            </div>
                        )}

                        <div className="ats-panel ats-panel--accent ats-panel--wide ui-card">
                            <h3><span><Icon name="star" size={18} /></span> Recommendations</h3>
                            <ResultList items={result.recommendations} empty="Your resume looks great! Keep it updated." />
                        </div>
                    </div>

                    {result.analysis && (
                        <div className="ats-panel ats-panel--wide ui-card">
                            <h3><span><Icon name="edit" size={18} /></span> Detailed analysis</h3>
                            <div className="ats-panel-text ats-analysis">{result.analysis}</div>
                        </div>
                    )}
                </section>
            )}
        </div>
    );
};

export default ATSScoreChecker;
