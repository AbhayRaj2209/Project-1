// src/components/ThemeToggle.jsx
import React from 'react';
import Icon from './Icon';
import { useTheme } from '../theme/themeContext';

const ThemeToggle = ({ className = '' }) => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';
    const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className={`ui-icon-btn theme-toggle ${className}`}
            aria-label={label}
            title={label}
        >
            <Icon name={isDark ? 'sun' : 'moon'} size={18} />
        </button>
    );
};

export default ThemeToggle;
