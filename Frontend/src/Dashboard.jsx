// src/Dashboard.jsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './components/Icon';
import TemplateThumb from './components/TemplateThumb';
import { ToastRegion } from './components/Toast';
import { useToast } from './components/useToast';
import { templates, getTemplate } from './data/templates';
import { API_BASE_URL, authHeaders } from './utils/auth';
import './Dashboard.css';

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

const formatRelative = (iso) => {
    if (!iso) return 'Never edited';
    const date = new Date(iso);
    const diff = Date.now() - date.getTime();
    const minutes = Math.round(diff / 60000);
    if (minutes < 1) return 'Edited just now';
    if (minutes < 60) return `Edited ${minutes} min ago`;
    const hours = Math.round(minutes / 60);
    if (hours < 24) return `Edited ${hours} h ago`;
    const days = Math.round(hours / 24);
    if (days < 7) return `Edited ${days} day${days === 1 ? '' : 's'} ago`;
    return `Edited ${date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}`;
};

const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
};

const tips = [
    { title: 'Lead with action verbs', text: 'Start bullets with verbs like “Built”, “Led” or “Reduced”.' },
    { title: 'Quantify your impact', text: 'Numbers make results concrete: “cut load time by 40%”.' },
    { title: 'Tailor for each role', text: 'Mirror keywords from the job description you’re targeting.' },
    { title: 'Keep it concise', text: 'One page for early career, two at most for senior roles.' },
];

const resources = [
    { to: '/ats-checker', label: 'Check your ATS score', icon: 'target', internal: true },
    { href: 'https://www.linkedin.com/jobs/', label: 'Browse job boards', icon: 'briefcase' },
    { href: 'https://www.grammarly.com/', label: 'Grammar check', icon: 'edit' },
    { href: 'https://www.linkedin.com/help/linkedin/answer/a507663', label: 'Resume writing guide', icon: 'file' },
];

