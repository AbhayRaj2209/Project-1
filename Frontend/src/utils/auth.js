// src/utils/auth.js

// VITE_API_URL is baked in at build time. If it's missing in a production build the
// app would silently call http://localhost:5000 from users' browsers — so say so loudly.
const rawApiUrl = (import.meta.env.VITE_API_URL || '').trim().replace(/^["']|["']$/g, '');

if (import.meta.env.PROD && !rawApiUrl) {
    console.error(
        '[config] VITE_API_URL is not set for this build, so API calls go to http://localhost:5000. ' +
        'Set VITE_API_URL to your deployed backend URL in your hosting settings and redeploy.'
    );
}

const withProtocol = (url) => (/^https?:\/\//i.test(url) ? url : `https://${url}`);

export const API_BASE_URL = (rawApiUrl ? withProtocol(rawApiUrl) : 'http://localhost:5000').replace(/\/+$/, '');

export const getToken = () => localStorage.getItem('token');

export const authHeaders = (extra = {}) => ({
    Authorization: `Bearer ${getToken()}`,
    ...extra,
});

export const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
};
