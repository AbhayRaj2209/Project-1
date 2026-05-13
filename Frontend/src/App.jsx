import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import AuthPage from './AuthPage'; 
import Dashboard from './Dashboard';
import TemplatePage from './components/TemplatePage';
import ResumeBuilderPage from './ResumeBuilderPage'; 
import GettingStartedPage from './GettingStartedPage'; 
import ATSScoreChecker from './components/ATSScoreChecker';
import MainLayout from './Layouts/MainLayout';
// --- NEW IMPORT ---
import LoginSuccess from './components/LoginSuccess'; 

const isLoggedIn = () => {
    return localStorage.getItem('token') !== null;
};

const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn()) {
        return <Navigate to="/login" />;
    }
    return <MainLayout>{children}</MainLayout>;
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes */}
                <Route path="/login" element={<AuthPage />} />
                
                {/* --- NEW OAUTH HANDLER ROUTE --- */}
                {/* This must be public so it can catch the token from the backend */}
                <Route path="/login-success" element={<LoginSuccess />} />

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
                    element={<ProtectedRoute><ResumeBuilderPage /></ProtectedRoute>}
                />
                
                {/* Catch-all redirect */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;