import React, { useEffect, useId, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Icon from './components/Icon';
import ThemeToggle from './components/ThemeToggle';
import { templates } from './data/templates';
import { API_BASE_URL } from './utils/auth';
import './loginpage.css';

axios.defaults.baseURL = API_BASE_URL;

const PasswordInput = ({ label, value, onChange, show, onToggle, autoComplete, isNew = false }) => {
    const id = useId();
    return (
        <div className="ui-field">
            <label className="ui-label" htmlFor={id}>{label}</label>
            <div className="auth-password">
                <input
                    id={id}
                    className="ui-input"
                    type={show ? 'text' : 'password'}
                    required
                    minLength={isNew ? 6 : undefined}
                    value={value}
                    onChange={onChange}
                    placeholder={isNew ? 'At least 6 characters' : 'Enter your password'}
                    autoComplete={autoComplete}
                />
                <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={onToggle}
                    aria-label={show ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
                >
                    <Icon name={show ? 'eyeOff' : 'eye'} size={18} />
                </button>
            </div>
        </div>
    );
};

const highlights = [
    { icon: 'grid', title: `${templates.length} professional templates`, text: 'From classic one-pagers to bold creative layouts.' },
    { icon: 'target', title: 'AI-powered ATS scoring', text: 'See how recruiters’ systems read your resume.' },
    { icon: 'download', title: 'Export in one click', text: 'Download a polished PDF ready to send.' },
];

function AuthPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const emailId = useId();
    const resetEmailId = useId();

    const [isLoginView, setIsLoginView] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showForgotForm, setShowForgotForm] = useState(false);
    const [resetToken, setResetToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [resetEmail, setResetEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [providers, setProviders] = useState({ google: true, github: true });
    const [socialLoading, setSocialLoading] = useState('');

    // Ask the API which social logins are configured so unavailable ones are disabled
    useEffect(() => {
        let cancelled = false;
        axios.get('/api/auth/providers')
            .then((res) => { if (!cancelled) setProviders(res.data); })
            .catch(() => { /* keep buttons enabled; the server reports errors on click */ });
        // Returning via the Back button restores this page from cache; clear the spinner
        const onPageShow = () => setSocialLoading('');
        window.addEventListener('pageshow', onPageShow);
        return () => {
            cancelled = true;
            window.removeEventListener('pageshow', onPageShow);
        };
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        // Password-reset emails link to /reset-password?token=... — that token is
        // a reset token, not a session token.
        if (location.pathname === '/reset-password') {
            if (token) {
                setResetToken(token);
                setShowForgotForm(false);
                setIsLoginView(true);
            }
            return;
        }

        if (token) {
            localStorage.setItem('token', token);
            window.history.replaceState({}, '', '/getting-started');
            window.location.href = '/getting-started';
            return;
        }

        // The API redirects back here with ?oauth_error=... when social sign-in fails
        const oauthError = params.get('oauth_error');
        if (oauthError) {
            setIsError(true);
            setMessage(oauthError);
            window.history.replaceState({}, '', '/login');
        }

        const resetParam = params.get('reset');
        if (resetParam) {
            setResetToken(resetParam);
            setShowForgotForm(false);
            setIsLoginView(true);
        }
    }, [location.pathname, location.search]);

    const clearState = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setMessage('');
        setIsError(false);
        setShowPassword(false);
        setShowConfirmPassword(false);
        setResetEmail('');
        setNewPassword('');
        setResetToken('');
    };

    // Full-page redirect: the API sends the browser to the provider, then back to
    // /login-success with the token (or to /login?oauth_error=... on failure).
    const handleSocialLogin = (provider) => {
        setSocialLoading(provider);
        window.location.href = `${API_BASE_URL}/api/auth/${provider}`;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setIsError(true);
            setMessage('Passwords do not match.');
            return;
        }

        setSubmitting(true);
        try {
            const response = await axios.post('/api/signup', { email, password });
            setMessage(response.data.message);
            setIsError(false);
            setIsLoginView(true);
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            setIsError(true);
            setMessage(error.response?.data?.message || 'Signup failed.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await axios.post('/api/login', { email, password });
            localStorage.setItem('token', response.data.token);
            window.location.href = '/getting-started';
        } catch (error) {
            setIsError(true);
            setMessage(error.response?.data?.message || 'Login failed.');
            setSubmitting(false);
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await axios.post('/api/forgot-password', { email: resetEmail });
            setMessage(response.data.message);
            setIsError(false);
        } catch (error) {
            setIsError(true);
            setMessage(error.response?.data?.message || 'Unable to send reset email.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await axios.post('/api/reset-password', { token: resetToken, password: newPassword });
            setMessage(response.data.message);
            setIsError(false);
            setResetToken('');
            setNewPassword('');
            if (location.pathname === '/reset-password') {
                navigate('/login', { replace: true });
            }
        } catch (error) {
            setIsError(true);
            setMessage(error.response?.data?.message || 'Password reset failed.');
        } finally {
            setSubmitting(false);
        }
    };

    const switchMode = (toLogin) => {
        setIsLoginView(toLogin);
        clearState();
    };

    const mode = showForgotForm ? 'forgot' : resetToken ? 'reset' : isLoginView ? 'login' : 'signup';

    const copy = {
        login: { title: 'Welcome back', subtitle: 'Sign in to continue building your resume.' },
        signup: { title: 'Create your account', subtitle: 'Start building ATS-ready resumes in minutes.' },
        forgot: { title: 'Reset your password', subtitle: "Enter your email and we'll send you a reset link." },
        reset: { title: 'Set a new password', subtitle: 'Choose a strong password you haven’t used before.' },
    }[mode];

    const submitLabel = {
        login: 'Sign in',
        signup: 'Create account',
        forgot: 'Send reset link',
        reset: 'Update password',
    }[mode];

    return (
        <div className="auth-page">
            {/* Brand panel */}
            <aside className="auth-aside" aria-hidden="true">
                <div className="auth-aside-inner">
                    <div className="auth-brand">
                        <span className="auth-brand-mark"><Icon name="logo" size={22} strokeWidth={2.2} /></span>
                        <span>Smart Resume Builder</span>
                    </div>

                    <div className="auth-aside-copy">
                        <h1>Land interviews with a resume that gets read.</h1>
                        <p>Professional templates, live preview and AI-powered ATS feedback — all in one place.</p>
                    </div>

                    <div className="auth-mock">
                        <div className="auth-mock-paper">
                            <div className="auth-mock-head">
                                <span className="auth-mock-avatar" />
                                <span className="auth-mock-lines">
                                    <i style={{ width: '62%' }} />
                                    <i style={{ width: '40%' }} />
                                </span>
                            </div>
                            {[78, 92, 64, 86, 70].map((w, i) => (
                                <i key={i} className="auth-mock-line" style={{ width: `${w}%` }} />
                            ))}
                            <span className="auth-mock-section" />
                            {[88, 72, 94].map((w, i) => (
                                <i key={i} className="auth-mock-line" style={{ width: `${w}%` }} />
                            ))}
                        </div>
                        <div className="auth-mock-score">
                            <span className="auth-mock-ring"><b>92</b></span>
                            <span>
                                <strong>ATS score</strong>
                                <small>Excellent match</small>
                            </span>
                        </div>
                    </div>

                    <ul className="auth-highlights">
                        {highlights.map((h) => (
                            <li key={h.title}>
                                <span className="auth-highlight-icon"><Icon name={h.icon} size={18} /></span>
                                <span>
                                    <strong>{h.title}</strong>
                                    <small>{h.text}</small>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            {/* Form panel */}
            <main className="auth-main">
                <div className="auth-topbar">
                    <div className="auth-brand auth-brand--mobile">
                        <span className="auth-brand-mark"><Icon name="logo" size={18} strokeWidth={2.2} /></span>
                        <span>Smart Resume</span>
                    </div>
                    <ThemeToggle />
                </div>

                <div className="auth-card">
                    {(mode === 'login' || mode === 'signup') && (
                        <div className="auth-tabs" role="tablist" aria-label="Account">
                            <button
                                type="button"
                                role="tab"
                                aria-selected={mode === 'login'}
                                className={mode === 'login' ? 'is-active' : ''}
                                onClick={() => mode !== 'login' && switchMode(true)}
                            >
                                Sign in
                            </button>
                            <button
                                type="button"
                                role="tab"
                                aria-selected={mode === 'signup'}
                                className={mode === 'signup' ? 'is-active' : ''}
                                onClick={() => mode !== 'signup' && switchMode(false)}
                            >
                                Create account
                            </button>
                        </div>
                    )}

                    <div className="auth-heading">
                        <h2>{copy.title}</h2>
                        <p>{copy.subtitle}</p>
                    </div>

                    {message && (
                        <div className={`ui-alert ${isError ? 'ui-alert--error' : 'ui-alert--success'}`} role={isError ? 'alert' : 'status'}>
                            <Icon name={isError ? 'alert' : 'checkCircle'} size={18} />
                            <span>{message}</span>
                        </div>
                    )}

                    {mode === 'forgot' && (
                        <form className="auth-form" onSubmit={handleForgotPassword}>
                            <div className="ui-field">
                                <label className="ui-label" htmlFor={resetEmailId}>Email address</label>
                                <input
                                    id={resetEmailId}
                                    className="ui-input"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    value={resetEmail}
                                    onChange={(e) => setResetEmail(e.target.value)}
                                    placeholder="you@example.com"
                                />
                            </div>
                            <button type="submit" className="ui-btn ui-btn--primary ui-btn--lg ui-btn--block" disabled={submitting}>
                                {submitting && <span className="ui-spinner" />}
                                {submitLabel}
                            </button>
                            <button
                                type="button"
                                className="auth-link auth-back"
                                onClick={() => { setShowForgotForm(false); clearState(); }}
                            >
                                <Icon name="arrowLeft" size={16} /> Back to sign in
                            </button>
                        </form>
                    )}

                    {mode === 'reset' && (
                        <form className="auth-form" onSubmit={handleResetPassword}>
                            <PasswordInput
                                label="New password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                show={showPassword}
                                onToggle={() => setShowPassword(!showPassword)}
                                autoComplete="new-password"
                                isNew
                            />
                            <button type="submit" className="ui-btn ui-btn--primary ui-btn--lg ui-btn--block" disabled={submitting}>
                                {submitting && <span className="ui-spinner" />}
                                {submitLabel}
                            </button>
                        </form>
                    )}

                    {(mode === 'login' || mode === 'signup') && (
                        <>
                            <form className="auth-form" onSubmit={isLoginView ? handleLogin : handleSignup}>
                                <div className="ui-field">
                                    <label className="ui-label" htmlFor={emailId}>Email address</label>
                                    <input
                                        id={emailId}
                                        className="ui-input"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                    />
                                </div>

                                <PasswordInput
                                    label="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    show={showPassword}
                                    onToggle={() => setShowPassword(!showPassword)}
                                    autoComplete={isLoginView ? 'current-password' : 'new-password'}
                                    isNew={!isLoginView}
                                />

                                {!isLoginView && (
                                    <PasswordInput
                                        label="Confirm password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        show={showConfirmPassword}
                                        onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                                        autoComplete="new-password"
                                        isNew
                                    />
                                )}

                                {isLoginView && (
                                    <button
                                        type="button"
                                        className="auth-link auth-forgot"
                                        onClick={() => { setShowForgotForm(true); clearState(); }}
                                    >
                                        Forgot password?
                                    </button>
                                )}

                                <button type="submit" className="ui-btn ui-btn--primary ui-btn--lg ui-btn--block" disabled={submitting}>
                                    {submitting && <span className="ui-spinner" />}
                                    {submitLabel}
                                </button>
                            </form>

                            <div className="auth-separator"><span>or continue with</span></div>

                            <div className="auth-social">
                                <button
                                    type="button"
                                    onClick={() => handleSocialLogin('google')}
                                    className="ui-btn ui-btn--secondary ui-btn--lg"
                                    disabled={!providers.google || !!socialLoading}
                                    title={providers.google ? 'Continue with Google' : 'Google sign-in is not configured on the server'}
                                >
                                    {socialLoading === 'google' ? <span className="ui-spinner" /> : <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>}
                                    Google
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSocialLogin('github')}
                                    className="ui-btn ui-btn--secondary ui-btn--lg"
                                    disabled={!providers.github || !!socialLoading}
                                    title={providers.github ? 'Continue with GitHub' : 'GitHub sign-in is not configured on the server'}
                                >
                                    {socialLoading === 'github' ? <span className="ui-spinner" /> : <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>}
                                    GitHub
                                </button>
                            </div>

                            <p className="auth-switch">
                                {isLoginView ? "Don't have an account?" : 'Already have an account?'}{' '}
                                <button type="button" className="auth-link" onClick={() => switchMode(!isLoginView)}>
                                    {isLoginView ? 'Create one' : 'Sign in'}
                                </button>
                            </p>
                        </>
                    )}
                </div>

                <p className="auth-legal">By continuing you agree to our Terms of Service and Privacy Policy.</p>
            </main>
        </div>
    );
}

export default AuthPage;
