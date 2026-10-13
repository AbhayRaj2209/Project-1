import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import ThemeProvider from './theme/ThemeProvider';
import AuthPage from './AuthPage';
import Dashboard from './Dashboard';
import TemplatePage from './components/TemplatePage';
import ResumeBuilderPage from './ResumeBuilderPage';
import GettingStartedPage from './GettingStartedPage';
import ATSScoreChecker from './components/ATSScoreChecker';
import MainLayout from './Layouts/MainLayout';
import LoginSuccess from './components/LoginSuccess';

const isLoggedIn = () => {
    return localStorage.getItem('token') !== null;
};

const ProtectedRoute = ({ children, hideFooter = false }) => {
    if (!isLoggedIn()) {
        return <Navigate to="/login" />;
    }
    return <MainLayout hideFooter={hideFooter}>{children}</MainLayout>;
};

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public routes */}
                    <Route path="/login" element={<AuthPage />} />
                    {/* Backend password-reset emails link here with ?token=... */}
                    <Route path="/reset-password" element={<AuthPage />} />

                    {/* OAuth handlers — must be public so they can catch the token from the backend */}
                    <Route path="/login-success" element={<LoginSuccess />} />
                    <Route path="/auth/callback" element={<LoginSuccess />} />

                    {/* Protected routes */}
                    <Route
                        path="/getting-started"
                        element={<ProtectedRoute><GettingStartedPage /></ProtectedRoute>}
                    />
                    <Route
                        path="/"
                        element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
                    />
                    <Route
                        path="/templates"
                        element={<ProtectedRoute><TemplatePage /></ProtectedRoute>}
                    />
                    <Route
                        path="/ats-checker"
                        element={<ProtectedRoute><ATSScoreChecker /></ProtectedRoute>}
                    />
                    <Route
                        path="/editor"
                        element={<ProtectedRoute hideFooter><ResumeBuilderPage /></ProtectedRoute>}
                    />

                    {/* Catch-all redirect */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
