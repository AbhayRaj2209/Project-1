// src/components/ScaledPaper.jsx — renders a true-size page and scales it to fit its container
import React, { useLayoutEffect, useRef, useState } from 'react';

export const PAPER_WIDTH = 816; // 8.5in @ 96dpi — the width every template is designed for

const ScaledPaper = ({ paperRef, children, padding = 32 }) => {
    const containerRef = useRef(null);
    const innerRef = useRef(null);
    const [scale, setScale] = useState(1);
    const [paperHeight, setPaperHeight] = useState(1056);

    useLayoutEffect(() => {
        const container = containerRef.current;
        const inner = innerRef.current;
        if (!container || !inner) return undefined;

        const measure = () => {
            const available = container.clientWidth - padding * 2;
            if (available > 0) setScale(Math.min(1, available / PAPER_WIDTH));
            setPaperHeight(inner.offsetHeight);
        };

        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(container);
        ro.observe(inner);
        return () => ro.disconnect();
    }, [padding]);

    return (
        <div ref={containerRef} className="ed-scaler" style={{ '--ed-pad': `${padding}px` }}>
            <div
                className="ed-scaler-box"
                style={{ width: PAPER_WIDTH * scale, height: paperHeight * scale }}
            >
                <div
                    ref={innerRef}
                    className="ed-scaler-inner"
                    data-preview-scale=""
                    style={{ width: PAPER_WIDTH, transform: `scale(${scale})` }}
                >
                    <div ref={paperRef} className="ed-paper">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScaledPaper;