const Dashboard = () => {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [confirmId, setConfirmId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const { toasts, showToast } = useToast();

    const fetchResumes = useCallback(async () => {
        setLoadError(false);
        try {
            const response = await fetch(`${API_BASE_URL}/api/resume/list`, {
                headers: authHeaders(),
            });
            if (response.ok) {
                const data = await response.json();
                setResumes(data.resumes || []);
            } else {
                setLoadError(true);
            }
        } catch (error) {
            console.error('Error fetching resumes:', error);
            setLoadError(true);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchResumes();
    }, [fetchResumes]);

    const handleDeleteResume = async (id) => {
        setDeletingId(id);
        try {
            const response = await fetch(`${API_BASE_URL}/api/resume/${id}`, {
                method: 'DELETE',
                headers: authHeaders(),
            });
            if (response.ok) {
                setResumes((prev) => prev.filter((r) => r._id !== id));
                showToast('Resume deleted');
            } else {
                showToast('Could not delete resume', 'error');
            }
        } catch (error) {
            console.error('Error deleting resume:', error);
            showToast('Could not delete resume', 'error');
        } finally {
            setDeletingId(null);
            setConfirmId(null);
        }
    };

    const filteredResumes = useMemo(
        () => resumes.filter((resume) => resume.name?.toLowerCase().includes(searchQuery.trim().toLowerCase())),
        [resumes, searchQuery]
    );

    const updatedThisWeek = resumes.filter(
        (r) => r.updatedAt && Date.now() - new Date(r.updatedAt).getTime() < WEEK_MS
    ).length;

    const stats = [
        { label: 'Total resumes', value: resumes.length, icon: 'file', tone: 'indigo' },
        { label: 'Templates available', value: templates.length, icon: 'grid', tone: 'violet' },
        { label: 'Updated this week', value: updatedThisWeek, icon: 'refresh', tone: 'green' },
    ];

    return (
        <div className="ui-page dash">
            <header className="ui-page-head">
                <div>
                    <span className="ui-eyebrow">Dashboard</span>
                    <h1>{greeting()} 👋</h1>
                    <p>Create, manage and polish your resumes in one place.</p>
                </div>
                <div className="dash-head-actions">
                    <Link to="/ats-checker" className="ui-btn ui-btn--secondary">
                        <Icon name="target" size={16} /> Check ATS score
                    </Link>
                    <Link to="/templates" className="ui-btn ui-btn--primary">
                        <Icon name="plus" size={16} /> New resume
                    </Link>
                </div>
            </header>

            <section className="dash-stats" aria-label="Overview">
                {stats.map((s) => (
                    <div key={s.label} className={`dash-stat dash-stat--${s.tone}`}>
                        <span className="dash-stat-icon"><Icon name={s.icon} size={20} /></span>
                        <div>
                            <div className="dash-stat-value">
                                {loading && s.label !== 'Templates available' ? <span className="ui-skeleton dash-stat-skel" /> : s.value}
                            </div>
                            <div className="dash-stat-label">{s.label}</div>
                        </div>
                    </div>
                ))}
            </section>

            <div className="dash-layout">
                <section className="dash-resumes" aria-labelledby="dash-resumes-title">
                    <div className="dash-section-head">
                        <h2 id="dash-resumes-title">My resumes</h2>
                        {resumes.length > 0 && (
                            <div className="ui-input-wrap dash-search">
                                <Icon name="search" size={16} />
                                <input
                                    type="search"
                                    className="ui-input"
                                    placeholder="Search by name…"
                                    aria-label="Search resumes by name"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        )}
                    </div>

                    {loading && (
                        <div className="dash-grid">
                            {[0, 1, 2].map((i) => (
                                <div key={i} className="dash-card dash-card--skeleton">
                                    <div className="ui-skeleton dash-skel-thumb" />
                                    <div className="dash-card-body">
                                        <div className="ui-skeleton" style={{ height: 14, width: '70%' }} />
                                        <div className="ui-skeleton" style={{ height: 10, width: '45%', marginTop: 8 }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!loading && loadError && (
                        <div className="dash-empty">
                            <span className="dash-empty-icon dash-empty-icon--error"><Icon name="alert" size={26} /></span>
                            <h3>Couldn’t load your resumes</h3>
                            <p>Check your connection and that the server is running, then try again.</p>
                            <button type="button" className="ui-btn ui-btn--secondary" onClick={() => { setLoading(true); fetchResumes(); }}>
                                <Icon name="refresh" size={16} /> Retry
                            </button>
                        </div>
                    )}

                    {!loading && !loadError && resumes.length === 0 && (
                        <div className="dash-empty">
                            <span className="dash-empty-icon"><Icon name="file" size={26} /></span>
                            <h3>No resumes yet</h3>
                            <p>Pick a template and create your first professional resume in minutes.</p>
                            <Link to="/templates" className="ui-btn ui-btn--primary">
                                <Icon name="plus" size={16} /> Create your first resume
                            </Link>
                        </div>
                    )}

                    {!loading && !loadError && resumes.length > 0 && (
                        <>
                            <div className="dash-grid">
                                {!searchQuery && (
                                    <Link to="/templates" className="dash-card dash-card--new">
                                        <span className="dash-new-icon"><Icon name="plus" size={22} /></span>
                                        <strong>New resume</strong>
                                        <span>Start from a template</span>
                                    </Link>
                                )}

                                {filteredResumes.map((resume) => {
                                    const tpl = getTemplate(resume.template);
                                    const isConfirming = confirmId === resume._id;
                                    return (
                                        <article key={resume._id} className="dash-card">
                                            <Link
                                                to={`/editor?id=${resume._id}&template=${tpl.id}`}
                                                className="dash-card-thumb tt-hover"
                                                aria-label={`Edit ${resume.name || 'Untitled resume'}`}
                                            >
                                                <TemplateThumb layout={tpl.layout} color={tpl.color} />
                                            </Link>
                                            <div className="dash-card-body">
                                                <div className="dash-card-text">
                                                    <h3 title={resume.name}>{resume.name || 'Untitled resume'}</h3>
                                                    <p>{tpl.name} · {formatRelative(resume.updatedAt)}</p>
                                                </div>
                                                <div className="dash-card-actions">
                                                    <Link
                                                        to={`/editor?id=${resume._id}&template=${tpl.id}`}
                                                        className="ui-icon-btn ui-icon-btn--plain"
                                                        aria-label="Edit resume"
                                                        title="Edit"
                                                    >
                                                        <Icon name="edit" size={16} />
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={() => setConfirmId(resume._id)}
                                                        className="ui-icon-btn ui-icon-btn--plain ui-icon-btn--danger"
                                                        aria-label="Delete resume"
                                                        title="Delete"
                                                    >
                                                        <Icon name="trash" size={16} />
                                                    </button>
                                                </div>
                                            </div>

                                            {isConfirming && (
                                                <div className="dash-confirm" role="alertdialog" aria-label="Confirm delete">
                                                    <p><strong>Delete this resume?</strong> This can’t be undone.</p>
                                                    <div>
                                                        <button
                                                            type="button"
                                                            className="ui-btn ui-btn--secondary ui-btn--sm"
                                                            onClick={() => setConfirmId(null)}
                                                            autoFocus
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="ui-btn ui-btn--danger ui-btn--sm"
                                                            onClick={() => handleDeleteResume(resume._id)}
                                                            disabled={deletingId === resume._id}
                                                        >
                                                            {deletingId === resume._id && <span className="ui-spinner" />}
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </article>
                                    );
                                })}
                            </div>

                            {filteredResumes.length === 0 && (
                                <div className="dash-empty dash-empty--compact">
                                    <p>No resumes match “{searchQuery}”.</p>
                                    <button type="button" className="ui-btn ui-btn--ghost ui-btn--sm" onClick={() => setSearchQuery('')}>
                                        Clear search
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </section>

                <aside className="dash-aside">
                    <div className="ui-card dash-widget dash-promo">
                        <span className="dash-promo-icon"><Icon name="sparkles" size={20} /></span>
                        <h3>How ATS-ready is your resume?</h3>
                        <p>Upload a PDF and get an AI-powered score with concrete fixes.</p>
                        <Link to="/ats-checker" className="ui-btn ui-btn--sm dash-promo-btn">
                            Run a free check <Icon name="arrowRight" size={16} />
                        </Link>
                    </div>

                    <div className="ui-card dash-widget">
                        <h3><Icon name="lightbulb" size={18} /> Writing tips</h3>
                        <ul className="dash-tips">
                            {tips.map((t) => (
                                <li key={t.title}>
                                    <strong>{t.title}</strong>
                                    <span>{t.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="ui-card dash-widget">
                        <h3><Icon name="link" size={18} /> Helpful resources</h3>
                        <ul className="dash-links">
                            {resources.map((r) => (
                                <li key={r.label}>
                                    {r.internal ? (
                                        <Link to={r.to}>
                                            <Icon name={r.icon} size={16} />
                                            <span>{r.label}</span>
                                            <Icon name="arrowRight" size={15} className="dash-link-arrow" />
                                        </Link>
                                    ) : (
                                        <a href={r.href} target="_blank" rel="noopener noreferrer">
                                            <Icon name={r.icon} size={16} />
                                            <span>{r.label}</span>
                                            <Icon name="externalLink" size={15} className="dash-link-arrow" />
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </div>

            <ToastRegion toasts={toasts} />
        </div>
    );
};

export default Dashboard;
