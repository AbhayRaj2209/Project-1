import React, { useState } from 'react';
import axios from 'axios';
import './ATSChecker.css';

// ATSChecker.jsx
console.log('ATSChecker component loaded'); // Debug log

const ATSChecker = ({ resumeData }) => {
    const [jobDescription, setJobDescription] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isVisible, setIsVisible] = useState(true); // Added to control visibility

    const formatResumeContent = (data) => {
        return `
            Name: ${data.name || ''}
            Email: ${data.email || ''}
            Education: ${data.education || ''}
            Experience: ${data.experience || ''}
            Skills: ${data.skills || ''}
            Projects: ${Array.isArray(data.projects) 
                ? data.projects.map(p => `${p.title}: ${p.description}`).join('\n')
                : data.projects || ''
            }
            Achievements: ${data.achievements || ''}
        `;
    };

    const checkATSScore = async () => {
        if (!jobDescription.trim()) {
            setError('Please paste a job description');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/resume/ats-check', {
                resumeContent: formatResumeContent(resumeData),
                jobDescription: jobDescription
            });

            setAnalysis(response.data.analysis);
        } catch (err) {
            setError('Failed to analyze resume. Please try again.');
            console.error('ATS Check Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ats-checker">
            <h3>ATS Compatibility Checker</h3>
            <p>Paste the job description below to check how well your resume matches:</p>
            
            <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste job description here..."
                rows="6"
                className="job-description-input"
            />

            {error && <div className="error-message">{error}</div>}

            <button 
                onClick={checkATSScore} 
                disabled={loading}
                className="check-ats-button"
            >
                {loading ? 'Analyzing...' : 'Check ATS Score'}
            </button>

            {analysis && (
                <div className="analysis-results">
                    <div className="score-section">
                        <h4>ATS Compatibility Score</h4>
                        <div className="score-display">
                            <div 
                                className="score-circle"
                                style={{
                                    '--score': `${analysis.score}%`,
                                    '--color': analysis.score >= 70 ? '#4caf50' : 
                                             analysis.score >= 50 ? '#ff9800' : '#f44336'
                                }}
                            >
                                {analysis.score}%
                            </div>
                        </div>
                    </div>

                    <div className="keywords-section">
                        <h4>Keyword Analysis</h4>
                        <div className="keywords-grid">
                            <div className="keyword-column">
                                <h5>Found Keywords</h5>
                                <ul className="keyword-list found">
                                    {analysis.keywordMatch.found.map((keyword, index) => (
                                        <li key={index}>{keyword}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="keyword-column">
                                <h5>Missing Keywords</h5>
                                <ul className="keyword-list missing">
                                    {analysis.keywordMatch.missing.map((keyword, index) => (
                                        <li key={index}>{keyword}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="format-section">
                        <h4>Format Analysis</h4>
                        <p>{analysis.formatAnalysis}</p>
                    </div>

                    <div className="improvements-section">
                        <h4>Suggested Improvements</h4>
                        <ul>
                            {analysis.improvements.map((improvement, index) => (
                                <li key={index}>{improvement}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="feedback-section">
                        <h4>Overall Feedback</h4>
                        <p>{analysis.overallFeedback}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ATSChecker;