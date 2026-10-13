// src/components/useToast.js
import { useCallback, useEffect, useRef, useState } from 'react';

export const useToast = (duration = 3200) => {
    const [toasts, setToasts] = useState([]);
    const timers = useRef([]);

    useEffect(() => {
        const pending = timers.current;
        return () => pending.forEach(clearTimeout);
    }, []);

    const showToast = useCallback((message, type = 'success') => {
        const id = Date.now() + Math.random();
        setToasts((prev) => [...prev.slice(-2), { id, message, type }]);
        timers.current.push(
            setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), duration)
        );
    }, [duration]);

    return { toasts, showToast };
};
