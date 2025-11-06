// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import all your page components
import AuthPage from './AuthPage'; 
import Dashboard from './Dashboard';
import TemplatePage from './components/TemplatePage';
import ResumeBuilderPage from './ResumeBuilderPage'; 
import GettingStartedPage from './GettingStartedPage'; // Import the new page
import MainLayout from './Layouts/MainLayout';

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
                {/* Public route, no layout */}
                <Route path="/login" element={<AuthPage />} />

                {/* All protected routes will now have the header and footer */}
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
                    path="/editor"
                    element={<ProtectedRoute><ResumeBuilderPage /></ProtectedRoute>}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
