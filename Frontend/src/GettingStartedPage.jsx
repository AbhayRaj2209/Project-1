// src/GettingStartedPage.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from './components/Icon';
import TemplateThumb from './components/TemplateThumb';
import { templates } from './data/templates';
import './GettingStartedPage.css';

const steps = [
    {
        icon: 'grid',
        title: 'Choose a template',
        text: 'Pick from professionally designed, ATS-friendly layouts for every industry.',
    },
    {
        icon: 'edit',
        title: 'Fill in your details',
        text: 'A guided form with a live preview shows exactly how your resume will look.',
    },
    {
        icon: 'download',
        title: 'Download & apply',
        text: 'Export a polished PDF and start applying to the roles you want.',
    },
];

const features = [
    {
        icon: 'layers',
        title: 'Professional templates',
        text: 'Multiple ATS-friendly designs — switch between them without retyping anything.',
    },
    {
        icon: 'sparkles',
        title: 'AI-powered analysis',
        text: 'Get an instant ATS score plus specific, actionable suggestions to improve it.',
    },
    {
        icon: 'eye',
        title: 'Live preview',
        text: 'See every change reflected instantly on a true-to-size page.',
    },
    {
        icon: 'download',
        title: 'Export anywhere',
        text: 'Download as PDF or print directly — ready to send to recruiters.',
    },
];

const heroThumbs = ['jakes', 'modern', 'executive'].map((id) => templates.find((t) => t.id === id));

const GettingStartedPage = () => {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/');
    };

    return (
        <div className="gs">
            <section className="gs-hero">
                <div className="gs-hero-inner">
                    <div className="gs-hero-copy">
                        <span className="gs-pill">
                            <Icon name="sparkles" size={14} /> Welcome to Smart Resume Builder
                        </span>
                        <h1>
                            Build a resume that <span className="gs-gradient-text">gets you hired</span>
                        </h1>
                        <p>
                            Create professional, ATS-optimized resumes in minutes. Pick a template,
                            fill in your story, and download a polished PDF.
                        </p>
                        <div className="gs-hero-actions">
                            <Link to="/templates" className="ui-btn ui-btn--primary ui-btn--lg">
                                Create my resume <Icon name="arrowRight" size={18} />
                            </Link>
                            <button type="button" onClick={handleContinue} className="ui-btn ui-btn--secondary ui-btn--lg">
                                Go to dashboard
                            </button>
                        </div>
                        <ul className="gs-hero-meta">
                            <li><Icon name="check" size={16} /> Free to start</li>
                            <li><Icon name="check" size={16} /> No credit card</li>
                            <li><Icon name="check" size={16} /> {templates.length} templates</li>
                        </ul>
                    </div>

                    <div className="gs-hero-art" aria-hidden="true">
                        {heroThumbs.map((t, i) => (
                            <div key={t.id} className={`gs-hero-card gs-hero-card--${i}`}>
                                <TemplateThumb layout={t.layout} color={t.color} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="ui-page gs-body">
                <section className="gs-section" aria-labelledby="gs-steps-title">
                    <div className="gs-section-head">
                        <span className="ui-eyebrow">How it works</span>
                        <h2 id="gs-steps-title">Three steps to a standout resume</h2>
                    </div>
                    <ol className="gs-steps">
                        {steps.map((s, i) => (
                            <li key={s.title} className="gs-step">
                                <div className="gs-step-top">
                                    <span className="gs-step-icon"><Icon name={s.icon} size={22} /></span>
                                    <span className="gs-step-num">0{i + 1}</span>
                                </div>
                                <h3>{s.title}</h3>
                                <p>{s.text}</p>
                            </li>
                        ))}
                    </ol>
                </section>

                <section className="gs-section" aria-labelledby="gs-features-title">
                    <div className="gs-section-head">
                        <span className="ui-eyebrow">Why Smart Resume</span>
                        <h2 id="gs-features-title">Everything you need, nothing you don’t</h2>
                    </div>
                    <div className="gs-features">
                        {features.map((f) => (
                            <div key={f.title} className="gs-feature">
                                <span className="gs-feature-icon"><Icon name={f.icon} size={20} /></span>
                                <h3>{f.title}</h3>
                                <p>{f.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="gs-cta">
                    <div>
                        <h2>Ready to get started?</h2>
                        <p>Your next opportunity is one great resume away.</p>
                    </div>
                    <button type="button" onClick={handleContinue} className="ui-btn ui-btn--lg gs-cta-btn">
                        Get started now <Icon name="arrowRight" size={18} />
                    </button>
                </section>
            </div>
        </div>
    );
};

export default GettingStartedPage;
