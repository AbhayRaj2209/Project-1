
import React from 'react';
import './EditorControls.css'; 

const EditorControls = ({ onDownload }) => {
    return (
        <div className="editor-controls">
            <button onClick={onDownload} className="control-button download-btn">
                Download as PDF
            </button>
            {/* Add more controls here in the future */}
        </div>
    );
};

export default EditorControls;
