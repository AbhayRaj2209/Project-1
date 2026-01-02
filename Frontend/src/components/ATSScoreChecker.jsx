// src/components/ATSScoreChecker.jsx
import React, { useState } from 'react';
import './ATSScoreChecker.css';

const ATSScoreChecker = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [fileName, setFileName] = useState('');
    const [uploadLoading, setUploadLoading] = useState(false);
    const [pdfFile, setPdfFile] = useState(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
            setPdfFile(file);
            setFileName(file.name);
        } else {
            alert('Please upload a PDF file only');
            setPdfFile(null);
            setFileName('');
        }
    };

    const handleCheck = async () => {
        if (!pdfFile) {
            alert('Please upload your resume first');
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('resume', pdfFile);

            const response = await fetch('http://localhost:5000/api/ats/check', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();
            
            if (data.success) {
                setResult(data.atsScore);
            } else {
                alert('Failed to analyze resume: ' + data.message);
            }
        } catch (error) {
            console.error('Error checking ATS score:', error);
            alert('An error occurred while analyzing your resume');
        } finally {
            setLoading(false);
        }
    };

    const getScoreColor = (score) => {
        if (score >= 80) return '#4caf50';
        if (score >= 60) return '#ff9800';
        return '#f44336';
    };

    const getScoreLabel = (score) => {
        if (score >= 80) return 'Excellent';
        if (score >= 70) return 'Good';
        if (score >= 60) return 'Fair';
        return 'Needs Improvement';
    };

    return (
        <div className="ats-checker-container">
            <div className="ats-header">
                <h2>🎯 ATS Score Checker</h2>
                <p>Upload your PDF resume to get an AI-powered ATS compatibility score</p>
            </div>

            <div className="ats-input-section">
                <div className="input-group">
                    <label>Upload Resume (PDF only) *</label>
                    <div className="file-upload-area">
                        <input 
                            type="file" 
                            accept=".pdf,application/pdf"
                            onChange={handleFileUpload}
                            id="resume-file"
                        />
                        <label htmlFor="resume-file" className="file-upload-label">
                            {pdfFile ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                    <span>✅ {fileName}</span>
                                    <span className="file-info">Ready to analyze</span>
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                        <polyline points="14 2 14 8 20 8"></polyline>
                                        <line x1="16" y1="13" x2="8" y2="13"></line>
                                        <line x1="16" y1="17" x2="8" y2="17"></line>
                                        <polyline points="10 9 9 9 8 9"></polyline>
                                    </svg>
                                    <span>Click to upload your resume PDF</span>
                                    <span className="file-info">PDF files only • Max 10MB</span>
                                </>
                            )}
                        </label>
                    </div>
                    {pdfFile && (
                        <div className="file-preview">
                            <p>✅ {fileName}</p>
                            <button 
                                className="clear-file-btn"
                                onClick={() => {
                                    setPdfFile(null);
                                    setFileName('');
                                    setResult(null);
                                    document.getElementById('resume-file').value = '';
                                }}
                            >
                                Clear & Upload New
                            </button>
                        </div>
                    )}
                </div>

                <button 
                    className="check-btn"
                    onClick={handleCheck}
                    disabled={loading || !pdfFile}
                >
                    {loading ? (
                        <>
                            <span className="spinner"></span>
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            Get ATS Score
                        </>
                    )}
                </button>
            </div>

            {result && (
                <div className="ats-results">
                    <div className="score-section">
                        <div className="score-circle" style={{ borderColor: getScoreColor(result.score) }}>
                            <div className="score-value" style={{ color: getScoreColor(result.score) }}>
                                {result.score}
                            </div>
                            <div className="score-label">{getScoreLabel(result.score)}</div>
                        </div>
                    </div>

                    <div className="analysis-grid">
                        <div className="analysis-card strengths">
                            <h3>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                Strengths
                            </h3>
                            <ul>
                                {result.strengths?.length > 0 ? (
                                    result.strengths.map((strength, idx) => (
                                        <li key={idx}>{strength}</li>
                                    ))
                                ) : (
                                    <li>Upload a complete resume for detailed analysis</li>
                                )}
                            </ul>
                        </div>

                        <div className="analysis-card improvements">
                            <h3>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                </svg>
                                Areas for Improvement
                            </h3>
                            <ul>
                                {result.improvements?.length > 0 ? (
                                    result.improvements.map((improvement, idx) => (
                                        <li key={idx}>{improvement}</li>
                                    ))
                                ) : (
                                    <li>🎉 Great job! No major improvements needed.</li>
                                )}
                            </ul>
                        </div>

                        {result.formatAnalysis && (
                            <div className="analysis-card format">
                                <h3>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                        <polyline points="14 2 14 8 20 8"></polyline>
                                        <line x1="16" y1="13" x2="8" y2="13"></line>
                                        <line x1="16" y1="17" x2="8" y2="17"></line>
                                    </svg>
                                    Format Analysis
                                </h3>
                                <p>{result.formatAnalysis}</p>
                            </div>
                        )}

                        <div className="analysis-card recommendations full-width">
                            <h3>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                                Recommendations
                            </h3>
                            <ul>
                                {result.recommendations?.length > 0 ? (
                                    result.recommendations.map((rec, idx) => (
                                        <li key={idx}>{rec}</li>
                                    ))
                                ) : (
                                    <li>✨ Your resume looks great! Keep it updated.</li>
                                )}
                            </ul>
                        </div>
                    </div>

                    {result.analysis && (
                        <div className="detailed-analysis">
                            <h3>📝 Detailed Analysis</h3>
                            <div className="analysis-text">{result.analysis}</div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ATSScoreChecker;
