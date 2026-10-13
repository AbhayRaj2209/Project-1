// src/data/templates.js — single source of truth for the template catalog

export const templates = [
    {
        id: 'classic',
        name: 'Classic Professional',
        description: 'Traditional serif layout suited to corporate and campus roles.',
        category: 'Professional',
        color: '#2563eb',
        layout: 'single',
    },
    {
        id: 'modern',
        name: 'Modern Minimalist',
        description: 'Clean sidebar layout with a contemporary feel.',
        category: 'Modern',
        color: '#7c3aed',
        layout: 'sidebar',
    },
    {
        id: 'creative',
        name: 'Creative Column',
        description: 'Distinctive accent stripe and two-column flow.',
        category: 'Creative',
        color: '#db2777',
        layout: 'accent',
    },
    {
        id: 'overleaf',
        name: 'Academic LaTeX',
        description: 'Research-style layout inspired by LaTeX CVs.',
        category: 'Academic',
        color: '#059669',
        layout: 'split',
    },
    {
        id: 'jakes',
        name: "Jake's Resume",
        description: 'The dense, recruiter-favourite one-pager.',
        category: 'Professional',
        color: '#1e40af',
        layout: 'centered',
    },
    {
        id: 'executive',
        name: 'Executive Elite',
        description: 'Premium presentation for senior positions.',
        category: 'Executive',
        color: '#ea580c',
        layout: 'banner',
    },
    {
        id: 'tech',
        name: 'Tech Stack',
        description: 'Code-inspired styling for software engineers.',
        category: 'Tech',
        color: '#0891b2',
        layout: 'dark',
    },
    {
        id: 'designer',
        name: 'Design Portfolio',
        description: 'Bold headings and a timeline to show your craft.',
        category: 'Creative',
        color: '#c026d3',
        layout: 'sidebar',
    },
    {
        id: 'simple',
        name: 'Simple & Clean',
        description: 'Minimal styling that keeps the focus on content.',
        category: 'Modern',
        color: '#65a30d',
        layout: 'single',
    },
];

export const categories = ['All', ...new Set(templates.map((t) => t.category))];

export const getTemplate = (id) => templates.find((t) => t.id === id) || templates[0];
