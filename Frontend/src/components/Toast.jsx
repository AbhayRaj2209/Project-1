// src/components/Toast.jsx — toast notifications (state lives in useToast)
import React from 'react';
import Icon from './Icon';

export const ToastRegion = ({ toasts }) => (
    <div className="ui-toast-region" role="status" aria-live="polite">
        {toasts.map((t) => (
            <div key={t.id} className={`ui-toast ui-toast--${t.type}`}>
                <Icon name={t.type === 'error' ? 'alert' : 'checkCircle'} size={18} />
                <span>{t.message}</span>
            </div>
        ))}
    </div>
);
