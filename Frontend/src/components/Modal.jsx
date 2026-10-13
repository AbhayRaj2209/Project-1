// src/components/Modal.jsx — accessible dialog (Esc / backdrop click to close)
import React, { useEffect, useId, useRef } from 'react';
import Icon from './Icon';
import './Layout.css';

const Modal = ({ title, onClose, children, size = 'md' }) => {
    const titleId = useId();
    const dialogRef = useRef(null);

    useEffect(() => {
        const previouslyFocused = document.activeElement;
        dialogRef.current?.focus();
        const { overflow } = document.body.style;
        document.body.style.overflow = 'hidden';

        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = overflow;
            previouslyFocused?.focus?.();
        };
    }, [onClose]);

    return (
        <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
            <div
                ref={dialogRef}
                className={`modal-dialog modal-dialog--${size}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                tabIndex={-1}
            >
                <div className="modal-head">
                    <h2 id={titleId}>{title}</h2>
                    <button type="button" className="ui-icon-btn ui-icon-btn--plain" onClick={onClose} aria-label="Close">
                        <Icon name="x" size={18} />
                    </button>
                </div>
                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
