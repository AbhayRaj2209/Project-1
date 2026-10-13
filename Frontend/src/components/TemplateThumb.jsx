// src/components/TemplateThumb.jsx — CSS-drawn miniature of a template's layout
import React from 'react';
import './TemplateThumb.css';

const Lines = ({ widths }) => (
    <>
        {widths.map((w, i) => (
            <i key={i} className="tt-line" style={{ width: `${w}%` }} />
        ))}
    </>
);

const Body = () => (
    <>
        <span className="tt-heading" />
        <Lines widths={[92, 84, 88, 60]} />
        <span className="tt-heading" />
        <Lines widths={[90, 76, 82]} />
        <span className="tt-heading" />
        <Lines widths={[86, 70]} />
    </>
);

const TemplateThumb = ({ layout = 'single', color = '#4f46e5', className = '' }) => (
    <div className={`tt tt--${layout} ${className}`} style={{ '--tt-color': color }} aria-hidden="true">
        <div className="tt-paper">
            {layout === 'sidebar' && (
                <div className="tt-cols">
                    <div className="tt-side">
                        <span className="tt-avatar" />
                        <Lines widths={[80, 60, 70, 50, 74, 56]} />
                    </div>
                    <div className="tt-main">
                        <span className="tt-name" />
                        <Body />
                    </div>
                </div>
            )}

            {layout === 'accent' && (
                <div className="tt-cols">
                    <div className="tt-stripe" />
                    <div className="tt-main">
                        <span className="tt-name" />
                        <Lines widths={[50]} />
                        <Body />
                    </div>
                </div>
            )}

            {layout === 'split' && (
                <>
                    <div className="tt-band" />
                    <div className="tt-cols tt-cols--pad">
                        <div className="tt-main"><Body /></div>
                        <div className="tt-side tt-side--light"><Lines widths={[80, 66, 74, 58, 70]} /></div>
                    </div>
                </>
            )}

            {layout === 'banner' && (
                <>
                    <div className="tt-banner">
                        <span className="tt-avatar tt-avatar--light" />
                        <span className="tt-name tt-name--light" />
                    </div>
                    <div className="tt-main tt-main--pad"><Body /></div>
                </>
            )}

            {layout === 'dark' && (
                <div className="tt-main tt-main--pad">
                    <span className="tt-name" />
                    <Lines widths={[44]} />
                    <Body />
                </div>
            )}

            {(layout === 'single' || layout === 'centered') && (
                <div className="tt-main tt-main--pad">
                    <span className="tt-name" />
                    <Lines widths={layout === 'centered' ? [58] : [46]} />
                    <span className="tt-rule" />
                    <Body />
                </div>
            )}
        </div>
    </div>
);

export default TemplateThumb;
