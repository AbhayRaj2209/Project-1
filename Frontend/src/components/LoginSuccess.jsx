import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from './Icon';
import './Layout.css';

const LoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // The API redirects here with the token in the fragment (#token=...).
    // ?token=... is still accepted for older links.
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    const queryParams = new URLSearchParams(window.location.search);
    const token = hashParams.get('token') || queryParams.get('token');

    if (token) {
      // Save the token so ProtectedRoute allows access
      localStorage.setItem('token', token);
      window.history.replaceState({}, '', '/login-success');
      navigate('/', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="ui-center-screen" style={{ minHeight: '100dvh' }}>
      <div style={{ display: 'grid', justifyItems: 'center', gap: 14 }}>
        <span className="app-brand-mark" style={{ width: 48, height: 48, borderRadius: 14 }}>
          <Icon name="logo" size={24} strokeWidth={2.2} />
        </span>
        <span className="ui-spinner ui-spinner--lg" style={{ color: 'var(--accent)' }} />
        <h2 style={{ fontSize: '1.2rem' }}>Signing you in…</h2>
        <p>Hang tight, we're redirecting you to your workspace.</p>
      </div>
    </div>
  );
};

export default LoginSuccess;
