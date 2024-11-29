// src/components/PreviewModal.js
import React from 'react';

function PreviewModal({ isOpen, onClose, article }) {
    if (!isOpen) return null;

    return (
        <div className="min-h-screen">
            <div className="bg-white p-8 rounded-lg max-w-4xl w-full relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-2"
                >
                    X
                </button>
                
            </div>
        </div>
    );
}

export default PreviewModal;