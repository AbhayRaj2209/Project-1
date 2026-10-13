// src/components/EditorControls.jsx — editor toolbar
import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import { templates } from '../data/templates';
import './EditorControls.css';

const EditorControls = ({
    title,
    status,
    templateId,
    onTemplateChange,
    onSave,
    onDownload,
    onPrint,
    saving = false,
    downloading = false,
    view,
    onViewChange,
}) => {
    return (
        <div className="ed-toolbar">
            <div className="ed-toolbar-left">
                <Link to="/" className="ui-icon-btn ui-icon-btn--plain" aria-label="Back to dashboard" title="Back to dashboard">
                    <Icon name="arrowLeft" size={18} />
                </Link>
                <div className="ed-title">
                    <strong title={title}>{title}</strong>
                    <span className={`ed-status ed-status--${status.tone}`}>
                        <span className="ed-status-dot" />
                        {status.label}
                    </span>
                </div>
            </div>

            <div className="ed-view-switch" role="tablist" aria-label="Editor view">
                <button
                    type="button"
                    role="tab"
                    aria-selected={view === 'edit'}
                    className={view === 'edit' ? 'is-active' : ''}
                    onClick={() => onViewChange('edit')}
                >
                    <Icon name="edit" size={15} /> Edit
                </button>
                <button
                    type="button"
                    role="tab"
                    aria-selected={view === 'preview'}
                    className={view === 'preview' ? 'is-active' : ''}
                    onClick={() => onViewChange('preview')}
                >
                    <Icon name="eye" size={15} /> Preview
                </button>
            </div>

            <div className="ed-toolbar-right">
                <label className="ed-template-select">
                    <span className="sr-only">Template</span>
                    <Icon name="grid" size={15} />
                    <select
                        className="ui-select"
                        value={templateId}
                        onChange={(e) => onTemplateChange(e.target.value)}
                        aria-label="Template"
                    >
                        {templates.map((t) => (
                            <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                    </select>
                </label>

                <button
                    type="button"
                    onClick={onPrint}
                    className="ui-btn ui-btn--ghost ui-btn--sm ed-btn-print"
                    title="Print"
                >
                    <Icon name="printer" size={16} />
                    <span className="ed-btn-label">Print</span>
                </button>
                <button
                    type="button"
                    onClick={onDownload}
                    className="ui-btn ui-btn--secondary ui-btn--sm"
                    disabled={downloading}
                    title="Download PDF"
                >
                    {downloading ? <span className="ui-spinner" /> : <Icon name="download" size={16} />}
                    <span className="ed-btn-label">PDF</span>
                </button>
                <button
                    type="button"
                    onClick={onSave}
                    className="ui-btn ui-btn--primary ui-btn--sm"
                    disabled={saving}
                >
                    {saving ? <span className="ui-spinner" /> : <Icon name="save" size={16} />}
                    <span>Save</span>
                </button>
            </div>
        </div>
    );
};

export default EditorControls;
